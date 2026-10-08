// ============================================================
// PlacementShield — app.js
// ============================================================

// ---------- NAV ----------
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const link = document.querySelector(`.nav-link[href="#${id}"]`);
  if (link) link.classList.add('active');
  window.scrollTo(0, 0);
}

// ---------- EXAMPLES ----------
const EXAMPLES = {
  ml: "Developed an ML-based Spam Email Classifier using Python, Scikit-learn, and TF-IDF vectorization. Achieved 97.3% accuracy on the Enron spam dataset. Deployed as a Flask REST API.",
  web: "Built a full-stack e-commerce web application using React, Node.js, Express, MongoDB with JWT authentication, Stripe payment integration, and deployed on AWS EC2 with NGINX reverse proxy.",
  api: "Designed and built a RESTful API for a food delivery app using Node.js, PostgreSQL, Redis caching for high traffic, and documented with Swagger. Handled 10,000+ daily requests.",
  db: "Migrated legacy MySQL database to MongoDB, designed schema with embedded documents and indexing strategies. Reduced average query time by 60% and improved horizontal scalability."
};
function loadExample(type) {
  document.getElementById('resume-input').value = EXAMPLES[type];
}

// ---------- KNOWLEDGE BASE — Danger Pattern Detector ----------
const PATTERNS = [
  { regex: /mongodb|nosql|mongoose/i, tag: 'Database Choice', questions: [
    "Why MongoDB over a relational database like MySQL or PostgreSQL for this use case?",
    "How did you handle data consistency and ACID properties in MongoDB?",
    "What indexing strategy did you apply? Explain your most complex query.",
    "What happens when your collection grows to 50 million documents? How would you shard it?",
    "Can you explain the CAP theorem and where MongoDB sits in it?"
  ]},
  { regex: /jwt|json web token|authentication|auth/i, tag: 'Authentication', questions: [
    "Why JWT over session-based authentication? What are the trade-offs?",
    "What happens when a JWT is compromised before its expiry? How do you handle token revocation?",
    "Where did you store the JWT on the client side and why? What are the XSS/CSRF risks?",
    "Explain the difference between access tokens and refresh tokens in your implementation.",
    "How would you implement role-based access control on top of your JWT system?"
  ]},
  { regex: /react|angular|vue|frontend|ui/i, tag: 'Frontend Framework', questions: [
    "Why did you choose React over Vue.js or Angular for this project?",
    "Explain the component lifecycle in React and when you used useEffect with cleanup.",
    "How did you manage global state? Redux, Context API, or Zustand — and why?",
    "What performance optimizations did you implement? Lazy loading, memoization, code splitting?",
    "How did you handle routing and protect private routes in your application?"
  ]},
  { regex: /machine learning|ml|tensorflow|pytorch|scikit|model|accuracy/i, tag: 'ML / AI', questions: [
    "Why did you choose this algorithm over alternatives? What were the trade-offs?",
    "Walk me through how you split your data — training, validation, and test sets. Why those ratios?",
    "Your model shows 97% accuracy. Could it be overfitting? How did you verify?",
    "How did you handle class imbalance in your dataset, if at all?",
    "If this model were deployed in production, how would you monitor for model drift?"
  ]},
  { regex: /aws|azure|gcp|deploy|docker|kubernetes|cloud|nginx|ec2/i, tag: 'Deployment & DevOps', questions: [
    "Walk me through your deployment pipeline. How did you automate it?",
    "How did you handle zero-downtime deployments?",
    "What happens if your EC2 instance goes down? What's your failover strategy?",
    "Explain NGINX's role in your architecture — why not expose Node.js directly?",
    "How did you manage environment variables and secrets securely?"
  ]},
  { regex: /api|rest|graphql|endpoint|http/i, tag: 'API Design', questions: [
    "Why REST and not GraphQL or gRPC for this use case?",
    "How did you handle API versioning? What would break if you changed an endpoint?",
    "Walk me through your error handling strategy — what HTTP status codes did you use and when?",
    "How did you implement rate limiting and what tool did you use?",
    "Describe a situation where your API design had a bottleneck. How did you resolve it?"
  ]},
  { regex: /redis|cache|caching/i, tag: 'Caching Strategy', questions: [
    "What did you cache, and what was your cache invalidation strategy?",
    "What is a cache stampede and how did you prevent it?",
    "What is the difference between Redis and Memcached? Why did you choose Redis?",
    "How did you set TTL values? What happens when cached data becomes stale?",
    "If Redis goes down, how does your application behave? Did you build a fallback?"
  ]},
  { regex: /stripe|payment|gateway|razorpay/i, tag: 'Payment Integration', questions: [
    "How did you handle failed payments and retries? Did you implement idempotency keys?",
    "What happens if the user's browser closes mid-payment? How do you reconcile the order?",
    "How did you protect webhook endpoints from spoofed Stripe calls?",
    "Did you store any card data? What PCI compliance considerations did you take?",
    "Walk me through a complete payment flow from button click to order confirmation."
  ]},
  { regex: /python|flask|django|fastapi/i, tag: 'Backend Framework', questions: [
    "Why Flask and not FastAPI or Django for this project?",
    "How did you handle concurrent requests in Flask? Is it thread-safe?",
    "Explain your project structure — how did you separate concerns (routes, models, services)?",
    "How did you manage database migrations?",
    "If traffic suddenly grew 10x, what would break first in your architecture?"
  ]},
];

function detectDangerZones(text) {
  const matched = [];
  for (const p of PATTERNS) {
    if (p.regex.test(text)) matched.push(p);
  }
  // Always add a generic one
  matched.push({ tag: 'Your Decision-Making', questions: [
    "Walk me through the biggest technical challenge you faced in this project and exactly how you solved it.",
    "What would you do differently if you rebuilt this project from scratch today?",
    "What was the hardest bug you debugged? How did you approach it?",
    "If a senior engineer reviewed your code tomorrow, what would you proactively fix first?",
    "How long did this project take? What were the biggest time sinks?"
  ]});
  return matched;
}

// ---------- STATE ----------
let state = {
  bullet: '',
  dangerZones: [],
  allQuestions: [],
  currentQ: 0,
  answers: [],
  scores: [],
  timer: null,
  timeLeft: 60,
};

// ---------- STEP 1 → ANALYSIS ----------
function analyzeResume() {
  const bullet = document.getElementById('resume-input').value.trim();
  if (!bullet || bullet.length < 20) {
    alert('Please paste a resume bullet (at least 20 characters).');
    return;
  }
  state.bullet = bullet;
  state.dangerZones = detectDangerZones(bullet);

  const container = document.getElementById('analysis-result');
  const zones = state.dangerZones.slice(0, Math.min(state.dangerZones.length, 4));

  let html = `<div class="analysis-section">
    <h4>🎯 Resume Bullet Received</h4>
    <div style="background:var(--bg3);border-radius:8px;padding:1rem;font-size:0.88rem;color:var(--text2);line-height:1.65;font-style:italic;">"${bullet}"</div>
  </div>`;

  html += `<div class="analysis-section">
    <h4>⚠️ Interviewer Attack Zones (${zones.length} Detected)</h4>
    <div class="analysis-tags">`;
  for (const z of zones) {
    html += `<span class="danger-tag">🎯 ${z.tag}</span>`;
  }
  html += `</div></div>`;

  html += `<div class="analysis-section">
    <h4>💡 What This Means</h4>
    <div class="analysis-tip">
      Interviewers will cross-examine you on <strong>${zones.map(z=>z.tag).join(', ')}</strong>. 
      Most students who built this from tutorials freeze when asked <em>why</em> they made specific technical choices 
      or how they'd handle edge cases. The drill ahead simulates that exact pressure.
    </div>
  </div>`;

  container.innerHTML = html;

  // Build question pool
  state.allQuestions = [];
  for (const z of zones) {
    const shuffled = z.questions.sort(() => Math.random() - 0.5);
    state.allQuestions.push({ zone: z.tag, question: shuffled[0] });
    if (state.allQuestions.length >= 5) break;
  }
  // Fill up to 5 if needed
  let i = 0;
  while (state.allQuestions.length < 5 && i < zones.length) {
    const q = zones[i].questions[1];
    if (q) state.allQuestions.push({ zone: zones[i].tag, question: q });
    i++;
  }
  state.allQuestions = state.allQuestions.slice(0, 5);

  goTo('step-analysis');
}

// ---------- START DRILL ----------
function startDrill() {
  state.currentQ = 0;
  state.answers = [];
  state.scores = [];
  goTo('step-drill');
  loadQuestion();
}

function loadQuestion() {
  const q = state.allQuestions[state.currentQ];
  document.getElementById('q-counter').textContent = `Question ${state.currentQ + 1} of 5`;
  document.getElementById('current-question').textContent = q.question;
  document.getElementById('answer-input').value = '';

  // Dots
  for (let i = 0; i < 5; i++) {
    const dot = document.getElementById(`dot-${i}`);
    dot.className = 'dot';
    if (i < state.currentQ) dot.classList.add('done');
    if (i === state.currentQ) dot.classList.add('active');
  }

  // Pressure
  const pressure = Math.round(((state.currentQ + 1) / 5) * 100);
  const fill = document.getElementById('pressure-fill');
  const pt = document.getElementById('pressure-text');
  fill.style.width = pressure + '%';
  if (pressure <= 20) { fill.style.background = 'var(--green)'; pt.textContent = 'Warm-Up'; pt.style.color = 'var(--green)'; }
  else if (pressure <= 50) { fill.style.background = 'var(--yellow)'; pt.textContent = 'Building'; pt.style.color = 'var(--yellow)'; }
  else if (pressure <= 80) { fill.style.background = 'var(--orange)'; pt.textContent = 'Intense'; pt.style.color = 'var(--orange)'; }
  else { fill.style.background = 'var(--red)'; pt.textContent = '🔥 MAX PRESSURE'; pt.style.color = 'var(--red)'; }

  startTimer();
}

function startTimer() {
  clearInterval(state.timer);
  state.timeLeft = 60;
  updateTimer();
  state.timer = setInterval(() => {
    state.timeLeft--;
    updateTimer();
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      autoSubmit();
    }
  }, 1000);
}

function updateTimer() {
  const el = document.getElementById('timer-count');
  const disp = document.querySelector('.timer-display');
  el.textContent = state.timeLeft;
  if (state.timeLeft <= 15) disp.classList.add('warning');
  else disp.classList.remove('warning');
}

function autoSubmit() {
  const ans = document.getElementById('answer-input').value.trim();
  recordAnswer(ans || '[No answer — timed out]', true);
}

function submitAnswer() {
  clearInterval(state.timer);
  const ans = document.getElementById('answer-input').value.trim();
  if (!ans) { alert('Type at least something before submitting!'); return; }
  recordAnswer(ans, false);
}

function skipQuestion() {
  clearInterval(state.timer);
  recordAnswer('[Skipped]', false, true);
}

function recordAnswer(answer, timedOut, skipped) {
  const q = state.allQuestions[state.currentQ];
  const score = evaluateAnswer(answer, timedOut, skipped);
  state.answers.push({ question: q.question, zone: q.zone, answer, score, timedOut, skipped });
  state.currentQ++;
  if (state.currentQ >= 5) {
    showResults();
  } else {
    loadQuestion();
  }
}

// ---------- EVALUATION ----------
const KEYWORDS_MAP = {
  'Database Choice': ['scalability','schema','flexible','document','horizontal','consistency','relational','sql','nosql','trade-off','acid','cap'],
  'Authentication': ['stateless','expiry','refresh','revoke','xss','csrf','httponly','secure','secret','payload','signature','bearer'],
  'Frontend Framework': ['component','state','virtual dom','hooks','lifecycle','rerender','performance','bundle','lazy','memo','context','redux'],
  'ML / AI': ['overfitting','underfitting','cross-validation','precision','recall','f1','training','test','validation','bias','variance','regularization'],
  'Deployment & DevOps': ['ci/cd','pipeline','rollback','blue-green','canary','container','load balancer','auto-scaling','monitoring','logs'],
  'API Design': ['idempotent','rest','status code','versioning','rate limit','pagination','error handling','endpoint','swagger','documentation'],
  'Caching Strategy': ['ttl','invalidation','stale','stampede','hit rate','miss','eviction','lru','consistency','write-through','write-behind'],
  'Payment Integration': ['idempotency','webhook','signature','retry','refund','pci','tokenization','reconciliation','failed','timeout'],
  'Backend Framework': ['middleware','orm','migration','async','thread','worker','request','response','mvc','service','controller'],
  'Your Decision-Making': ['challenge','learned','refactor','improve','debug','bottleneck','trade-off','decision','reason','because'],
};

function evaluateAnswer(answer, timedOut, skipped) {
  if (timedOut || skipped) return { clarity: 0, depth: 0, honesty: 0, total: 0 };
  const lower = answer.toLowerCase();
  const words = lower.split(/\s+/).length;

  let clarity = 0;
  let depth = 0;
  let honesty = 0;

  // Clarity: is it a coherent answer?
  if (words >= 10) clarity += 3;
  if (words >= 25) clarity += 3;
  if (words >= 50) clarity += 4;

  // Depth: does it contain technical keywords?
  for (const [zone, kws] of Object.entries(KEYWORDS_MAP)) {
    const hits = kws.filter(kw => lower.includes(kw)).length;
    depth = Math.max(depth, hits);
  }
  depth = Math.min(10, depth * 2);

  // Honesty: mentions trade-offs, uncertainty, learnings
  const honestyKws = ["because","reason","chose","trade-off","limitation","would improve","didn't","wasn't sure","learned","realized","could have"];
  const hHits = honestyKws.filter(kw => lower.includes(kw)).length;
  honesty = Math.min(10, hHits * 3 + 2);

  return { clarity, depth, honesty, total: Math.round((clarity + depth + honesty) / 3) };
}

// Model answers
const MODEL_ANSWERS = {
  default: "A strong answer clearly states your decision (e.g., 'I chose X because...'), explains the trade-off considered, gives a concrete example from your project, and acknowledges limitations or what you'd improve. Avoid one-liners — use 3–5 sentences with technical reasoning."
};

function showResults() {
  clearInterval(state.timer);
  const totalScore = state.answers.reduce((s, a) => s + a.score.total, 0);
  const avgScore = Math.round(totalScore / state.answers.length);

  let grade, gradeColor, gradeMsg;
  if (avgScore >= 8) { grade = 'A'; gradeColor = 'var(--green)'; gradeMsg = "Interview-Ready. You defend your projects well — keep sharpening edge cases."; }
  else if (avgScore >= 6) { grade = 'B'; gradeColor = 'var(--yellow)'; gradeMsg = "Solid foundation. A few answers lacked depth — review the model answers below."; }
  else if (avgScore >= 4) { grade = 'C'; gradeColor = 'var(--orange)'; gradeMsg = "Needs Work. You know the surface but interviewers will dig deeper. Practice more."; }
  else { grade = 'D'; gradeColor = 'var(--red)'; gradeMsg = "High Risk. You need to understand WHY you used each technology, not just HOW."; }

  document.getElementById('score-display').innerHTML = `
    <div style="font-size:5rem;font-weight:900;color:${gradeColor};letter-spacing:-3px;line-height:1;">${grade}</div>
    <div style="font-size:1.5rem;font-weight:700;margin:0.5rem 0;">Average Score: ${avgScore}/10</div>
    <div style="color:var(--text2);font-size:0.95rem;max-width:500px;margin:0 auto;">${gradeMsg}</div>
    <div style="display:flex;justify-content:center;gap:2rem;margin-top:1.5rem;">
      <div><div style="font-size:1.5rem;font-weight:800;color:var(--green)">${Math.round(state.answers.reduce((s,a)=>s+a.score.clarity,0)/state.answers.length)}/10</div><div style="font-size:0.75rem;color:var(--text3);font-weight:700;text-transform:uppercase;">Clarity</div></div>
      <div><div style="font-size:1.5rem;font-weight:800;color:var(--primary)">${Math.round(state.answers.reduce((s,a)=>s+a.score.depth,0)/state.answers.length)}/10</div><div style="font-size:0.75rem;color:var(--text3);font-weight:700;text-transform:uppercase;">Tech Depth</div></div>
      <div><div style="font-size:1.5rem;font-weight:800;color:var(--yellow)">${Math.round(state.answers.reduce((s,a)=>s+a.score.honesty,0)/state.answers.length)}/10</div><div style="font-size:0.75rem;color:var(--text3);font-weight:700;text-transform:uppercase;">Honesty</div></div>
    </div>
  `;

  let feedbackHTML = '';
  state.answers.forEach((a, i) => {
    const total = a.score.total;
    const color = total >= 7 ? 'var(--green)' : total >= 4 ? 'var(--yellow)' : 'var(--red)';
    feedbackHTML += `
      <div class="feedback-item">
        <div class="feedback-q">Q${i+1} [${a.zone}]: ${a.question}</div>
        <div class="feedback-your">Your answer: "${a.answer.length > 200 ? a.answer.slice(0,200)+'...' : a.answer}"</div>
        <div class="feedback-score">
          <div class="fscore"><div class="fscore-val" style="color:${color}">${a.score.total}/10</div><div class="fscore-label">Overall</div></div>
          <div class="fscore"><div class="fscore-val">${a.score.clarity}/10</div><div class="fscore-label">Clarity</div></div>
          <div class="fscore"><div class="fscore-val">${a.score.depth}/10</div><div class="fscore-label">Depth</div></div>
          <div class="fscore"><div class="fscore-val">${a.score.honesty}/10</div><div class="fscore-label">Honesty</div></div>
        </div>
        <div class="feedback-model">💡 Model Answer Tip: ${MODEL_ANSWERS.default}</div>
      </div>`;
  });
  document.getElementById('detailed-feedback').innerHTML = feedbackHTML;

  goTo('step-results');
}

function restartDrill() {
  goTo('step-input');
  document.getElementById('resume-input').value = '';
}

// ---------- UTILS ----------
function goTo(stepId) {
  document.querySelectorAll('.drill-step').forEach(s => s.classList.remove('active-step'));
  document.getElementById(stepId).classList.add('active-step');
  window.scrollTo(0, 0);
}
function goBack(stepId) { goTo(stepId); }

// Init
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
});
