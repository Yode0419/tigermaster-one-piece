#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
/to-jira helper: create or update a Jira issue from a draft JSON file.

Usage (run from anywhere; paths are resolved relative to the skill folder):
  python jira.py check   [--config tigermaster]
  python jira.py search  [--config tigermaster] [keyword ...]   # no keyword = list all
  python jira.py get     [--config tigermaster] <ISSUE-KEY>     # print current content
  python jira.py preview <draft.json>
  python jira.py create  <draft.json>
  python jira.py update  <draft.json>

Create draft JSON (written with the Write tool, UTF-8):
  {
    "config": "tigermaster",          # config/<name>.json
    "type": "story" | "bug",
    "summary": "【Web】...",
    "priority": "High",               # optional; ignored when the type does not support it
    "description": "markdown text"    # see md_to_adf() for the supported subset
  }

Update draft JSON: "config" + "key" (e.g. "SCRUM-34") + at least one of
"summary" / "description" / "priority". Fields left out are not touched; the
description is replaced as a whole. Before writing, update saves the current
fields to backups/<KEY>-<timestamp>.json (gitignored) and keeps only the
newest 3 per issue; other file names in backups/ are never deleted.

Credentials come from the .env named in the config (never printed).
"""

import json
import os
import re
import subprocess
import sys
from datetime import datetime

import requests

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEEP_BACKUPS = 3


def die(msg):
    print(f"[錯誤] {msg}", file=sys.stderr)
    sys.exit(1)


def load_config(name):
    path = os.path.join(SKILL_DIR, "config", f"{name}.json")
    if not os.path.exists(path):
        die(f"找不到設定檔 config/{name}.json")
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def load_env(cfg):
    path = os.path.join(SKILL_DIR, cfg["env_file"])
    if not os.path.exists(path):
        die(f"找不到 {cfg['env_file']}，請複製 .env.example 並填入 email 與 API token")
    env = {}
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
    for key in ("JIRA_EMAIL", "JIRA_API_TOKEN"):
        if not env.get(key):
            die(f"{cfg['env_file']} 缺少 {key}")
    return env["JIRA_EMAIL"], env["JIRA_API_TOKEN"]


def env_tracked_by_git(cfg):
    path = os.path.join(SKILL_DIR, cfg["env_file"])
    r = subprocess.run(["git", "ls-files", "--error-unmatch", path],
                       cwd=SKILL_DIR, capture_output=True)
    return r.returncode == 0


# ---------- markdown subset -> ADF ----------

INLINE = re.compile(r"(\*\*.+?\*\*|`[^`]+`|https?://[^\s)）]+)")


def inline_nodes(text):
    nodes = []
    for part in INLINE.split(text):
        if not part:
            continue
        if part.startswith("**") and part.endswith("**") and len(part) > 4:
            nodes.append({"type": "text", "text": part[2:-2], "marks": [{"type": "strong"}]})
        elif part.startswith("`") and part.endswith("`") and len(part) > 2:
            nodes.append({"type": "text", "text": part[1:-1], "marks": [{"type": "code"}]})
        elif re.match(r"https?://", part):
            nodes.append({"type": "text", "text": part, "marks": [{"type": "link", "attrs": {"href": part}}]})
        else:
            nodes.append({"type": "text", "text": part})
    return nodes


def md_to_adf(md):
    """Supports: '## heading', '---' rule, '1. ' ordered list, '- ' bullet list,
    paragraphs (blank-line separated; single newlines become hard breaks),
    inline **bold**, `code`, bare URLs."""
    content = []
    para = []
    list_type, items = None, []

    def flush_para():
        if para:
            nodes = []
            for i, line in enumerate(para):
                if i:
                    nodes.append({"type": "hardBreak"})
                nodes.extend(inline_nodes(line))
            content.append({"type": "paragraph", "content": nodes})
            para.clear()

    def flush_list():
        nonlocal list_type
        if items:
            content.append({
                "type": list_type,
                "content": [{"type": "listItem", "content": [{"type": "paragraph", "content": inline_nodes(t)}]}
                            for t in items],
            })
            items.clear()
        list_type = None

    for raw in md.splitlines():
        line = raw.strip()
        m_ol = re.match(r"^\d+\.\s+(.*)", line)
        m_ul = re.match(r"^[-*]\s+(.*)", line)
        if not line:
            flush_para(); flush_list()
        elif line.startswith("#"):
            flush_para(); flush_list()
            content.append({"type": "heading", "attrs": {"level": 3},
                            "content": inline_nodes(line.lstrip("#").strip())})
        elif re.fullmatch(r"-{3,}", line):
            flush_para(); flush_list()
            content.append({"type": "rule"})
        elif m_ol or m_ul:
            flush_para()
            kind = "orderedList" if m_ol else "bulletList"
            if list_type and list_type != kind:
                flush_list()
            list_type = kind
            items.append((m_ol or m_ul).group(1))
        else:
            flush_list()
            para.append(line)
    flush_para(); flush_list()
    return {"type": "doc", "version": 1, "content": content}


def adf_to_md(node):
    """Rough inverse of md_to_adf, for showing the current description. Unknown
    node types fall back to their plain text."""
    if not node:
        return ""
    t = node.get("type")
    kids = node.get("content", [])
    if t == "text":
        s = node.get("text", "")
        marks = {m["type"] for m in node.get("marks", [])}
        if "strong" in marks:
            s = f"**{s}**"
        if "code" in marks:
            s = f"`{s}`"
        return s
    if t == "hardBreak":
        return "\n"
    if t == "heading":
        return "## " + "".join(adf_to_md(k) for k in kids)
    if t == "rule":
        return "---"
    if t in ("orderedList", "bulletList"):
        lines = []
        for i, item in enumerate(kids, 1):
            prefix = f"{i}. " if t == "orderedList" else "- "
            lines.append(prefix + " ".join(adf_to_md(k) for k in item.get("content", [])))
        return "\n".join(lines)
    if t == "doc":
        return "\n\n".join(adf_to_md(k) for k in kids)
    return "".join(adf_to_md(k) for k in kids)


# ---------- commands ----------

def load_draft(path):
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    if not d.get("config"):
        die("草稿缺少欄位 config")
    if d.get("key"):
        if not any(d.get(k) for k in ("summary", "description", "priority")):
            die("更新草稿至少要有 summary、description、priority 其中一個")
        return d
    for key in ("type", "summary", "description"):
        if not d.get(key):
            die(f"草稿缺少欄位 {key}")
    if d["type"] not in ("story", "bug"):
        die("type 必須是 story 或 bug")
    return d


def fetch_issue(cfg, auth, key):
    r = requests.get(f"{cfg['base_url']}/rest/api/3/issue/{key}", auth=auth,
                     params={"fields": "summary,description,priority,status,issuetype"})
    if r.status_code != 200:
        die(f"讀取 {key} 失敗 HTTP {r.status_code}：{r.text[:500]}")
    return r.json()


def build_update_fields(cfg, d, issue):
    """Fields for an update draft; priority is dropped when the issue's type
    does not support it."""
    fields, notes = {}, []
    if d.get("summary"):
        fields["summary"] = d["summary"]
    if d.get("description"):
        fields["description"] = md_to_adf(d["description"])
    if d.get("priority"):
        type_name = issue["fields"]["issuetype"]["name"]
        kind = next((k for k, v in cfg["issue_types"].items() if v == type_name), None)
        if cfg["priority_supported"].get(kind):
            fields["priority"] = {"name": d["priority"]}
        else:
            notes.append(f"{type_name}類型無法設定優先級，已忽略 {d['priority']}")
    return fields, notes


def build_fields(cfg, d):
    fields = {
        "project": {"key": cfg["project_key"]},
        "issuetype": {"name": cfg["issue_types"][d["type"]]},
        "summary": d["summary"],
        "description": md_to_adf(d["description"]),
    }
    notes = []
    if d.get("priority"):
        if cfg["priority_supported"].get(d["type"]):
            fields["priority"] = {"name": d["priority"]}
        else:
            notes.append(f"此類型無法設定優先級，已忽略 {d['priority']}")
    return fields, notes


def cmd_check(cfg):
    if env_tracked_by_git(cfg):
        die(f"{cfg['env_file']} 被 git 追蹤中，請先移出版控再使用")
    auth = load_env(cfg)
    r = requests.get(cfg["base_url"] + "/rest/api/3/myself", auth=auth)
    if r.status_code != 200:
        die(f"驗證失敗 HTTP {r.status_code}，token 可能過期或填錯")
    print(f"[OK] 已連線 {cfg['base_url']}，身分：{r.json().get('displayName')}")


def cmd_search(cfg, keywords):
    """No keywords: list every non-subtask issue (key, status, summary).
    With keywords: issues whose summary/description contain ANY of them."""
    auth = load_env(cfg)
    jql = f"project = {cfg['project_key']} AND issuetype not in subTaskIssueTypes()"
    if keywords:
        terms = " OR ".join('text ~ "{}"'.format(k.replace('"', '\\"')) for k in keywords)
        jql += f" AND ({terms})"
    jql += " ORDER BY created DESC"
    rows, token = [], None
    while True:
        params = {"jql": jql, "maxResults": 100, "fields": "summary,status"}
        if token:
            params["nextPageToken"] = token
        r = requests.get(cfg["base_url"] + "/rest/api/3/search/jql", auth=auth, params=params)
        if r.status_code != 200:
            die(f"搜尋失敗 HTTP {r.status_code}：{r.text[:500]}")
        data = r.json()
        for i in data.get("issues", []):
            rows.append(f"{i['key']}｜{i['fields']['status']['name']}｜{i['fields']['summary']}")
        token = data.get("nextPageToken")
        if not token or data.get("isLast", True):
            break
    label = f"關鍵字 {' / '.join(keywords)}" if keywords else "全部票"
    print(f"== {label}：{len(rows)} 張 ==")
    for row in rows:
        print(row)


def cmd_get(cfg, key):
    f = fetch_issue(cfg, load_env(cfg), key)["fields"]
    print(f"{key}｜{f['issuetype']['name']}｜{f['status']['name']}"
          f"｜優先級：{(f.get('priority') or {}).get('name', '（無）')}")
    print(f"標題：{f['summary']}")
    print("描述：")
    print(adf_to_md(f.get("description")) or "（空白）")


def cmd_preview(d, cfg):
    if d.get("key"):
        issue = fetch_issue(cfg, load_env(cfg), d["key"])
        fields, notes = build_update_fields(cfg, d, issue)
        print(f"更新：{d['key']}　將覆寫欄位：{'、'.join(fields) or '（無）'}")
        if "summary" in fields:
            print(f"標題：{issue['fields']['summary']} → {fields['summary']}")
        if "priority" in fields:
            old = (issue["fields"].get("priority") or {}).get("name", "（無）")
            print(f"優先級：{old} → {fields['priority']['name']}")
        for n in notes:
            print(f"注意：{n}")
        print("[dry-run] 格式檢查通過，未寫入。")
        return
    fields, notes = build_fields(cfg, d)
    print(f"專案：{cfg['project_key']}　類型：{fields['issuetype']['name']}"
          f"　優先級：{fields.get('priority', {}).get('name', '（不設定）')}")
    print(f"標題：{fields['summary']}")
    for n in notes:
        print(f"注意：{n}")
    print("[dry-run] 格式檢查通過，未呼叫 API。")


def cmd_create(d, cfg):
    if env_tracked_by_git(cfg):
        die(f"{cfg['env_file']} 被 git 追蹤中，請先移出版控再使用")
    fields, notes = build_fields(cfg, d)
    for n in notes:
        print(f"注意：{n}")
    auth = load_env(cfg)
    r = requests.post(cfg["base_url"] + "/rest/api/3/issue", auth=auth, json={"fields": fields})
    if r.status_code >= 300:
        die(f"建立失敗 HTTP {r.status_code}：{r.text[:1000]}")
    key = r.json()["key"]
    print(f"[OK] 已建立 {key}：{cfg['base_url']}/browse/{key}")


def cmd_update(d, cfg):
    if env_tracked_by_git(cfg):
        die(f"{cfg['env_file']} 被 git 追蹤中，請先移出版控再使用")
    key = d["key"]
    auth = load_env(cfg)
    issue = fetch_issue(cfg, auth, key)
    fields, notes = build_update_fields(cfg, d, issue)
    for n in notes:
        print(f"注意：{n}")
    if not fields:
        die("沒有可更新的欄位")
    backup_dir = os.path.join(SKILL_DIR, "backups")
    os.makedirs(backup_dir, exist_ok=True)
    backup = os.path.join(backup_dir, f"{key}-{datetime.now():%Y%m%d-%H%M%S}.json")
    with open(backup, "w", encoding="utf-8") as f:
        json.dump(issue, f, ensure_ascii=False, indent=2)
    r = requests.put(f"{cfg['base_url']}/rest/api/3/issue/{key}", auth=auth, json={"fields": fields})
    if r.status_code >= 300:
        die(f"更新失敗 HTTP {r.status_code}：{r.text[:1000]}（原內容備份：{backup}）")
    print(f"[OK] 已更新 {key}：{cfg['base_url']}/browse/{key}")
    print(f"更新前內容備份：{backup}")
    # keep only the newest KEEP_BACKUPS timestamped snapshots per issue
    pattern = re.compile(rf"^{re.escape(key)}-\d{{8}}-\d{{6}}\.json$")
    snaps = sorted(f for f in os.listdir(backup_dir) if pattern.match(f))
    for old in snaps[:-KEEP_BACKUPS]:
        os.remove(os.path.join(backup_dir, old))


def main():
    cmds = ("check", "search", "get", "preview", "create", "update")
    if len(sys.argv) < 2 or sys.argv[1] not in cmds:
        print(__doc__)
        sys.exit(1)
    cmd = sys.argv[1]
    if cmd in ("check", "search", "get"):
        args = sys.argv[2:]
        name = "tigermaster"
        if len(args) >= 2 and args[0] == "--config":
            name, args = args[1], args[2:]
        cfg = load_config(name)
        if cmd == "check":
            cmd_check(cfg)
        elif cmd == "search":
            cmd_search(cfg, args)
        else:
            if not args:
                die("請指定票號，例如 SCRUM-34")
            cmd_get(cfg, args[0])
        return
    if len(sys.argv) < 3:
        die("請指定草稿檔路徑")
    d = load_draft(sys.argv[2])
    cfg = load_config(d["config"])
    if cmd == "preview":
        cmd_preview(d, cfg)
    elif d.get("key") and cmd == "create":
        die("草稿有 key，是更新草稿，請用 update")
    elif cmd == "create":
        cmd_create(d, cfg)
    elif not d.get("key"):
        die("更新草稿缺少 key（例如 SCRUM-34）")
    else:
        cmd_update(d, cfg)


if __name__ == "__main__":
    main()
