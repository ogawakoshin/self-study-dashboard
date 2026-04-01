// ==============================================
// 自己学習ダッシュボード — Scriptable Widget
// ホーム画面に追加して今日のタスクを常時表示
// ==============================================

// ===== CONFIG =====
const WIDGET_URL = 'https://ogawakoshin.github.io/self-study-dashboard/widget.html';

const SUBJECTS = {
  takken: { name: '宅建士', icon: '🏠', color: new Color('#b45309'), bg: new Color('#92400e') },
  ap:     { name: '応用情報', icon: '💻', color: new Color('#7c3aed'), bg: new Color('#4c1d95') },
  denki:  { name: '電気工事士', icon: '⚡', color: new Color('#047857'), bg: new Color('#064e3b') },
};

const SCHEDULE = { 1:'takken', 2:'ap', 3:'takken', 4:'ap', 5:'denki', 6:'takken', 0:'ap' };

const EXAM_DATES = {
  takken: { label: '宅建本試験',   date: new Date(2026, 9, 18) },
  ap:     { label: '応用情報CBT',  date: new Date(2026, 10, 1) },
  denki:  { label: '電工技能試験', date: new Date(2026, 11, 12) },
};

const DAY_NAMES = ['日','月','火','水','木','金','土'];

// ===== HELPERS =====
function daysBetween(a, b) {
  return Math.ceil((b - a) / (1000 * 60 * 60 * 24));
}

// ===== WEEKLY PLAN (synced with index.html) =====
function getTodayTasks() {
  const today = new Date();
  const dow = today.getDay();
  const dayLabel = DAY_NAMES[dow];

  let currentPhase = 'takken';
  if (today >= new Date(2026, 10, 15)) currentPhase = 'denki';
  else if (today >= new Date(2026, 9, 19)) currentPhase = 'ap';

  const weekNum = Math.ceil(daysBetween(new Date(2026, 2, 26), today) / 7);

  const takkenPlan = (() => {
    if (weekNum <= 2) return [
      { day:'月', subj:'takken', content:'📺 ゆーき大学 宅建業法 動画2本視聴', time:'40min' },
      { day:'火', subj:'takken', content:'📺 ゆーき大学 宅建業法 動画2本視聴', time:'40min' },
      { day:'水', subj:'ap', content:'午前問題（テクノロジ系）', time:'1h' },
      { day:'木', subj:'takken', content:'📺 ゆーき大学 宅建業法 動画2本視聴', time:'40min' },
      { day:'金', subj:'takken', content:'📺 ゆーき大学 宅建業法 動画2本視聴', time:'40min' },
      { day:'土', subj:'takken', content:'📺 ゆーき大学 動画の復習・メモ整理', time:'1h' },
      { day:'日', subj:'ap', content:'午前問題演習', time:'1h' },
    ];
    if (weekNum <= 4) return [
      { day:'月', subj:'takken', content:'📺 法令上の制限 動画2本', time:'40min' },
      { day:'火', subj:'takken', content:'📺 法令上の制限 動画2本', time:'40min' },
      { day:'水', subj:'ap', content:'午前問題（テクノロジ系）', time:'1h' },
      { day:'木', subj:'takken', content:'📺 税その他の動画', time:'40min' },
      { day:'金', subj:'takken', content:'📺 法令制限・税 残りの動画', time:'40min' },
      { day:'土', subj:'takken', content:'📺 動画復習 + メモ整理', time:'1h' },
      { day:'日', subj:'ap', content:'午前問題演習', time:'1h' },
    ];
    if (weekNum <= 6) return [
      { day:'月', subj:'takken', content:'📺 民法 動画2本', time:'50min' },
      { day:'火', subj:'takken', content:'📺 民法 動画2本', time:'50min' },
      { day:'水', subj:'ap', content:'午前問題（テクノロジ系）', time:'1h' },
      { day:'木', subj:'takken', content:'📺 民法 動画1-2本', time:'40min' },
      { day:'金', subj:'takken', content:'📺 民法 残り + 問題集購入', time:'1h' },
      { day:'土', subj:'takken', content:'📺 1周目完了！ 復習・ノート整理', time:'1.5h' },
      { day:'日', subj:'ap', content:'午前問題演習', time:'1h' },
    ];
    if (weekNum <= 8) return [
      { day:'月', subj:'takken', content:'📺 2周目:宅建業法 + 📖 問題集音読', time:'1h' },
      { day:'火', subj:'takken', content:'📖 問題集「宅建業法」音読', time:'1h' },
      { day:'水', subj:'ap', content:'午前問題（テクノロジ系）', time:'1h' },
      { day:'木', subj:'takken', content:'📺 2周目:法令制限 + 📖 問題集', time:'1h' },
      { day:'金', subj:'takken', content:'📖 問題集「法令制限」音読', time:'1.5h' },
      { day:'土', subj:'takken', content:'📺 2周目:税+民法 + 📖 問題集', time:'1.5h' },
      { day:'日', subj:'ap', content:'午前問題演習', time:'1h' },
    ];
    if (weekNum <= 14) return [
      { day:'月', subj:'takken', content:'📖 問題集 音読（宅建業法）', time:'1h' },
      { day:'火', subj:'takken', content:'📖 問題集 音読（法令制限）', time:'1h' },
      { day:'水', subj:'ap', content:'午前問題（マネジメント系）', time:'1h' },
      { day:'木', subj:'takken', content:'📖 問題集（税その他→権利関係）', time:'1h' },
      { day:'金', subj:'takken', content:'📺 棚田 借地借家法等 + 復習', time:'1.5h' },
      { day:'土', subj:'takken', content:'📖 問題集2周目 + 弱点動画', time:'1.5h' },
      { day:'日', subj:'ap', content:'午前・午後問題演習', time:'1h' },
    ];
    return [
      { day:'月', subj:'takken', content:'権利関係の暗記', time:'1.5h' },
      { day:'火', subj:'takken', content:'法令制限・税 / 宅建業法 暗記', time:'1.5h' },
      { day:'水', subj:'ap', content:'午後問題演習', time:'1h' },
      { day:'木', subj:'takken', content:'問題集3周目 + 暗記ノート', time:'1.5h' },
      { day:'金', subj:'takken', content:'過去問演習 + 弱点復習', time:'1.5h' },
      { day:'土', subj:'takken', content:'📺 動画で復習 + 暗記', time:'2h' },
      { day:'日', subj:'ap', content:'午前・午後問題演習', time:'1h' },
    ];
  })();

  const weekPlans = {
    takken: takkenPlan,
    ap: [
      { day:'月', subj:'ap', content:'午前問題演習', time:'2h' },
      { day:'火', subj:'ap', content:'午後問題（選択分野1）', time:'2h' },
      { day:'水', subj:'denki', content:'筆記対策・過去問', time:'1h' },
      { day:'木', subj:'ap', content:'午後問題（選択分野2）', time:'2h' },
      { day:'金', subj:'ap', content:'午前問題の復習', time:'1.5h' },
      { day:'土', subj:'ap', content:'模試・弱点分析', time:'2h' },
      { day:'日', subj:'denki', content:'筆記CBT対策', time:'1h' },
    ],
    denki: [
      { day:'月', subj:'denki', content:'候補問題の練習（1-3）', time:'2h' },
      { day:'火', subj:'denki', content:'候補問題の練習（4-6）', time:'2h' },
      { day:'水', subj:'denki', content:'複線図の描き方・確認', time:'1.5h' },
      { day:'木', subj:'denki', content:'候補問題の練習（7-9）', time:'2h' },
      { day:'金', subj:'denki', content:'候補問題の練習（10-13）', time:'2h' },
      { day:'土', subj:'denki', content:'タイムトライアル・弱点復習', time:'2h' },
      { day:'日', subj:'denki', content:'全体通し練習・工具確認', time:'1.5h' },
    ],
  };

  const plan = weekPlans[currentPhase] || [];
  return plan.filter(t => t.day === dayLabel);
}

// ===== BUILD WIDGET =====
async function buildWidget() {
  const today = new Date();
  const dow = today.getDay();
  const currentSubject = SCHEDULE[dow] || 'takken';
  const subj = SUBJECTS[currentSubject];
  const exam = EXAM_DATES[currentSubject];
  const daysLeft = daysBetween(today, exam.date);
  const tasks = getTodayTasks();
  const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  const w = new ListWidget();
  w.url = WIDGET_URL;

  // Gradient background
  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [subj.bg, subj.color];
  w.backgroundGradient = gradient;
  w.setPadding(14, 14, 14, 14);

  // === Header row: date + exam countdown ===
  const header = w.addStack();
  header.layoutHorizontally();
  header.centerAlignContent();

  const dateStr = `${months[today.getMonth()]}${today.getDate()}日（${DAY_NAMES[dow]}）`;
  const dateText = header.addText(dateStr);
  dateText.font = Font.mediumSystemFont(11);
  dateText.textColor = new Color('#ffffff', 0.7);

  header.addSpacer();

  const countdownText = header.addText(daysLeft > 0 ? `${exam.label} ${daysLeft}日` : `${exam.label} 終了`);
  countdownText.font = Font.boldSystemFont(11);
  countdownText.textColor = new Color('#ffffff', 0.8);

  w.addSpacer(8);

  // === Subject row ===
  const subjRow = w.addStack();
  subjRow.layoutHorizontally();
  subjRow.centerAlignContent();
  subjRow.spacing = 8;

  const iconText = subjRow.addText(subj.icon);
  iconText.font = Font.systemFont(24);

  const nameText = subjRow.addText(subj.name);
  nameText.font = Font.boldSystemFont(20);
  nameText.textColor = Color.white();

  w.addSpacer(10);

  // === Task list ===
  if (tasks.length > 0) {
    for (const task of tasks) {
      const taskRow = w.addStack();
      taskRow.layoutHorizontally();
      taskRow.centerAlignContent();
      taskRow.spacing = 6;

      const bullet = taskRow.addText('▸');
      bullet.font = Font.boldSystemFont(12);
      bullet.textColor = new Color('#ffffff', 0.6);

      const contentText = taskRow.addText(task.content);
      contentText.font = Font.mediumSystemFont(13);
      contentText.textColor = new Color('#ffffff', 0.95);
      contentText.lineLimit = 2;

      taskRow.addSpacer();

      const timeText = taskRow.addText(task.time);
      timeText.font = Font.semiboldSystemFont(12);
      timeText.textColor = new Color('#ffffff', 0.6);

      w.addSpacer(2);
    }
  } else {
    const noTask = w.addText('タスクデータなし');
    noTask.font = Font.systemFont(13);
    noTask.textColor = new Color('#ffffff', 0.5);
  }

  w.addSpacer();

  // === Footer ===
  const footer = w.addStack();
  footer.layoutHorizontally();
  footer.centerAlignContent();

  const tapHint = footer.addText('タップで詳細を開く');
  tapHint.font = Font.systemFont(9);
  tapHint.textColor = new Color('#ffffff', 0.35);

  return w;
}

// ===== MAIN =====
const widget = await buildWidget();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  await widget.presentMedium();
}

Script.complete();
