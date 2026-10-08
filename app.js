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

const VIDEO_MASTERCLASSES = [
  {
    id: 0,
    company: "amazon",
    companyBadge: "🟠 Amazon AWS",
    title: "Architecting Distributed Token-Bucket Rate Limiters in Go",
    speaker: "Rohit Sen",
    speakerRole: "Principal Systems Architect @ Amazon AWS",
    duration: "28:00",
    rating: "⭐ 4.9 (1,420 students)",
    tags: ["System Design", "Redis", "Distributed Systems"],
    summary: "Learn how AWS API Gateways handle 1M+ requests per second using Redis cluster caching, sliding windows, and token bucket algorithms to prevent cascade failures.",
    chapters: [
      "00:00 - Why standard rate limiters fail at scale",
      "07:30 - Token Bucket vs Leaky Bucket vs Sliding Window",
      "15:20 - Distributed Redis atomic operations (Lua scripts)",
      "24:10 - MNC interview rubric & design trade-offs"
    ],
    challengeIndex: 0,
    challengeTitle: "Design a Distributed Rate Limiter (+500 XP)"
  },
  {
    id: 1,
    company: "netflix",
    companyBadge: "🔴 Netflix",
    title: "Client-Side Video Buffering & Chunk Streaming Protocols",
    speaker: "Sarah Chen",
    speakerRole: "Staff Frontend Infrastructure Architect @ Netflix",
    duration: "34:00",
    rating: "⭐ 5.0 (980 students)",
    tags: ["Frontend", "Streaming Protocols", "Algorithms"],
    summary: "Discover how Netflix dynamically adapts video bitrates under varying mobile network conditions using client-side buffers, HLS, and MSE protocols.",
    chapters: [
      "00:00 - Anatomy of video chunk streaming",
      "09:15 - MediaSource Extensions (MSE) in modern browsers",
      "18:40 - Dynamic buffer sizing algorithms",
      "28:00 - Live debugging production frame drops"
    ],
    challengeIndex: 3,
    challengeTitle: "Implement Video Streaming Buffering (+600 XP)"
  },
  {
    id: 2,
    company: "google",
    companyBadge: "🔵 Google",
    title: "Sub-50ms Search API Latency: Multi-Tier Cache Invalidation",
    speaker: "Vikram Mehta",
    speakerRole: "Staff Site Reliability Engineer @ Google Search",
    duration: "22:00",
    rating: "⭐ 4.8 (1,850 students)",
    tags: ["API Performance", "Caching", "Node.js"],
    summary: "A deep dive into how Google Search optimizes database queries and manages cache invalidation across distributed edge clusters to guarantee sub-50ms responses.",
    chapters: [
      "00:00 - Profiling 400ms bottlenecks in production APIs",
      "06:40 - Edge caching strategies & TTL optimization",
      "14:15 - Asynchronous background cache warming",
      "19:30 - Key metrics Google SREs watch in production"
    ],
    challengeIndex: 1,
    challengeTitle: "Optimize Search API Load Time (+300 XP)"
  },
  {
    id: 3,
    company: "uber",
    companyBadge: "🚗 Uber",
    title: "Handling 100k Concurrent Driver Location WebSockets in Real-Time",
    speaker: "Elena Rostova",
    speakerRole: "Lead Systems Engineer @ Uber Core Dispatch",
    duration: "30:00",
    rating: "⭐ 4.9 (1,120 students)",
    tags: ["WebSockets", "Go", "Geospatial Streaming"],
    summary: "How Uber streams driver geospatial coordinates to riders with sub-second latency using distributed WebSocket connection pools, Go goroutines, and spatial hashing.",
    chapters: [
      "00:00 - Real-time geospatial dispatch architecture",
      "08:20 - Scaling WebSocket connection termination",
      "16:50 - Quadtrees & spatial geo-indexing in Go",
      "25:00 - High concurrency mock interview scenario"
    ],
    challengeIndex: 4,
    challengeTitle: "Real-time Driver Location Tracking (+550 XP)"
  },
  {
    id: 4,
    company: "stripe",
    companyBadge: "💳 Stripe",
    title: "Building Fault-Tolerant, Idempotent Payment Webhook Systems",
    speaker: "David Miller",
    speakerRole: "Tech Lead @ Stripe Payments Core",
    duration: "26:00",
    rating: "⭐ 4.9 (840 students)",
    tags: ["Security", "Idempotency", "Backend Webhooks"],
    summary: "Understand why network retries double-charge users if APIs lack idempotency keys, and how Stripe builds rock-solid payment webhook dispatchers.",
    chapters: [
      "00:00 - The double-charge nightmare & network partitions",
      "07:10 - Designing idempotency keys & replay protection",
      "15:30 - Exponential backoff with jitter retry queues",
      "22:15 - Financial systems consistency requirements"
    ],
    challengeIndex: 5,
    challengeTitle: "Idempotent Payment Webhooks (+350 XP)"
  }
];

const TOTAL_REGISTERED_STUDENTS = 10482;
let currentSelectedCompany = 'amazon';

const HR_DATA = {
  amazon: {
    name: "Amazon", logo: "🟠", title: "Design a Distributed Rate Limiter",
    submissions: 482, shortlisted: 24, activeDrives: "2 Drives", nextDeadline: "in 17 days",
    students: [
      { name: "Neha Gupta", college: "IIT Delhi", match: "95%", xp: "4,200 XP" },
      { name: "Rahul K.", college: "Pune Institute", match: "90%", xp: "3,850 XP" },
      { name: "Anannay Kapoor", college: "NIT Kurukshetra", match: "96%", xp: "2,450 XP" }
    ]
  },
  google: {
    name: "Google", logo: "🔵", title: "Optimize Search API Load Time",
    submissions: 615, shortlisted: 18, activeDrives: "1 Drive", nextDeadline: "in 10 days",
    students: [
      { name: "Priya M.", college: "State Engineering College", match: "98%", xp: "5,100 XP" },
      { name: "Kartik B.", college: "Delhi University", match: "88%", xp: "2,900 XP" }
    ]
  },
  microsoft: {
    name: "Microsoft", logo: "🟦", title: "Build an Accessible Data Grid",
    submissions: 512, shortlisted: 22, activeDrives: "1 Drive", nextDeadline: "in 28 days",
    students: [
      { name: "Sneha P.", college: "BITS Pilani", match: "100%", xp: "6,000 XP" },
      { name: "Ankit D.", college: "VIT Vellore", match: "92%", xp: "3,100 XP" }
    ]
  },
  netflix: {
    name: "Netflix", logo: "🔴", title: "Implement Video Streaming Buffering",
    submissions: 340, shortlisted: 12, activeDrives: "1 Drive", nextDeadline: "in 6 days",
    students: [
      { name: "Rohan M.", college: "IIT Bombay", match: "99%", xp: "7,200 XP" }
    ]
  }
};

const HR_NOTICES = [
  {
    id: 1,
    company: "amazon",
    companyBadge: "🟠 Amazon AWS",
    title: "Amazon AWS SDE-1 Cloud Systems Hiring Drive (2026 Batch)",
    role: "Software Development Engineer 1 (AWS Cloud Core)",
    deadline: "Oct 25, 2026 • 11:59 PM IST",
    daysLeft: "17 Days Left",
    badgeType: "green",
    batches: "2025 & 2026 Graduating Batches",
    mandatoryChallenge: "Design a Distributed Rate Limiter",
    ctc: "₹45 LPA • Bangalore / Hyderabad / Hybrid",
    applicants: 482,
    instructions: "Students must solve the Rate Limiter challenge with >90% edge case pass rate. Top 50 will receive fast-track technical interview invitations."
  },
  {
    id: 2,
    company: "amazon",
    companyBadge: "🟠 Amazon AWS",
    title: "Amazon Summer Cloud Engineering Internship 2027",
    role: "Cloud Infrastructure Intern",
    deadline: "Nov 10, 2026 • 06:00 PM IST",
    daysLeft: "33 Days Left",
    badgeType: "green",
    batches: "2027 Batch (3rd Year Undergrads)",
    mandatoryChallenge: "Design a Distributed Rate Limiter",
    ctc: "₹1.1 Lakh/month Stipend + PPO Opportunity",
    applicants: 290,
    instructions: "Evaluation based on clean code structure, concurrency handling, and system design architecture documentation."
  },
  {
    id: 3,
    company: "google",
    companyBadge: "🔵 Google Search",
    title: "Google Search SRE & Performance Engineering Drive",
    role: "Site Reliability Engineer (Search Infra)",
    deadline: "Oct 18, 2026 • 05:00 PM IST",
    daysLeft: "10 Days Left",
    badgeType: "yellow",
    batches: "2025 & 2026 Batch",
    mandatoryChallenge: "Optimize Search API Load Time",
    ctc: "₹52 LPA • Bangalore / Pune",
    applicants: 615,
    instructions: "Must optimize the target search endpoint to sub-50ms latency using intelligent Redis caching and async indexing."
  },
  {
    id: 4,
    company: "netflix",
    companyBadge: "🔴 Netflix",
    title: "Netflix Edge & UI Architecture Fellowship 2026",
    role: "Frontend Infrastructure Engineer",
    deadline: "Oct 14, 2026 • 11:59 PM IST",
    daysLeft: "6 Days Left",
    badgeType: "red",
    batches: "All Batches & Self-Taught Developers",
    mandatoryChallenge: "Implement Video Streaming Buffering",
    ctc: "$120,000 / ₹60 LPA Equivalent • Remote",
    applicants: 340,
    instructions: "🔴 URGENT CUTOFF: Submission window closes in 6 days. Implement adaptive bitrate streaming with client buffer management."
  },
  {
    id: 5,
    company: "microsoft",
    companyBadge: "🟦 Microsoft",
    title: "Microsoft 365 Accessible Web Systems Graduate Program",
    role: "Software Engineer - Web Platforms",
    deadline: "Nov 05, 2026 • 11:59 PM IST",
    daysLeft: "28 Days Left",
    badgeType: "green",
    batches: "2025 & 2026 Batch",
    mandatoryChallenge: "Build an Accessible Data Grid",
    ctc: "₹42 LPA • Hyderabad / Noida / Bengaluru",
    applicants: 512,
    instructions: "Requirement: 100% WCAG 2.1 AA accessibility compliance and keyboard navigation support for virtualized data grids."
  }
];

const MOCK_JOBS = [
  {
    id: 1,
    title: "Software Development Engineer 1 (SDE-1) - Cloud Systems",
    company: "amazon",
    companyBadge: "🟠 Amazon AWS",
    type: "job",
    typeLabel: "Full-Time Job",
    package: "₹45 LPA + Stocks",
    location: "Bangalore / Hyderabad / Hybrid",
    batches: "2025 & 2026 Graduating Batches",
    deadline: "Oct 25, 2026 • 11:59 PM IST",
    daysLeft: "17 Days Left",
    badgeType: "green",
    syllabus: [
      "Distributed Systems: Rate limiting patterns (Token Bucket, Sliding Window Log)",
      "In-Memory Caching: Redis cluster eviction policies, cache-aside, and atomic Lua scripts",
      "Concurrency: Goroutines/Channels in Go, or Java Virtual Threads / ThreadPools",
      "API Performance: Sub-10ms response SLAs, connection pooling, and HTTP/2 multiplexing"
    ],
    readinessScore: "Level 7+ or >80% on Amazon Rate Limiter challenge",
    tutorialId: 0,
    tutorialTitle: "Architecting Distributed Token-Bucket Rate Limiters in Go (28:00)",
    challengeIndex: 0,
    challengeTitle: "Design a Distributed Rate Limiter (+500 XP)",
    recruiter: {
      name: "Ananya Verma",
      title: "Tech Recruiting Lead @ Amazon AWS Cloud",
      avatar: "👩‍💼",
      intro: "Hi! I'm Ananya from Amazon AWS University Recruiting. We're actively screening for our 2026 SDE-1 Cloud batch. Candidates who solve our companion challenge with >85% edge case pass rate get fast-tracked to final round interviews!"
    }
  },
  {
    id: 2,
    title: "Frontend Infrastructure & UI Systems Engineer",
    company: "netflix",
    companyBadge: "🔴 Netflix",
    type: "job",
    typeLabel: "Full-Time Job",
    package: "$120,000 / ₹60 LPA • Remote / Mumbai",
    location: "Remote / Hybrid",
    batches: "All Batches & Self-Taught Devs",
    deadline: "Oct 14, 2026 • 11:59 PM IST",
    daysLeft: "6 Days Left",
    badgeType: "red",
    syllabus: [
      "Client-Side Media Buffering: MediaSource Extensions (MSE) and WebCodecs APIs",
      "Streaming Protocols: Adaptive Bitrate (ABR) switching algorithms in fluctuating bandwidth",
      "React Architecture: Concurrent rendering, compiler optimization, and zero-runtime CSS",
      "Performance Profiling: Chrome DevTools CPU/memory timelines, reducing layout thrashing"
    ],
    readinessScore: "Level 8+ or >85% on Netflix Video Buffering challenge",
    tutorialId: 1,
    tutorialTitle: "Client-Side Video Buffering & Chunk Streaming Protocols (34:00)",
    challengeIndex: 3,
    challengeTitle: "Implement Video Streaming Buffering (+600 XP)",
    recruiter: {
      name: "Marcus Zhao",
      title: "Staff Technical Recruiter @ Netflix Streaming Infra",
      avatar: "👨‍💼",
      intro: "Hey there! I lead hiring for Netflix's Player Architecture team. We care deeply about how you handle browser memory and video buffer starvation. Feel free to ask about our culture or technical loop."
    }
  },
  {
    id: 3,
    title: "Site Reliability & Cloud Systems Intern (Summer 2027)",
    company: "google",
    companyBadge: "🔵 Google Search",
    type: "internship",
    typeLabel: "Summer Internship",
    package: "₹1,25,000/month Stipend + Pre-Placement Offer",
    location: "Bangalore / Pune",
    batches: "2027 Batch (3rd Year Undergrads)",
    deadline: "Oct 18, 2026 • 05:00 PM IST",
    daysLeft: "10 Days Left",
    badgeType: "yellow",
    syllabus: [
      "Query Optimization: Multi-Tier B-Tree indexing and SQL/NoSQL query execution plans",
      "Cache Invalidation: Asynchronous cache warming, write-through vs write-back caching",
      "System Reliability: SLOs/SLAs, error budgets, circuit breakers, and rate throttles",
      "Operating Systems: Linux processes, I/O wait monitoring, and memory paging"
    ],
    readinessScore: "Level 6+ or >75% on Google Search API challenge",
    tutorialId: 2,
    tutorialTitle: "Sub-50ms Search API Latency: Multi-Tier Cache Invalidation (22:00)",
    challengeIndex: 1,
    challengeTitle: "Optimize Search API Load Time (+300 XP)",
    recruiter: {
      name: "Sneha Reddy",
      title: "University Talent Lead @ Google India",
      avatar: "👩‍💼",
      intro: "Welcome! Google SRE internships are open for pre-final year engineering students. Solve our latency challenge in the Arena to prove your systems acumen!"
    }
  },
  {
    id: 4,
    title: "Real-time Geospatial Backend Engineer (Core Dispatch)",
    company: "uber",
    companyBadge: "🚗 Uber",
    type: "job",
    typeLabel: "Full-Time Job",
    package: "₹48 LPA • Bangalore / Hyderabad",
    location: "Bangalore / Hyderabad",
    batches: "2025 & 2026 Graduating Batches",
    deadline: "Nov 02, 2026 • 11:59 PM IST",
    daysLeft: "25 Days Left",
    badgeType: "green",
    syllabus: [
      "WebSocket Architecture: Managing 100k persistent socket connections in Go",
      "Geospatial Indexing: Spatial hashing, Google S2 geometry library, Quadtrees",
      "Message Streaming: Apache Kafka partitions, consumer groups, and idempotent delivery",
      "Concurrency Models: Go goroutine pools, mutex contention, and lock-free data structures"
    ],
    readinessScore: "Level 8+ or >80% on Uber Driver Tracking challenge",
    tutorialId: 3,
    tutorialTitle: "Handling 100k Concurrent Driver Location WebSockets in Real-Time (30:00)",
    challengeIndex: 4,
    challengeTitle: "Real-time Driver Location Tracking (+550 XP)",
    recruiter: {
      name: "Karan Johal",
      title: "Engineering Talent Partner @ Uber Dispatch Core",
      avatar: "👨‍💻",
      intro: "Hi candidate! Uber is expanding its core dispatch infrastructure in India. We look for candidates who understand distributed concurrency and WebSocket connection lifecycles."
    }
  },
  {
    id: 5,
    title: "Payments Infrastructure & Webhooks Engineer",
    company: "stripe",
    companyBadge: "💳 Stripe",
    type: "job",
    typeLabel: "Full-Time Job",
    package: "₹50 LPA • Remote / Bengaluru",
    location: "Remote / Bengaluru",
    batches: "2025 & 2026 Graduating Batches",
    deadline: "Nov 15, 2026 • 11:59 PM IST",
    daysLeft: "38 Days Left",
    badgeType: "green",
    syllabus: [
      "Idempotency Keys: Designing replay protection for distributed financial transactions",
      "Consistency & Locks: Two-phase commit (2PC), distributed locks with Redlock",
      "Fault Tolerance: Exponential backoff with jitter retry algorithms and DLQ monitoring",
      "API Security: HMAC SHA-256 webhook signature validation and payload verification"
    ],
    readinessScore: "Level 7+ or >80% on Stripe Webhook Idempotency challenge",
    tutorialId: 4,
    tutorialTitle: "Building Fault-Tolerant, Idempotent Payment Webhook Systems (26:00)",
    challengeIndex: 5,
    challengeTitle: "Idempotent Payment Webhooks (+350 XP)",
    recruiter: {
      name: "Rachel Simmons",
      title: "Senior University Recruiter @ Stripe Payments",
      avatar: "👩‍💼",
      intro: "Hello! At Stripe, code correctness is paramount. When network packets duplicate, users cannot be double charged. Prove your idempotency skills in our challenge!"
    }
  }
];

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
  currentSelectedCompany = companyKey;

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
  if (hrSub) hrSub.innerHTML = `Target Challenge: <strong>"${data.title}"</strong>`;

  // Update stats cards
  const statTotal = document.getElementById('hr-stat-total');
  if (statTotal) statTotal.textContent = TOTAL_REGISTERED_STUDENTS.toLocaleString();

  const statSolved = document.getElementById('hr-stat-solved');
  if (statSolved) statSolved.textContent = data.submissions;

  const statHired = document.getElementById('hr-stat-hired');
  if (statHired) statHired.textContent = data.shortlisted;

  const statNotices = document.getElementById('hr-stat-notices');
  if (statNotices) statNotices.textContent = data.activeDrives;

  // Render leaderboard
  const tbody = document.getElementById('leaderboard-body');
  if (tbody) {
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

  // Also refresh notices, tutorials, challenges for this company
  renderHRNotices(companyKey);
  renderHRTutorials(companyKey);
  renderHRChallenges(companyKey);
}

function switchHRTab(tabName) {
  // Update button active states
  const tabBtns = document.querySelectorAll('.hr-subtab-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`hr-tab-${tabName}-btn`);
  if (activeBtn) activeBtn.classList.add('active');

  // Hide all panes, show target pane
  const panes = document.querySelectorAll('.hr-tab-pane');
  panes.forEach(p => p.style.display = 'none');
  const targetPane = document.getElementById(`hr-view-${tabName}`);
  if (targetPane) targetPane.style.display = 'block';

  // Render content
  if (tabName === 'notices') renderHRNotices(currentSelectedCompany);
  if (tabName === 'tutorials') renderHRTutorials(currentSelectedCompany);
  if (tabName === 'challenges') renderHRChallenges(currentSelectedCompany);
}

function renderHRNotices(companyKey) {
  const container = document.getElementById('hr-notices-list');
  if (!container) return;

  const notices = HR_NOTICES.filter(n => n.company.toLowerCase() === companyKey.toLowerCase());
  if (notices.length === 0) {
    container.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: var(--text3); background: var(--card); border: 1px dashed var(--border); border-radius: var(--radius2);">
        No active recruitment notices found for ${companyKey.toUpperCase()}. Click "+ Post New Drive Notice" above to create one.
      </div>
    `;
    return;
  }

  let html = '';
  notices.forEach(n => {
    html += `
      <div class="hr-notice-card">
        <div class="hr-notice-header">
          <div>
            <span style="font-size:0.75rem; background:var(--primary-glow); color:var(--primary); padding:3px 10px; border-radius:999px; font-weight:700;">
              ${n.companyBadge}
            </span>
            <h4 style="margin: 0.5rem 0 0.2rem 0; font-size: 1.15rem; color: var(--text);">${n.title}</h4>
            <p style="margin: 0; font-size: 0.88rem; color: var(--primary); font-weight: 600;">Role: ${n.role}</p>
          </div>
          <span class="hr-notice-deadline-badge ${n.badgeType}">
            ⏳ Deadline: ${n.deadline} (${n.daysLeft})
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 0.9rem; margin: 0.8rem 0; font-size: 0.85rem;">
          <div><strong style="color:var(--text3);">Eligible Batches:</strong><br/>${n.batches}</div>
          <div><strong style="color:var(--text3);">Mandatory Challenge:</strong><br/><span style="color:var(--primary); font-weight:600;">${n.mandatoryChallenge}</span></div>
          <div><strong style="color:var(--text3);">CTC / Stipend:</strong><br/>${n.ctc}</div>
          <div><strong style="color:var(--text3);">Active Applicants:</strong><br/><span style="color:var(--green); font-weight:700;">${n.applicants} Candidates</span></div>
        </div>

        <p style="font-size: 0.85rem; color: var(--text2); line-height: 1.5; margin: 0 0 1rem 0;">
          <em>"${n.instructions}"</em>
        </p>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 0.8rem; flex-wrap: wrap; gap: 8px;">
          <button class="btn-primary" style="padding: 6px 14px; font-size: 0.8rem;" onclick="alert('Viewing applicant tracking list for: ${n.title}\\nTotal submissions: ${n.applicants}')">
            👥 View Applicants (${n.applicants})
          </button>
          <div style="display: flex; gap: 8px;">
            <button class="btn-ghost" style="padding: 6px 12px; font-size: 0.8rem;" onclick="alert('Notice deadline extended by 7 days!')">⏰ Extend Deadline</button>
            <button class="btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; color: #ff4b4b;" onclick="alert('Notice archived.')">Archive</button>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderHRTutorials(companyKey) {
  const container = document.getElementById('hr-tutorials-list');
  if (!container) return;

  const tutorials = VIDEO_MASTERCLASSES.filter(v => v.company.toLowerCase() === companyKey.toLowerCase());
  if (tutorials.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; padding: 2rem; text-align: center; color: var(--text3); background: var(--card); border: 1px dashed var(--border); border-radius: var(--radius2);">
        No tutorials published by ${companyKey.toUpperCase()} yet. Click "+ Add New Tutorial" to upload one.
      </div>
    `;
    return;
  }

  let html = '';
  tutorials.forEach(video => {
    html += `
      <div class="video-card">
        <div class="video-thumb" onclick="openVideoModal(${video.id})">
          <div class="video-thumb-inner">
            <span class="video-mnc-badge">${video.companyBadge}</span>
            <div class="video-play-btn">▶</div>
            <span class="video-duration-badge">${video.duration}</span>
          </div>
        </div>
        <div class="video-body">
          <h4 class="video-title">${video.title}</h4>
          <div class="video-speaker">👨‍💼 ${video.speaker} • ${video.speakerRole}</div>
          <p style="font-size:0.85rem; color:var(--text2); line-height:1.5; margin-bottom:1rem;">${video.summary.substring(0, 110)}...</p>
          <div class="video-meta">
            <span>${video.rating}</span>
            <button class="btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="openVideoModal(${video.id})">Preview ▶</button>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderHRChallenges(companyKey) {
  const container = document.getElementById('hr-challenges-list');
  if (!container) return;

  const challenges = MOCK_PROBLEMS.filter(p => p.company.toLowerCase() === companyKey.toLowerCase());
  if (challenges.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; padding: 2rem; text-align: center; color: var(--text3); background: var(--card); border: 1px dashed var(--border); border-radius: var(--radius2);">
        No active challenges posted for ${companyKey.toUpperCase()}. Click "+ Post New Challenge" to deploy one.
      </div>
    `;
    return;
  }

  let html = '';
  challenges.forEach(p => {
    const diffColor = p.diff === 'Hard' ? 'var(--red)' : p.diff === 'Medium' ? 'var(--yellow)' : 'var(--green)';
    html += `
      <div class="problem-card">
        <div class="problem-header">
          <div class="company-badge">${p.company}</div>
          <span class="xp-reward">+${p.xp} XP</span>
        </div>
        <h3 class="problem-title">${p.title}</h3>
        <p class="problem-desc">${p.desc}</p>
        <div class="problem-meta">
          <span style="color:${diffColor};">🎯 ${p.diff}</span>
          <span>⏱️ 45 mins</span>
        </div>
        <div class="tech-stack">
          ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="problem-actions">
          <span class="xp-reward">Active in Arena</span>
          <button class="btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="switchHRTab('leaderboard')">View Candidates</button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Modal actions
function openPostProblemModal() {
  const modal = document.getElementById('hr-post-problem-modal');
  if (modal) modal.classList.add('active');
}

function openAddTutorialModal() {
  const modal = document.getElementById('hr-add-tutorial-modal');
  if (modal) modal.classList.add('active');
}

function openPostNoticeModal() {
  const modal = document.getElementById('hr-post-notice-modal');
  if (modal) modal.classList.add('active');
}

function closeHRModal(e, modalId) {
  if (!e || e.target.id === modalId || (e.target && e.target.classList && e.target.classList.contains('modal-close'))) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }
}

function submitHRPostProblem() {
  const title = document.getElementById('hr-np-title')?.value.trim();
  const company = document.getElementById('hr-np-company')?.value || 'Amazon';
  const diff = document.getElementById('hr-np-diff')?.value || 'Medium';
  const xp = parseInt(document.getElementById('hr-np-xp')?.value || '500', 10);
  const tagsStr = document.getElementById('hr-np-tags')?.value || 'System Design, Backend';
  const desc = document.getElementById('hr-np-desc')?.value.trim();

  if (!title) {
    alert("Please enter a challenge title.");
    return;
  }

  const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

  const newProblem = {
    company: company,
    title: title,
    diff: diff,
    xp: xp,
    tags: tags.length ? tags : ["System Design"],
    recommended: true,
    desc: desc || `Production challenge deployed by the ${company} engineering team.`
  };

  MOCK_PROBLEMS.unshift(newProblem);
  renderProblems('all');
  renderHRChallenges(currentSelectedCompany);

  document.getElementById('hr-post-problem-modal').classList.remove('active');
  alert(`✅ Success! Real-world problem "${title}" has been posted to SkillBridge Arena! Students can now start solving it.`);
  switchHRTab('challenges');
}

function submitHRAddTutorial() {
  const title = document.getElementById('hr-nt-title')?.value.trim();
  const company = document.getElementById('hr-nt-company')?.value || 'Amazon';
  const duration = document.getElementById('hr-nt-duration')?.value || '28:00';
  const speaker = document.getElementById('hr-nt-speaker')?.value || 'Principal Systems Architect';
  const url = document.getElementById('hr-nt-url')?.value || '';
  const summary = document.getElementById('hr-nt-summary')?.value || 'System architecture deep-dive.';

  if (!title) {
    alert("Please enter a tutorial title.");
    return;
  }

  const newTutorial = {
    id: Date.now(),
    company: company.toLowerCase(),
    companyBadge: `🏢 ${company}`,
    title: title,
    speaker: speaker,
    speakerRole: `Engineering Lead @ ${company}`,
    duration: duration,
    rating: "⭐ 5.0 (New Release)",
    tags: ["System Design", "Cloud Architecture"],
    summary: summary,
    chapters: [
      "00:00 - Architecture overview & bottleneck analysis",
      "10:00 - Data structures & scaling trade-offs",
      "20:00 - Live production debugging & Q&A"
    ],
    challengeIndex: 0,
    challengeTitle: `${company} Challenge (+500 XP)`
  };

  VIDEO_MASTERCLASSES.unshift(newTutorial);
  renderMasterclasses('all');
  renderHRTutorials(currentSelectedCompany);

  document.getElementById('hr-add-tutorial-modal').classList.remove('active');
  alert(`✅ Success! Tutorial / Masterclass "${title}" has been published to all students!`);
  switchHRTab('tutorials');
}

function submitHRPostNotice() {
  const title = document.getElementById('hr-nn-title')?.value.trim();
  const company = document.getElementById('hr-nn-company')?.value || 'Amazon';
  const role = document.getElementById('hr-nn-role')?.value || 'Software Engineer';
  const deadline = document.getElementById('hr-nn-deadline')?.value || 'Nov 15, 2026';
  const daysLeft = document.getElementById('hr-nn-days')?.value || '20 Days Left';
  const batches = document.getElementById('hr-nn-batch')?.value || '2025 & 2026 Batches';
  const mandatoryChallenge = document.getElementById('hr-nn-challenge')?.value || 'Design a Distributed Rate Limiter';
  const ctc = document.getElementById('hr-nn-ctc')?.value || '₹40 LPA • Full-time';
  const instructions = document.getElementById('hr-nn-notes')?.value || 'Direct Day-1 interview invites for top performers.';

  if (!title) {
    alert("Please enter a notice headline.");
    return;
  }

  const newNotice = {
    id: Date.now(),
    company: company.toLowerCase(),
    companyBadge: `🏢 ${company}`,
    title: title,
    role: role,
    deadline: deadline,
    daysLeft: daysLeft,
    badgeType: "green",
    batches: batches,
    mandatoryChallenge: mandatoryChallenge,
    ctc: ctc,
    applicants: 12,
    instructions: instructions
  };

  HR_NOTICES.unshift(newNotice);

  if (HR_DATA[company.toLowerCase()]) {
    HR_DATA[company.toLowerCase()].activeDrives = `${HR_NOTICES.filter(n => n.company === company.toLowerCase()).length} Drives`;
  }

  renderHRNotices(currentSelectedCompany);
  const statNotices = document.getElementById('hr-stat-notices');
  if (statNotices && HR_DATA[currentSelectedCompany]) {
    statNotices.textContent = HR_DATA[currentSelectedCompany].activeDrives;
  }

  document.getElementById('hr-post-notice-modal').classList.remove('active');
  alert(`📢 Success! Recruitment Notice "${title}" published with deadline ${deadline}! Students have been notified.`);
  switchHRTab('notices');
}

// ---------- JOBS & INTERNSHIPS ----------
let currentChatRecruiter = null;

function renderJobs(filter = 'all') {
  const container = document.getElementById('jobs-container');
  if (!container) return;

  let filtered = MOCK_JOBS;
  if (filter === 'job' || filter === 'internship') {
    filtered = MOCK_JOBS.filter(j => j.type === filter);
  } else if (filter !== 'all') {
    filtered = MOCK_JOBS.filter(j => j.company.toLowerCase() === filter.toLowerCase());
  }

  let html = '';
  filtered.forEach(job => {
    html += `
      <div class="job-card">
        <div class="job-header-top">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px; flex-wrap:wrap;">
              <span class="job-company-pill">${job.companyBadge}</span>
              <span style="font-size:0.75rem; background:rgba(108,99,255,0.15); color:var(--primary); padding:3px 10px; border-radius:999px; font-weight:700;">
                ${job.typeLabel}
              </span>
              <span style="font-size:0.75rem; background:var(--bg2); color:var(--text3); border:1px solid var(--border); padding:3px 10px; border-radius:999px;">
                📍 ${job.location}
              </span>
            </div>
            <h3 style="margin: 0 0 4px 0; font-size: 1.25rem; color: var(--text);">${job.title}</h3>
            <p style="margin:0; font-size:0.95rem; color:var(--green); font-weight:700;">
              💰 ${job.package} &nbsp;•&nbsp; <span style="color:var(--text2); font-weight:500;">Eligibility: ${job.batches}</span>
            </p>
          </div>
          <span class="hr-notice-deadline-badge ${job.badgeType}">
            ⏳ ${job.deadline}
          </span>
        </div>

        <!-- What to Study Box -->
        <div class="job-study-box">
          <div class="job-study-title">
            <span>📚 What You Need To Study / Syllabus for This Role:</span>
            <span style="margin-left:auto; font-size:0.75rem; background:var(--primary); color:white; padding:2px 8px; border-radius:999px; font-weight:600;">
              ${job.readinessScore}
            </span>
          </div>
          <ul class="job-study-list">
            ${job.syllabus.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <!-- Action Row -->
        <div class="job-actions-row">
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn-ghost" style="padding:7px 14px; font-size:0.82rem; border-color:var(--primary); color:var(--primary);" onclick="openVideoModal(${job.tutorialId})">
              🎬 Watch Company Tutorial (${job.companyBadge})
            </button>
            <button class="btn-ghost" style="padding:7px 14px; font-size:0.82rem;" onclick="openModal(${job.challengeIndex})">
              ⚔️ Solve Required Challenge (+500 XP)
            </button>
            <button class="btn-ghost" style="padding:7px 14px; font-size:0.82rem; color:var(--green); border-color:rgba(0,168,107,0.4);" onclick="openRecruiterChat('${job.company}')">
              💬 Chat with HR (${job.recruiter.name.split(' ')[0]})
            </button>
          </div>
          <button class="btn-primary" style="padding:8px 18px; font-size:0.85rem;" onclick="applyForJob(${job.id})">
            ⚡ Quick Apply with SkillBridge
          </button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function filterJobs(filter, btn) {
  if (btn) {
    const chips = btn.parentElement.querySelectorAll('.chip');
    chips.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
  }
  renderJobs(filter);
}

function applyForJob(id) {
  const job = MOCK_JOBS.find(j => j.id === id);
  if (!job) return;
  alert(`🎉 Application Submitted for: ${job.title} at ${job.companyBadge}!\n\nYour verified SkillBridge profile (Level 8 Practitioner, 2,450 XP, 81.6% readiness score) and companion challenge solution have been sent directly to ${job.recruiter.name} (${job.recruiter.title}).\n\nExpect an update in your SkillBridge inbox within 48 hours!`);
}

function openRecruiterChat(companyKey) {
  const job = MOCK_JOBS.find(j => j.company.toLowerCase() === companyKey.toLowerCase());
  if (!job) return;
  currentChatRecruiter = job.recruiter;

  document.getElementById('rc-name').textContent = job.recruiter.name;
  document.getElementById('rc-title').textContent = job.recruiter.title;
  document.getElementById('rc-avatar').textContent = job.recruiter.avatar;

  const msgContainer = document.getElementById('rc-messages-body');
  msgContainer.innerHTML = `
    <div style="background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px 14px; font-size:0.88rem; line-height:1.5; color:var(--text); align-self:flex-start; max-width:85%;">
      <strong>${job.recruiter.name}</strong> <span style="font-size:0.75rem; color:var(--text3); margin-left:6px;">Just now</span>
      <p style="margin:6px 0 0 0; color:var(--text2);">${job.recruiter.intro}</p>
    </div>
  `;

  document.getElementById('recruiter-chat-modal').classList.add('active');
}

function closeRecruiterChat(e) {
  if (!e || e.target.id === 'recruiter-chat-modal' || (e.target && e.target.classList && e.target.classList.contains('modal-close'))) {
    const modal = document.getElementById('recruiter-chat-modal');
    if (modal) modal.classList.remove('active');
  }
}

function sendRecruiterMessage() {
  const input = document.getElementById('rc-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const msgContainer = document.getElementById('rc-messages-body');

  // Append user message
  msgContainer.innerHTML += `
    <div style="background:var(--primary); color:white; border-radius:10px; padding:10px 14px; font-size:0.88rem; line-height:1.5; align-self:flex-end; max-width:80%;">
      ${text}
    </div>
  `;
  msgContainer.scrollTop = msgContainer.scrollHeight;

  // Simulate smart HR reply
  setTimeout(() => {
    let reply = "Thanks for asking! We value practical architecture over rote theory. Candidates with clean code and high edge case pass rates get direct Day-1 interview invites.";
    const lower = text.toLowerCase();
    if (lower.includes('benchmark') || lower.includes('score') || lower.includes('shortlist')) {
      reply = "Our shortlisting benchmark is >85% edge-case pass rate on the companion challenge. Top performers on our leaderboard bypass online assessments entirely!";
    } else if (lower.includes('language') || lower.includes('python') || lower.includes('java') || lower.includes('c++')) {
      reply = "You can solve using Go, Java, Python, or C++. What matters most is understanding concurrency, memory consumption, and sub-millisecond latency trade-offs!";
    } else if (lower.includes('batch') || lower.includes('eligib') || lower.includes('2027') || lower.includes('2026')) {
      reply = "2025 and 2026 batches are eligible for full-time SDE-1 roles, and 2027 batch undergrads are eligible for our 2-month summer internship with PPO opportunities.";
    }

    msgContainer.innerHTML += `
      <div style="background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px 14px; font-size:0.88rem; line-height:1.5; color:var(--text); align-self:flex-start; max-width:85%;">
        <strong>${currentChatRecruiter ? currentChatRecruiter.name : 'Recruiter'}</strong> <span style="font-size:0.75rem; color:var(--text3); margin-left:6px;">Just now</span>
        <p style="margin:6px 0 0 0; color:var(--text2);">${reply}</p>
      </div>
    `;
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 700);
}

function sendQuickHRQuestion(question) {
  const input = document.getElementById('rc-input');
  if (input) {
    input.value = question;
    sendRecruiterMessage();
  }
}

function handleRecruiterEnter(e) {
  if (e.key === 'Enter') {
    sendRecruiterMessage();
  }
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

// ---------- MNC VIDEO MASTERCLASSES ----------
function renderMasterclasses(filter = 'all') {
  const grid = document.getElementById('masterclasses-grid');
  if (!grid) return;
  
  let filtered = VIDEO_MASTERCLASSES;
  if (filter !== 'all') {
    filtered = VIDEO_MASTERCLASSES.filter(v => v.company === filter);
  }
  
  let html = '';
  filtered.forEach((video) => {
    html += `
      <div class="video-card">
        <div class="video-thumb" onclick="openVideoModal(${video.id})">
          <div class="video-thumb-inner">
            <span class="video-mnc-badge">${video.companyBadge}</span>
            <div class="video-play-btn">▶</div>
            <span class="video-duration-badge">${video.duration}</span>
          </div>
        </div>
        <div class="video-body">
          <h4 class="video-title">${video.title}</h4>
          <div class="video-speaker">👨‍💼 ${video.speaker} • ${video.speakerRole}</div>
          <p style="font-size:0.85rem; color:var(--text2); line-height:1.5; margin-bottom:1rem;">${video.summary.substring(0, 110)}...</p>
          <div class="tech-stack" style="margin-bottom:0.8rem;">
            ${video.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="video-meta">
            <span>${video.rating}</span>
            <button class="btn-primary" style="padding:6px 14px; font-size:0.8rem;" onclick="openVideoModal(${video.id})">Watch Lecture ▶</button>
          </div>
        </div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

function filterMasterclasses(filter, btn) {
  if (btn) {
    const chips = btn.parentElement.querySelectorAll('.chip');
    chips.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
  }
  renderMasterclasses(filter);
}

function openVideoModal(id) {
  const video = VIDEO_MASTERCLASSES.find(v => v.id === id);
  if (!video) return;

  const content = `
    <!-- Video Player Simulation -->
    <div class="video-player-box" style="margin-bottom: 1.2rem;">
      <div class="video-screen-content">
        <div style="font-size: 3rem; margin-bottom: 0.5rem; opacity: 0.9;">🎬</div>
        <h3 style="color: white; margin-bottom: 0.4rem; font-size: 1.2rem;">${video.title}</h3>
        <p style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-bottom: 1rem;">${video.speaker} • ${video.speakerRole}</p>
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 168, 107, 0.25); border: 1px solid var(--green); color: var(--green); padding: 5px 14px; border-radius: 999px; font-size: 0.82rem; font-weight: 700;">
          ▶ Playing Masterclass Stream (1080p • 60fps)
        </div>
      </div>
      
      <!-- Video Controls Bar -->
      <div class="video-controls-bar">
        <button style="background: none; border: none; color: white; font-size: 1.1rem; cursor: pointer;">⏸</button>
        <span style="font-size: 0.75rem; color: rgba(255,255,255,0.7); font-family: monospace;">14:20 / ${video.duration}</span>
        <div class="video-timeline">
          <div class="video-timeline-fill" style="width: 50%;"></div>
        </div>
        <span style="font-size: 0.85rem; color: rgba(255,255,255,0.8); cursor: pointer;">🔊</span>
        <span style="font-size: 0.85rem; color: rgba(255,255,255,0.8); cursor: pointer;">⛶</span>
      </div>
    </div>

    <!-- Details & Chapters -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem; flex-wrap:wrap; gap:10px;">
      <div>
        <span style="font-size:0.8rem; background:var(--primary-glow); color:var(--primary); padding:3px 10px; border-radius:999px; font-weight:700;">${video.companyBadge}</span>
        <h2 style="font-size:1.3rem; margin:0.4rem 0 0.2rem;">${video.title}</h2>
        <p style="font-size:0.88rem; color:var(--text2); margin:0;">Taught by <strong>${video.speaker}</strong> (${video.speakerRole})</p>
      </div>
      <div style="font-size:0.9rem; color:var(--text3); font-weight:700;">${video.rating}</div>
    </div>

    <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:1rem; margin-bottom:1.2rem; font-size:0.9rem; line-height:1.6; color:var(--text2);">
      ${video.summary}
    </div>

    <div style="margin-bottom:1.5rem;">
      <h4 style="font-size:0.95rem; margin-bottom:0.6rem; color:var(--text);">📌 Lecture Chapters & System Rubric:</h4>
      <ul style="padding-left:1.2rem; margin:0; font-size:0.85rem; color:var(--text2); line-height:1.8;">
        ${video.chapters.map(c => `<li>${c}</li>`).join('')}
      </ul>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:1.2rem; flex-wrap:wrap; gap:10px;">
      <button class="btn-ghost" onclick="alert('Architecture Slide Deck downloaded (PDF)!')">📥 Download Architecture Deck (PDF)</button>
      <button class="btn-primary" onclick="closeVideoModal(); openModal(${video.challengeIndex});">⚡ Solve Companion Challenge (+500 XP)</button>
    </div>
  `;

  document.getElementById('video-modal-content').innerHTML = content;
  document.getElementById('video-modal').classList.add('active');
}

function closeVideoModal(e) {
  if (!e || e.target.id === 'video-modal' || (e.target && e.target.classList && e.target.classList.contains('modal-close'))) {
    const modal = document.getElementById('video-modal');
    if (modal) modal.classList.remove('active');
  }
}

function handleVideoUpload() {
  const title = document.getElementById('upload-video-title')?.value.trim();
  const speaker = document.getElementById('upload-video-speaker')?.value.trim();
  const company = document.getElementById('upload-video-company')?.value || 'Amazon';

  if (!title) {
    alert("Please enter a lecture title.");
    return;
  }

  VIDEO_MASTERCLASSES.unshift({
    id: Date.now(),
    company: company.toLowerCase(),
    companyBadge: `🏢 ${company}`,
    title: title,
    speaker: speaker || "Lead Engineer",
    speakerRole: `Senior Staff Architect @ ${company}`,
    duration: "25:00",
    rating: "⭐ 5.0 (New Release)",
    tags: ["System Design", "Cloud", "Live Walkthrough"],
    summary: `Official engineering architecture masterclass published by ${company} engineers on SkillBridge.`,
    chapters: [
      "00:00 - Architecture overview & bottleneck analysis",
      "10:00 - Core data structures & scaling trade-offs",
      "20:00 - Production deployment & interview expectations"
    ],
    challengeIndex: 0,
    challengeTitle: `${company} Challenge (+500 XP)`
  });

  renderMasterclasses('all');
  alert(`✅ Success! Video Masterclass "${title}" has been published by ${company}! Students can now watch it under the Masterclasses tab.`);
  showSection('masterclasses');
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
  
  alert("Welcome to SkillBridge! You are now logged in as Anannay Kapoor.");
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
        <span class="chat-username">@anannay_k</span> <span class="msg-time">Just now</span><br/>
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
          Thanks Anannay! That really helps. I appreciate the support. 💙
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

// ---------- USER PROFILE & RESUME MODAL FUNCTIONS ----------
function openUserProfileModal(tab = 'overview') {
  const modal = document.getElementById('user-profile-modal');
  if (modal) {
    modal.classList.add('active');
    switchProfileTab(tab);
  }
}

function closeUserProfileModal(e) {
  if (!e || e.target.id === 'user-profile-modal' || e.target.classList.contains('modal-close')) {
    document.getElementById('user-profile-modal')?.classList.remove('active');
  }
}

function switchProfileTab(tabName) {
  document.querySelectorAll('#user-profile-modal .hr-subtab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`prof-tab-btn-${tabName}`)?.classList.add('active');
  ['overview', 'resume', 'settings'].forEach(p => {
    const el = document.getElementById(`prof-pane-${p}`);
    if (el) el.style.display = p === tabName ? 'block' : 'none';
  });
}

function downloadResumePDF() {
  alert('📄 Downloading Anannay_Kapoor_SkillBridge_Resume.pdf (ATS Score: 94%)...\nVerified challenge badges, NIT Kurukshetra credentials, and MNC recruiter readiness included!');
}

function uploadResumeMock() {
  alert('✅ Custom resume uploaded! SkillBridge ATS scanner re-calculated your score at 94% match for SDE / Cloud Intern roles.');
}

function saveUserSettings() {
  const newName = document.getElementById('setting-name')?.value.trim() || 'Anannay Kapoor';
  const newCollege = document.getElementById('setting-college')?.value.trim() || 'NIT Kurukshetra';
  const dispName = document.getElementById('prof-display-name');
  if (dispName) dispName.textContent = newName;
  const navName = document.getElementById('nav-user-name');
  if (navName) navName.textContent = `${newName} (${newCollege})`;
  const homeName = document.getElementById('home-welcome-name');
  if (homeName) homeName.textContent = newName;
  const leftName = document.getElementById('dash-left-name');
  if (leftName) leftName.textContent = newName;
  alert('💾 Profile and account settings saved successfully!');
  document.getElementById('user-profile-modal')?.classList.remove('active');
}

function handleHomeSearch(val) {
  const query = (val || '').toLowerCase().trim();
  const cards = document.querySelectorAll('#home-problems-list .problem-card');
  cards.forEach(c => {
    if (!query) {
      c.style.display = 'block';
    } else {
      const text = c.textContent.toLowerCase();
      c.style.display = text.includes(query) ? 'block' : 'none';
    }
  });
}

function filterChallengesBySkill(skill) {
  const input = document.getElementById('dash-home-search');
  if (input) {
    input.value = skill;
    handleHomeSearch(skill);
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Ensure init covers basic setup
document.addEventListener('DOMContentLoaded', () => {
  showSection('landing');
  renderProblems('all');
  switchCompany('amazon', document.querySelector('#hr-view .chip.active')); // Load initial HR view
  renderStreakCalendar();
  renderMasterclasses('all');
  renderJobs('all');
  switchChatChannel('venting-space', document.querySelector('.chat-channel.active')); // Load initial chat
});
