// ============================================================
// SkillBridge — app.js (Enhanced)
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

function handleBrandClick() {
  const internalNav = document.getElementById('internal-nav');
  if (internalNav && internalNav.style.display !== 'none') {
    showSection('home');
  } else {
    showSection('landing');
  }
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
        <td><button class="btn-hire" onclick="alert('Interview invite sent to ${student.name} via SkillBridge platform!')">Hire / Interview</button></td>
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
  
  // Show Chat Widget
  const chatWidget = document.getElementById('chat-widget-container');
  if (chatWidget) chatWidget.style.display = 'block';

  // Go to Student Home
  showSection('home');
  
  alert("Welcome to SkillBridge! You are now logged in as Arjun S.");
}

// ---------- PEER CHAT ENHANCEMENTS ----------
const USER_PROFILES = {
  '@neha_g': { name: 'Neha Gupta', avatar: '👱‍♀️', bio: 'Backend & Cloud. Prepping for Amazon roles.', streak: 14, xp: '2.4k' },
  '@rahul_k': { name: 'Rahul Kumar', avatar: '🧑‍💻', bio: 'Fullstack Dev. Solving real problems daily.', streak: 5, xp: '800' },
  '@karan_m': { name: 'Karan M.', avatar: '👨‍🎓', bio: 'Looking for study partners for system design.', streak: 21, xp: '5.1k' },
  '@priya_d': { name: 'Priya D.', avatar: '👩‍🔬', bio: 'AI enthusiast and front-end learner.', streak: 2, xp: '150' },
  '@rohan_k': { name: 'Rohan K.', avatar: '🎸', bio: 'Music and code. Let us chill.', streak: 8, xp: '1.2k' },
};

const CHAT_DATA = {
  'venting-space': `
    <div class="chat-msg system-msg">Welcome to Venting Space. A judgment-free zone to share your stress. 💙</div>
    <div class="chat-row">
      <div class="chat-avatar">👱‍♀️</div>
      <div class="chat-msg"><span class="chat-username" onclick="showProfile('@neha_g')">@neha_g</span> <span class="msg-time">2 mins ago</span><br/>Feeling so burnt out today. This API rate limiter problem is making me crazy 😭</div>
    </div>
    <div class="chat-row">
      <div class="chat-avatar">🧑‍💻</div>
      <div class="chat-msg"><span class="chat-username" onclick="showProfile('@rahul_k')">@rahul_k</span> <span class="msg-time">1 min ago</span><br/>Take a 10 min walk Neha! Mental health > XP points. Drink some water! 🫂</div>
    </div>
  `,
  'interview-prep': `
    <div class="chat-msg system-msg">Welcome to Interview Prep. Let's crack these companies together! 🚀</div>
    <div class="chat-row">
      <div class="chat-avatar">👨‍🎓</div>
      <div class="chat-msg"><span class="chat-username" onclick="showProfile('@karan_m')">@karan_m</span> <span class="msg-time">10 mins ago</span><br/>Anyone has good resources for understanding WebSockets? The Uber challenge is tough.</div>
    </div>
    <div class="chat-row">
      <div class="chat-avatar">👩‍🔬</div>
      <div class="chat-msg"><span class="chat-username" onclick="showProfile('@priya_d')">@priya_d</span> <span class="msg-time">5 mins ago</span><br/>I found a great 10-min tutorial. I'll share the link here shortly!</div>
    </div>
  `,
  'study-groups': `
    <div class="chat-msg system-msg" style="margin-bottom:1rem;">Find peers preparing for the same roles and study together.</div>
    <button class="btn-primary" style="width:100%; padding:8px; font-size:0.85rem; margin-bottom:1rem; border-radius:8px;" onclick="createStudyGroup()">+ Create Study Group</button>
    
    <div class="study-group-card">
      <div class="study-group-title">Amazon SDE Prep</div>
      <div class="study-group-meta">
        <span>Host: <span class="chat-username" onclick="showProfile('@neha_g')">@neha_g</span></span>
        <span>👥 3/5</span>
      </div>
      <button class="btn-join" onclick="joinStudyGroup(this)">Join Group</button>
    </div>

    <div class="study-group-card">
      <div class="study-group-title">System Design Mocks</div>
      <div class="study-group-meta">
        <span>Host: <span class="chat-username" onclick="showProfile('@rahul_k')">@rahul_k</span></span>
        <span>👥 1/2</span>
      </div>
      <button class="btn-join" onclick="joinStudyGroup(this)">Join Group</button>
    </div>
  `,
  'general-chill': `
    <div class="chat-msg system-msg">Welcome to General Chill. Turn on some lofi and relax. 🎧</div>
    <div class="chat-row">
      <div class="chat-avatar">🎸</div>
      <div class="chat-msg"><span class="chat-username" onclick="showProfile('@rohan_k')">@rohan_k</span> <span class="msg-time">1 hr ago</span><br/>What's everyone listening to right now while coding?</div>
    </div>
  `
};

function toggleChat() {
  const chat = document.getElementById('peer-chat-window');
  const badge = document.getElementById('chat-badge');
  if (chat) chat.classList.toggle('active');
  if (badge) badge.style.display = 'none';
  
  const chatBody = document.getElementById('chat-messages');
  if(chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  closeProfile(); // Ensure profile is closed when toggling
}

function switchChatChannel(channelName, btn) {
  const channels = document.querySelectorAll('.chat-channel');
  channels.forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  
  const chatBody = document.getElementById('chat-messages');
  const inputArea = document.getElementById('chat-input-area');
  
  if (chatBody && CHAT_DATA[channelName]) {
    chatBody.innerHTML = CHAT_DATA[channelName];
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Hide input area in study-groups tab
  if (channelName === 'study-groups') {
    inputArea.style.display = 'none';
  } else {
    inputArea.style.display = 'flex';
  }
  closeProfile();
}

function handleChatEnter(e) {
  if(e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const msgText = input.value.trim();
  if(!msgText) return;
  
  const chatBody = document.getElementById('chat-messages');
  const msgHTML = `
    <div class="chat-row you">
      <div class="chat-avatar">👨‍💻</div>
      <div class="chat-msg">
        <span class="chat-username">@arjun_s</span> <span class="msg-time">Just now</span><br/>
        ${msgText}
      </div>
    </div>
  `;
  chatBody.insertAdjacentHTML('beforeend', msgHTML);
  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;
  
  setTimeout(() => { simulatePeerReply(chatBody); }, 1000);
}

function simulatePeerReply(chatBody) {
  const typingHTML = `
    <div class="chat-row" id="typing-indicator">
      <div class="chat-avatar">👱‍♀️</div>
      <div class="chat-msg"><div class="typing-dots"><span></span><span></span><span></span></div></div>
    </div>
  `;
  chatBody.insertAdjacentHTML('beforeend', typingHTML);
  chatBody.scrollTop = chatBody.scrollHeight;
  
  setTimeout(() => {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
    
    const replyHTML = `
      <div class="chat-row">
        <div class="chat-avatar">👱‍♀️</div>
        <div class="chat-msg">
          <span class="chat-username" onclick="showProfile('@neha_g')">@neha_g</span> <span class="msg-time">Just now</span><br/>
          Thanks Arjun! That really helps. I appreciate the support. 💙
        </div>
      </div>
    `;
    chatBody.insertAdjacentHTML('beforeend', replyHTML);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 2500);
}

// --- PROFILE & GROUP STUDY LOGIC ---
function showProfile(handle) {
  const p = USER_PROFILES[handle];
  if(!p) return;
  document.getElementById('mp-avatar').innerText = p.avatar;
  document.getElementById('mp-name').innerText = p.name;
  document.getElementById('mp-handle').innerText = handle;
  document.getElementById('mp-bio').innerText = p.bio;
  document.getElementById('mp-streak').innerText = p.streak;
  document.getElementById('mp-xp').innerText = p.xp;
  document.getElementById('mini-profile').style.display = 'block';
}

function closeProfile() {
  document.getElementById('mini-profile').style.display = 'none';
}

function joinStudyGroup(btn) {
  if(btn.innerText === 'Join Group') {
    btn.innerText = 'Joined ✓';
    btn.style.background = 'var(--green)';
    btn.style.color = 'white';
    btn.style.borderColor = 'var(--green)';
  } else {
    btn.innerText = 'Join Group';
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }
}

function createStudyGroup() {
  const topic = prompt("Enter Study Group Topic (e.g., 'Google Cloud APIs'):");
  if(topic && topic.trim() !== '') {
    alert(`Success! Your study group '${topic}' has been created. Others can now join you.`);
  }
}

// ---------- AI ROADMAP (GEMINI API) ----------
// ---------- AI ROADMAP & CAREER ASSISTANT ----------
function toggleAIModal() {
  const overlay = document.getElementById('ai-modal-overlay');
  if (!overlay) return;
  
  const willBeActive = !overlay.classList.contains('active');
  if (willBeActive) {
    overlay.classList.add('active');
    setTimeout(() => {
      const topicInput = document.getElementById('roadmap-topic');
      if (topicInput) topicInput.focus();
    }, 100);
  } else {
    overlay.classList.remove('active');
  }
}

function closeAIModal(e) {
  const overlay = document.getElementById('ai-modal-overlay');
  if (!overlay) return;
  if (!e || e.target === overlay || (e.target && e.target.classList && e.target.classList.contains('modal-close'))) {
    overlay.classList.remove('active');
  }
}

function setRoadmapTopic(topic) {
  const input = document.getElementById('roadmap-topic');
  if (input) {
    input.value = topic;
    input.focus();
  }
}

async function generateRoadmap() {
  const topicInput = document.getElementById('roadmap-topic');
  const outputDiv = document.getElementById('ai-roadmap-output');
  const btn = document.getElementById('ai-generate-btn');

  const topic = topicInput ? topicInput.value.trim() : '';

  if (!topic) {
    if (outputDiv) {
      outputDiv.style.display = 'block';
      outputDiv.innerHTML = `
        <div style="background: rgba(255, 71, 87, 0.1); border-left: 4px solid var(--red); padding: 12px; color: var(--text); border-radius: 6px;">
          <strong style="color:var(--red);">Target Required:</strong> Please enter a target role or click one of the quick suggestions above.
        </div>
      `;
    }
    return;
  }

  // Loading state
  btn.innerText = "Analyzing...";
  btn.disabled = true;
  outputDiv.style.display = 'block';
  outputDiv.innerHTML = `
    <div style='text-align:center; padding: 2rem;'>
      <div class='typing-dots' style='justify-content:center; margin-bottom: 1rem;'><span></span><span></span><span></span></div>
      <p style='color:var(--primary); font-weight: 600; margin:0;'>SkillBridge AI is mapping industry requirements & curating your roadmap for: <span style="color:var(--text);">${escapeRoadmapHTML(topic)}</span>...</p>
    </div>
  `;

  // Instant intelligent AI engine (Always reliable for demo)
  setTimeout(() => {
    outputDiv.innerHTML = renderSmartRoadmap(topic);
    btn.innerText = "Generate ✨";
    btn.disabled = false;
  }, 900);
}

function escapeRoadmapHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function copyRoadmapText() {
  const output = document.getElementById('ai-roadmap-output');
  if (output) {
    navigator.clipboard.writeText(output.innerText);
    alert("Roadmap copied to clipboard!");
  }
}

function renderSmartRoadmap(topic) {
  const safeTopic = escapeRoadmapHTML(topic);
  const lower = topic.toLowerCase();
  
  // Keyword-aware customization
  let stack = "Core CS, System Design, REST APIs, Git";
  let w1Focus = "Language Internals, Memory Model & Data Structures";
  let w2Focus = "Production Architecture, Framework Deep-Dive & Modular Design";
  let w3Focus = "Database Indexing, Concurrency, Caching & Performance Profiling";
  let w4Focus = "MNC Mock Interviews, STAR Behavioral Storytelling & Live Problem Solving";
  let projectIdea = "Distributed Rate Limiter & Telemetry Dashboard";
  let questions = [
    "How does your architecture handle network partitions (CAP theorem)?",
    "Walk me through your database indexing strategy for 1M reads/minute.",
    "Describe a time you solved an elusive production memory leak or bottleneck."
  ];

  if (lower.includes('front') || lower.includes('react') || lower.includes('ui')) {
    stack = "React 19, Next.js App Router, TypeScript, TailwindCSS, Web Vitals";
    w1Focus = "DOM Re-rendering Cycles, Fiber Architecture & Browser Event Loops";
    w2Focus = "Server Components, State Management (Zustand) & Accessible Design";
    w3Focus = "LCP/CLS Optimization, Code Splitting, Virtualized Lists (10k+ rows)";
    w4Focus = "Machine Coding Round: Build a dynamic autocomplete or accessible data grid in 45 mins";
    projectIdea = "Ultra-Fast Netflix-Style Streaming Grid with Client-Side Buffering";
    questions = [
      "How does React 18+ concurrent rendering differ from traditional sync rendering?",
      "How would you optimize Core Web Vitals (LCP, INP, CLS) on a high-traffic e-commerce page?",
      "Design an accessible keyboard-navigable combobox meeting WCAG AA standards."
    ];
  } else if (lower.includes('back') || lower.includes('node') || lower.includes('uber') || lower.includes('system') || lower.includes('amazon')) {
    stack = "Node.js / Go, Redis, PostgreSQL, Kafka/RabbitMQ, Docker";
    w1Focus = "Concurrency Models (Event Loop vs Goroutines), TCP/HTTP2, Database Normalization";
    w2Focus = "Idempotent API Design, JWT/OAuth2 Security & Connection Pooling";
    w3Focus = "Distributed Caching (Redis Cache-Aside), Sharding & Message Queues";
    w4Focus = "High-Level System Design: Rate Limiter, TinyURL, Live Ride-Tracking Dispatcher";
    projectIdea = "Distributed Token-Bucket Rate Limiter with Redis & Real-time Telemetry";
    questions = [
      "How do you ensure idempotency across distributed microservice payment webhooks?",
      "Explain the trade-offs between Redis Cluster vs Memcached for session storage.",
      "How would you architect a driver-rider coordinate broadcasting service handling 100k TPS?"
    ];
  } else if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine') || lower.includes('data')) {
    stack = "Python 3.12, PyTorch, LangChain, Vector DBs (Pinecone/Chroma), HuggingFace";
    w1Focus = "Linear Algebra, Vector Embeddings, Transformer Attention Mechanisms";
    w2Focus = "RAG Pipelines, Chunking Strategies, Prompt Engineering & LLM APIs";
    w3Focus = "Model Quantization, Latency Optimization, Semantic Caching & Evaluation";
    w4Focus = "AI System Design: Semantic Search Engine, Agentic Workflow Orchestrator";
    projectIdea = "End-to-End Enterprise RAG Assistant with Hybrid Search & Citation Tracking";
    questions = [
      "How do you evaluate hallucination rates in production RAG systems?",
      "Explain the mathematical intuition behind Self-Attention in Transformer models.",
      "What are the performance implications of FP16 vs INT8 quantization for LLM inference?"
    ];
  }

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.2rem; border-bottom:1px solid var(--border); padding-bottom:0.75rem;">
      <div>
        <span style="font-size:0.78rem; background:rgba(108,99,255,0.15); color:var(--primary); padding:3px 10px; border-radius:999px; font-weight:700;">🎯 Target Role: ${safeTopic}</span>
      </div>
      <button class="btn-ghost small" onclick="copyRoadmapText()">📋 Copy Roadmap</button>
    </div>

    <!-- WEEK 1 -->
    <div class="roadmap-week-card">
      <div class="roadmap-week-header">
        <span class="roadmap-week-title">📅 Week 1: Foundations & Core Concepts</span>
        <span class="roadmap-badge">Stage 1</span>
      </div>
      <ul class="roadmap-points">
        <li><strong>Focus:</strong> ${w1Focus}.</li>
        <li><strong>Tech Core:</strong> ${stack.split(',')[0]} & standard problem-solving patterns.</li>
        <li><strong>SkillBridge Goal:</strong> Complete 2 Medium algorithmic/engineering challenges to establish baseline XP.</li>
      </ul>
    </div>

    <!-- WEEK 2 -->
    <div class="roadmap-week-card">
      <div class="roadmap-week-header">
        <span class="roadmap-week-title">⚙️ Week 2: Production-Grade Implementation</span>
        <span class="roadmap-badge">Stage 2</span>
      </div>
      <ul class="roadmap-points">
        <li><strong>Focus:</strong> ${w2Focus}.</li>
        <li><strong>Industry Stack:</strong> ${stack}.</li>
        <li><strong>Hands-on:</strong> Build modular architecture with automated test coverage and error boundaries.</li>
      </ul>
    </div>

    <!-- WEEK 3 -->
    <div class="roadmap-week-card">
      <div class="roadmap-week-header">
        <span class="roadmap-week-title">⚡ Week 3: Scale, Performance & Edge Cases</span>
        <span class="roadmap-badge">Stage 3</span>
      </div>
      <ul class="roadmap-points">
        <li><strong>Focus:</strong> ${w3Focus}.</li>
        <li><strong>Portfolio Milestone:</strong> Build: <em>"${projectIdea}"</em>.</li>
        <li><strong>Challenge:</strong> Solve the Amazon Rate Limiter or Search API challenge in SkillBridge Arena (+500 XP).</li>
      </ul>
    </div>

    <!-- WEEK 4 -->
    <div class="roadmap-week-card">
      <div class="roadmap-week-header">
        <span class="roadmap-week-title">🏆 Week 4: MNC Interview Readiness & Peer Mock</span>
        <span class="roadmap-badge">Stage 4</span>
      </div>
      <ul class="roadmap-points">
        <li><strong>Focus:</strong> ${w4Focus}.</li>
        <li><strong>Community:</strong> Join a study group in the <strong>Peer Lounge</strong> to conduct 2 live peer mock rounds.</li>
        <li><strong>Behavioral:</strong> Prepare 4 STAR-format stories highlighting trade-offs, failures, and production ownership.</li>
      </ul>
    </div>

    <!-- INTERVIEW QUESTIONS -->
    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:1.2rem; margin-top:1.2rem;">
      <h4 style="margin:0 0 0.8rem 0; font-size:0.95rem; color:var(--primary); display:flex; align-items:center; gap:6px;">
        💡 High-Frequency MNC Interview Questions
      </h4>
      <ol style="margin:0; padding-left:1.2rem; font-size:0.88rem; color:var(--text2); line-height:1.6;">
        ${questions.map(q => `<li style="margin-bottom:6px;">${q}</li>`).join('')}
      </ol>
    </div>
  `;
}

// Ensure init covers basic setup
document.addEventListener('DOMContentLoaded', () => {
  showSection('landing');
  renderProblems('all');
  switchCompany('amazon', document.querySelector('#hr-view .chip.active')); // Load initial HR view
  renderStreakCalendar();
  switchChatChannel('venting-space', document.querySelector('.chat-channel.active')); // Load initial chat
});
