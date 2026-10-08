// ============================================================
// IndustrySync — app.js
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
  { company: "Amazon", title: "Design a Distributed Rate Limiter", diff: "Hard", xp: 500, tags: ["System Design", "Backend", "Redis"], recommended: true },
  { company: "Google", title: "Optimize Search API Load Time", diff: "Medium", xp: 300, tags: ["API", "Performance", "Node.js"], recommended: true },
  { company: "Microsoft", title: "Build an Accessible Data Grid", diff: "Medium", xp: 250, tags: ["Frontend", "React", "A11y"], recommended: false },
  { company: "Netflix", title: "Implement Video Streaming Buffering", diff: "Hard", xp: 600, tags: ["Frontend", "Algorithms", "JS"], recommended: false },
  { company: "Uber", title: "Real-time Driver Location Tracking", diff: "Hard", xp: 550, tags: ["WebSockets", "Backend", "Go"], recommended: true },
  { company: "Stripe", title: "Idempotent Payment Webhooks", diff: "Medium", xp: 350, tags: ["API", "Backend", "Security"], recommended: false }
];

const MOCK_LEADERBOARD = [
  { name: "Neha Gupta", college: "IIT Delhi", xp: "4,200", status: "Top 1%" },
  { name: "Rahul K.", college: "Pune Institute", xp: "3,850", status: "Top 2%" },
  { name: "Arjun Sharma", college: "NIT Kurukshetra", xp: "2,450", status: "Top 5%" },
  { name: "Priya M.", college: "State Engineering College", xp: "2,100", status: "Top 10%" },
  { name: "Kartik B.", college: "Delhi University", xp: "1,900", status: "Top 15%" }
];

// ---------- RENDER FUNCTIONS ----------
function renderProblems() {
  const recContainer = document.getElementById('recommended-problems');
  const arenaContainer = document.getElementById('arena-problems');
  
  if (!recContainer || !arenaContainer) return;

  let recHTML = '';
  let arenaHTML = '';

  MOCK_PROBLEMS.forEach(p => {
    const diffColor = p.diff === 'Hard' ? 'var(--red)' : p.diff === 'Medium' ? 'var(--orange)' : 'var(--green)';
    const cardHTML = `
      <div class="problem-card">
        <div class="company-tag">${p.company} Challenges</div>
        <h3 class="problem-title">${p.title}</h3>
        <div class="problem-meta">
          <span style="color: ${diffColor}">🎯 ${p.diff}</span>
          <span>📚 View Tutorials</span>
        </div>
        <div class="tech-stack">
          ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="problem-actions">
          <span class="xp-reward">+${p.xp} XP</span>
          <button class="btn-ghost small" onclick="alert('Opening IDE environment for ${p.title}...')">Solve Now</button>
        </div>
      </div>
    `;
    if (p.recommended) recHTML += cardHTML;
    arenaHTML += cardHTML;
  });

  recContainer.innerHTML = recHTML;
  arenaContainer.innerHTML = arenaHTML;
}

function renderLeaderboard() {
  const tbody = document.getElementById('leaderboard-body');
  if (!tbody) return;

  let html = '';
  MOCK_LEADERBOARD.forEach((student, index) => {
    const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
    const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
    html += `
      <tr>
        <td class="${rankClass}">${rankIcon}</td>
        <td><strong>${student.name}</strong></td>
        <td>${student.college}</td>
        <td class="xp-reward">${student.xp} XP</td>
        <td><button class="btn-hire" onclick="alert('Initiating Interview process with ${student.name}')">Hire / Interview</button></td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  renderProblems();
  renderLeaderboard();
});
