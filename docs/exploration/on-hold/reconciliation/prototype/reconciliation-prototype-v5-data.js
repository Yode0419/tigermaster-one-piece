const CURRENT_PERIOD = '202604-2';

const PERIOD_DATA = {
  '202604-2': [
    { no:'RO2026040400008', master:'吳柏輝', income:200,   remitted:0,    revenue:0,      profit:-200,   status:'未匯款',  type:'訂單取消', period:'202604-2', date:'2026-04-15' },
    { no:'RO2026041300015', master:'林志亮', income:2200,  remitted:0,    revenue:285,    profit:-1914,  status:'未匯款',  type:'完成訂單', period:'202604-2', date:'2026-04-15' },
    { no:'RO2026022600008', master:'徐晨皓', income:75000, remitted:0,    revenue:85714,  profit:10714,  status:'未匯款',  type:'完成訂單', period:'202604-2', date:'2026-04-15' },
    { no:'RO2026041500006', master:'胡振釗', income:200,   remitted:0,    revenue:0,      profit:-200,   status:'未匯款',  type:'訂單取消', period:'202604-2', date:'2026-04-15' },
    { no:'RO2026041400016', master:'林志亮', income:1600,  remitted:0,    revenue:2116,   profit:516,    status:'未匯款',  type:'完成訂單', period:'202604-2', date:'2026-04-14' },
    { no:'RO2026041300003', master:'李思頡', income:4000,  remitted:0,    revenue:1385,   profit:-2614,  status:'未匯款',  type:'完成訂單', period:'202604-2', date:'2026-04-13' },
    { no:'RO2026041000008', master:'林志亮', income:1800,  remitted:0,    revenue:2380,   profit:580,    status:'未匯款',  type:'完成訂單', period:'202604-2', date:'2026-04-14' },
    { no:'RO2026041300009', master:'陳奕臣', income:3000,  remitted:0,    revenue:3967,   profit:967,    status:'未匯款',  type:'完成訂單', period:'202604-2', date:'2026-04-14' },
    { no:'RO2026040600003', master:'莊上暐', income:200,   remitted:0,    revenue:0,      profit:-200,   status:'未匯款',  type:'訂單取消', period:'202604-2', date:'2026-04-14' },
    { no:'RO2026041100012', master:'謝祐豪', income:200,   remitted:0,    revenue:285,    profit:85,     status:'未匯款',  type:'訂單取消', period:'202604-2', date:'2026-04-14' },
  ],
  '202604-1': [
    { no:'RO2026040100001', master:'陳達人', income:10960, remitted:0,    revenue:14487,  profit:3527,   status:'未匯款',  type:'完成訂單', period:'202604-1', date:'2026-04-01' },
    { no:'RO2026040200003', master:'寧佑昇', income:200,   remitted:0,    revenue:285,    profit:85,     status:'未匯款',  type:'訂單取消', period:'202604-1', date:'2026-04-02' },
    { no:'RO2026040300007', master:'林志亮', income:2000,  remitted:1500, revenue:4762,   profit:1262,   status:'部分匯款', type:'完成訂單', period:'202604-1', date:'2026-04-03' },
    { no:'RO2026040400011', master:'吳柏輝', income:1800,  remitted:0,    revenue:2380,   profit:580,    status:'未匯款',  type:'完成訂單', period:'202604-1', date:'2026-04-04' },
  ],
  '202603-2': [
    { no:'RO2026031800005', master:'吳佳璘', income:2800,  remitted:2800, revenue:3702,   profit:902,    status:'已匯款',  type:'完成訂單', period:'202603-2', date:'2026-03-18' },
    { no:'RO2026031900009', master:'李思頡', income:3000,  remitted:2000, revenue:6614,   profit:1614,   status:'部分匯款', type:'完成訂單', period:'202603-2', date:'2026-03-19' },
    { no:'RO2026032000003', master:'徐晨皓', income:8000,  remitted:0,    revenue:10476,  profit:2476,   status:'未匯款',  type:'完成訂單', period:'202603-2', date:'2026-03-20' },
  ],
  '202603-1': [
    { no:'RO2026031000006', master:'謝祐豪', income:4500,  remitted:0,    revenue:5952,   profit:1452,   status:'未匯款',  type:'完成訂單', period:'202603-1', date:'2026-03-10' },
    { no:'RO2026031100012', master:'陳奕臣', income:1200,  remitted:1000, revenue:2909,   profit:709,    status:'部分匯款', type:'完成訂單', period:'202603-1', date:'2026-03-11' },
  ],
};

const PAYOUT_LIST = Object.values(PERIOD_DATA).flat()
  .filter(r => r.remitted > 0)
  .map(r => ({
    no:     r.no,
    master: r.master,
    type:   r.type,
    amount: r.remitted,
    status: '已匯款',
    period: r.period,
  }));

const TOUR_STEPS = [
  {
    selector: '.flow-banner',
    title: '流程說明 banner',
    body: '1. 新增一小條 banner，概述匯款(撥款)作業的流程。<br>2. 可透過「操作說明」按鈕查看更詳細的說明，讓會計了解此介面如何操作。'
  },
  {
    selector: '.page-header',
    title: '「師傅收入明細」區塊',
    body: '1. 原本放在第二區塊的改排在第一區塊。<br>2. 標題由「匯款資訊」改為「師傅收入明細」，清楚定位這個區塊是用來查看師傅收入資料 (DB: master_income) 的地方。'
  },
  {
    selector: '.period-selector',
    title: '結算週期 Dropdown',
    body: '1. 下拉選單增加標籤「結算週期」，對應師傅收入所屬的結算期 (DB: master_income.expect_remittance_period)。<br>2. 切換週期後，「總數」與表格內容同步更新，「下載」按鈕也會下載對應期數的 Excel 檔案。'
  },
  {
    selector: '#search-row-block1',
    title: '表格欄位&搜尋列 調整',
    body: '1. 移除「已匯金額」的搜尋功能，因為沒有以這個欄位來搜尋的必要性。<br>2. 移除「毛利(%)」欄，因為數值計算錯誤且佔空間，沒有實質用途。<br>3. 「預期匯出週期」欄位更名為「結算週期」，並移除以此欄位搜尋的功能，因為已有 dropdown 進行篩選了。<br>4. 「建立日期」改使用日期選擇器來進行搜尋。<br><br>其餘搜尋欄位搭配「開始搜尋」按鈕執行，「清空搜尋列」一鍵重置。'
  },
  {
    selector: '#tbody tr:first-child td:last-child',
    title: '操作欄：全額加入 / 部分加入',
    body: '1. 原按鈕「預設」和「自選」語意不明，改為「全額加入」與「部分加入」，動作目的明確，並弱化「編輯」按鈕，讓使用者正確地使用加入按鈕來操作，而非使用編輯按鈕。<br>2. 欄位名稱改為「加入匯款清單」，旁邊的 <strong>?</strong> icon 可 hover 查看兩按鈕的用途說明。<br>3. 加入後，該列變暗並顯示「已加入匯款清單」文字，以及「取消加入」按鈕(方便加錯時就地撤銷)；同時該筆資料會出現在下方第三區塊的匯款清單中。<br>4. 付款狀態為「已匯款」的師傅收入，不顯示任何加入匯款清單的按鈕。'
  },
  {
    selector: '#prev-block-header',
    title: '「前期未匯」區塊',
    body: '1. 篩選所有付款狀態為「未匯款」或「部分匯款」的師傅收入，加入匯款清單的操作方式與上面相同。<br>2. 此區塊排第二是因為「師傅收入明細」的使用頻率較「前期未匯」高，故調整順序。'
  },
  {
    selector: '#payout-section .page-header',
    title: '「匯款清單」區塊',
    body: '1. 標題由「匯款紀錄」更改為「匯款清單」，也與第一、二區塊「加入匯款清單」的動作一致。<br><strong>2. 後續此區塊預朝向以師傅為單位的彙整視角來優化，讓會計直接看到每位師傅的應撥款總金額，減少人工加總</strong>。'
  },
  {
    selector: '#payout-period-selector',
    title: '匯款週期 Dropdown',
    body: '1. 下拉選單增加標籤「匯款週期」(DB: remittance_record.remittance_period)。<br>2. 切換週期後，表格內容同步更新，「下載」按鈕也會下載對應期數的 Excel 檔案。'
  },
  {
    selector: '#payout-thead',
    title: '匯款清單欄位',
    body: '1. 增加顯示「訂單編號」、「類型」，才能較好辨識加入的是哪一筆師傅收入。<br>2. 「刪除」欄位名稱更改為「移除」；由上方加入的項目會出現在此區塊，可以進行移除，該筆資料即恢復成加入前的樣子。<br>3. 狀態為「已匯款」的資料，不顯示移除按鈕。'
  },
  {
    selector: '.confirm-inline',
    title: '確認已匯款按鈕',
    body: '1.按鈕名稱由「確認匯款」更改為「確認已匯款」，明確說明這是事後回系統紀錄的動作，而非「點了才執行匯款」。<br>2. 旁邊的 ? icon 與點擊後出現的 Modal 亦有相同提醒。'
  }
];
