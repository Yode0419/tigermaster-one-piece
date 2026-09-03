# 官方網站技術路由補充

## 概述

本文件補充 [website-content.md](../wiki/product/website-content.md) 未收錄、非客戶瀏覽性質的官網路由:交易/操作流程頁面、App 專用深連結頁面、內部工具與疑似廢棄路由。客戶可瀏覽頁面的內容架構與路由(含服務、常見問題、師虎學院、法務頁)請見 website-content.md,不在此重複。

---

## 背景與脈絡

資料來源:repo 路由盤點、repo 按鈕層級連結盤點(`fdtigermaster-offical-site` 的 `src/router/index.ts` 與各 view 元件)。分析日期 2026-09-03。

用途:作為建立 Figma source of truth 設計稿時,補齊行銷內容頁面以外的技術性頁面範圍。

## 交易 / 操作流程頁面

不在 SEO sitemap,但實際可到達:

- `/SignUp` 註冊
- `/ResetPassword` 重設密碼
- `/Quotation/List`、`/Quotation/Standard`、`/Quotation/Info`、`/Quotation/Pdf` 報價單流程(師傅使用的網頁版報價單工具,詳見 [報價流程](../wiki/process/quotation-flow.md))
- `/PaymentLoading` 付款處理中
- `/CustomPayment` 客製化付款
- `/RechargePayment` 儲值付款

## App 專用深連結頁面

僅 App 內嵌可達,非網站導覽:

- `/MobileQA`、`/MobileQA/invoice`、`/MobileQA/pro`
- `/MobileDownloadOrder`

## 會員頁

- `/pro-member` 專業會員頁,在 sitemap.xml 中,但導覽選單與其他頁面皆未找到連往此頁的入口

## 師虎學院子流程

`/Academy` 底下的子流程(Course、CourseInfo、CourseQA、CourseTimetable、EnquireCards、CourseSignUp、AcademyAD、TigerLocation、EnquireDispatch、EnquireTraining、AcademyParticipant、EnterpriseEnquire、CreateDispatch、AcademyLaw)程式碼中標註「尚未啟用」,但實際上仍可從 `/Academy` 首頁的按鈕(教育訓練課程、企業培訓基地、企業策略聯盟)點擊進入,其中「企業合作」按鈕已從內部頁面改為導向外部 Google 表單。舊版導覽下拉選單元件(`NavbarWithAcademyDropdown.vue`)完整保留這個子結構,但目前未被使用。

## 內部工具 / 疑似停用或重複

還原前建議跟工程確認:

- `/MasterManagement` 師傅管理(內部工具)
- `/Totaluser` 疑似內部統計頁
- `/TigerSchool` 與 `/Academy` 指向同一元件,疑似重複路由
- `Enter.vue`、`ActivitySignUp.vue` 有檔案無路由,可能廢棄

---

## 待釐清事項(TBD)

- [ ] `/pro-member` 實際入口位置
- [ ] `/Academy` 子流程是否已正式上線,或程式碼註解尚未更新
- [ ] `/TigerSchool` 是否為廢棄路由
