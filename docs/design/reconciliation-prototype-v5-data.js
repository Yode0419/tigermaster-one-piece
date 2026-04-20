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
