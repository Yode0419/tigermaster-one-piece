#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
/to-jira helper: create a Jira issue from a draft JSON file.

Usage (run from anywhere; paths are resolved relative to the skill folder):
  python jira.py check   [--config tigermaster]
  python jira.py preview <draft.json>
  python jira.py create  <draft.json>

Draft JSON (written with the Write tool, UTF-8):
  {
    "config": "tigermaster",          # config/<name>.json
    "type": "story" | "bug",
    "summary": "【Web】...",
    "priority": "High",               # optional; ignored when the type does not support it
    "description": "markdown text"    # see md_to_adf() for the supported subset
  }

Credentials come from the .env named in the config (never printed).
"""

import json
import os
import re
import subprocess
import sys

import requests

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


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


# ---------- commands ----------

def load_draft(path):
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    for key in ("config", "type", "summary", "description"):
        if not d.get(key):
            die(f"草稿缺少欄位 {key}")
    if d["type"] not in ("story", "bug"):
        die("type 必須是 story 或 bug")
    return d


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


def cmd_preview(d, cfg):
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


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ("check", "preview", "create"):
        print(__doc__)
        sys.exit(1)
    cmd = sys.argv[1]
    if cmd == "check":
        name = sys.argv[3] if len(sys.argv) > 3 and sys.argv[2] == "--config" else "tigermaster"
        cmd_check(load_config(name))
        return
    if len(sys.argv) < 3:
        die("請指定草稿檔路徑")
    d = load_draft(sys.argv[2])
    cfg = load_config(d["config"])
    (cmd_preview if cmd == "preview" else cmd_create)(d, cfg)


if __name__ == "__main__":
    main()
