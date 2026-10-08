// ============================================================
// IndustrySync — app.js (Enhanced)
// ============================================================

// ---------- NAV ----------
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  
  const targetSection = document.getElementById(id);
  if (targetSection) targetSection.classList.add('active');
  
  const link = document.querySelector(`.nav-link[href="#${id}"]`);
  if (link) link.classList.add('active');
  
  window.scrollTo(0, 0);
}

// ---------- MOCK DATA ----------
const MOCK_PROBLEMS = [
  { company: "Amazon", title: "Design a Distributed Rate Limiter", diff: "Hard", xp: 500, tags: ["System Design", "Backend", "Redis"], recommended: true, desc: "Our API gateway handles 1M requests/sec. We need to implement a token bucket rate limiter to prevent abuse." },
  { company: "Google", title: "Optimize Search API Load Time", diff: "Medium", xp: 300, tags: ["API", "Performance", "Node.js"], recommended: true, desc: "A specific API endpoint is taking 400ms to resolve. Bring it down to 50ms using caching and query optimization." },
  { company: "Microsoft", title: "Build an Accessible Data Grid", diff: "Medium", xp: 250, tags: ["Frontend", "React", "A11y"], recommended: false, desc: "Create a React data table that is fully navigable by keyboard and screen-readers, supporting 10,000+ rows." },
  { company: "Netflix", title: "Implement Video Streaming Buffering", diff: "Hard", xp: 600, tags: ["Frontend", "Algorithms", "JS"], recommended: false, desc: "Write the logic to dynamically adjust video quality based on the user's fluctuating network speed." },
  { company: "Uber", title: "Real-time Driver Location Tracking", diff: "Hard", xp: 550, tags: ["WebSockets", "Backend", "Go"], recommended: true, desc: "Establish a bidirectional WebSocket connection to broadcast driver coordinates to 10,000 active riders." },
  { company: "Stripe", title: "Idempotent Payment Webhooks", diff: "Medium", xp: 350, tags: ["API", "Backend", "Security"], recommended: false, desc: "Ensure that if our payment webhook is triggered twice due to network retries, the user isn't charged twice." }
];

const HR_DATA = {
  amazon: {
    name: "Amazon", logo: "🟠", title: "Design a Distributed Rate Limiter",
    students: [
      { name: "Neha Gupta", college: "IIT Delhi", match: "95%", xp: "4,200 XP" },
      { name: "Rahul K.", college: "Pune Institute", match: "90%", xp: "3,850 XP" },
      { name: "Arjun Sharma", college: "NIT Kurukshetra", match: "85%", xp: "2,450 XP" }
    ]
  },
  google: {
    name: "Google", logo: "🔵", title: "Optimize Search API Load Time",
    students: [
      { name: "Priya M.", college: "State Engineering College", match: "98%", xp: "5,100 XP" },
      { name: "Kartik B.", college: "Delhi University", match: "88%", xp: "2,900 XP" }
    ]
  },
  microsoft: {
    name: "Microsoft", logo: "🟦", title: "Build an Accessible Data Grid",
    students: [
      { name: "Sneha P.", college: "BITS Pilani", match: "100%", xp: "6,000 XP" },
      { name: "Ankit D.", college: "VIT Vellore", match: "92%", xp: "3,100 XP" }
    ]
  },
  netflix: {
    name: "Netflix", logo: "🔴", title: "Implement Video Streaming Buffering",
    students: [
      { name: "Rohan M.", college: "IIT Bombay", match: "99%", xp: "7,200 XP" }
    ]
  }
};

// ---------- RENDER FUNCTIONS ----------
function renderProblems(filter = 'all') {
  const recContainer = document.getElementById('recommended-problems');
  const arenaContainer = document.getElementById('arena-problems');
  
  if (!arenaContainer) return;

  let recHTML = '';
  let arenaHTML = '';

  MOCK_PROBLEMS.forEach((p, index) => {
    // Filter logic
    if (filter !== 'all') {
      if (filter === 'hard' && p.diff !== 'Hard') return;
      if (filter === 'medium' && p.diff !== 'Medium') return;
      if (filter !== 'hard' && filter !== 'medium' && p.company.toLowerCase() !== filter) return;
    }

    const diffColor = p.diff === 'Hard' ? 'var(--red)' : p.diff === 'Medium' ? 'var(--orange)' : 'var(--green)';
    const cardHTML = `
      <div class="problem-card">
        <div class="company-tag">${p.company}</div>
        <h3 class="problem-title">${p.title}</h3>
        <div class="problem-meta">
          <span style="color: ${diffColor}">🎯 ${p.diff}</span>
          <span>⏱️ Est: 45 mins</span>
        </div>
        <div class="tech-stack">
          ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="problem-actions">
          <span class="xp-reward">+${p.xp} XP</span>
          <button class="btn-ghost small" onclick="openModal(${index})">View Challenge</button>
        </div>
      </div>
    `;
    
    // Only put in recommended if we are viewing 'all'
    if (filter === 'all' && p.recommended && recContainer) recHTML += cardHTML;
    
    arenaHTML += cardHTML;
  });

  if (recContainer && filter === 'all') recContainer.innerHTML = recHTML;
  arenaContainer.innerHTML = arenaHTML;
}

function filterProblems(filter, btn) {
  // Update active chip safely
  if (btn) {
    const chips = btn.parentElement.querySelectorAll('.chip');
    chips.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
  }
  // Re-render
  renderProblems(filter);
}

function switchCompany(companyKey, btn) {
  // Update active chip safely
  if (btn) {
    const chips = btn.parentElement.querySelectorAll('.chip');
    chips.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
  }

  const data = HR_DATA[companyKey];
  if (!data) return;

  const hrLogo = document.getElementById('hr-logo');
  if (hrLogo) hrLogo.textContent = data.logo;

  const hrTitle = document.getElementById('hr-title');
  if (hrTitle) hrTitle.textContent = `${data.name} Recruiter Dashboard`;

  const hrSub = document.getElementById('hr-sub');
  if (hrSub) hrSub.innerHTML = `Top performers for: <strong>"${data.title}"</strong>`;

  const tbody = document.getElementById('leaderboard-body');
  if (!tbody) return;

  let html = '';
  data.students.forEach((student, index) => {
    const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
    const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
    html += `
      <tr>
        <td class="${rankClass}">${rankIcon}</td>
        <td><strong>${student.name}</strong></td>
        <td>${student.college}</td>
        <td><span class="tech-tag" style="background:var(--green);color:white;border:none;">${student.match}</span></td>
        <td class="xp-reward">${student.xp}</td>
        <td><button class="btn-hire" onclick="alert('Interview invite sent to ${student.name} via IndustrySync platform!')">Hire / Interview</button></td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

function renderStreakCalendar() {
  const cal = document.getElementById('streak-calendar');
  if (!cal) return;
  
  let html = '';
  // 14 days mock: missed 2, active 7, future 5
  for (let i = 1; i <= 14; i++) {
    let className = 'streak-day';
    if (i <= 5) className += ' missed'; // Past missed
    else if (i <= 12) className += ' active'; // Current 7 day streak
    
    html += `<div class="${className}">${i}</div>`;
  }
  cal.innerHTML = html;
}

// ---------- MODAL ----------
function openModal(index) {
  const problem = MOCK_PROBLEMS[index];
  if (!problem) return;

  const content = `
    <h2 style="font-size:1.5rem;margin-bottom:0.5rem">${problem.title}</h2>
    <div style="color:var(--primary);font-weight:700;margin-bottom:1.5rem;">${problem.company} Engineering Team</div>
    <div style="padding:1rem;background:var(--bg2);border-radius:8px;margin-bottom:1.5rem;line-height:1.6;">
      <strong>The Problem:</strong><br/>
      ${problem.desc}
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:1.5rem;">
      <span class="xp-reward" style="font-size:1.2rem">+${problem.xp} XP</span>
      <button class="btn-primary" onclick="alert('In production, this opens an embedded VS Code instance with the starter repo.')">Start Coding</button>
    </div>
  `;
  document.getElementById('modal-content').innerHTML = content;
  document.getElementById('problem-modal').classList.add('active');
}

function closeModal(e) {
  if (e.target.id === 'problem-modal' || e.target.classList.contains('modal-close')) {
    document.getElementById('problem-modal').classList.remove('active');
  }
}

function closeAuthModal(e) {
  if (e.target.id === 'auth-modal' || e.target.classList.contains('modal-close')) {
    document.getElementById('auth-modal').classList.remove('active');
  }
}

function openAuth(type) {
  document.getElementById('auth-modal').classList.add('active');
  toggleAuthMode(type);
}

function toggleAuthMode(type) {
  const loginTab = document.getElementById('tab-login');
  const signupTab = document.getElementById('tab-signup');
  const signupFields = document.getElementById('signup-fields');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (type === 'login') {
    loginTab.style.color = 'var(--text)';
    signupTab.style.color = 'var(--text3)';
    signupFields.style.display = 'none';
    submitBtn.textContent = 'Sign In';
  } else {
    loginTab.style.color = 'var(--text3)';
    signupTab.style.color = 'var(--text)';
    signupFields.style.display = 'flex';
    submitBtn.textContent = 'Create Account';
  }
}

function mockLogin() {
  // Hide Auth Modal
  document.getElementById('auth-modal').classList.remove('active');
  
  // Update Navbar UI
  document.getElementById('auth-nav').style.display = 'none';
  document.getElementById('internal-nav').style.display = 'flex';
  document.getElementById('user-nav').style.display = 'flex';
  
  // Go to Dashboard
  showSection('dashboard');
  
  alert("Welcome to IndustrySync! You are now logged in as Arjun S.");
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  renderProblems('all');
  switchCompany('amazon', document.querySelector('#hr-view .chip.active')); // Load initial HR view
  renderStreakCalendar();
});
