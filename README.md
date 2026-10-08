# 🛡️ PlacementShield — Resume Defense Drill

> **Stop Freezing on Your Own Resume Projects.**  
> An AI-powered interview pressure simulator that cross-examines students on their own resume bullets — with a live timer, escalating follow-up questions, and honest scoring.

**Live Demo:** [Open index.html directly in browser — zero setup needed]  
**Built for:** ANANNAY Ideathon 2025 | PS 4 — Open Innovation: Student Placement Pain Points  
**Submission Deadline:** 9 October 2025, 10:00 AM

---

## 1. What It Does

PlacementShield solves one specific, validated problem:

> **77.4% of students freeze when interviewers ask about their own resume projects.**

They built projects from tutorials. They know the code. But they never had to *defend* why they wrote it — which technology choices they made and why. In placement interviews, that costs them the offer.

**PlacementShield is a 5-minute drill that trains exactly this skill:**

1. **Paste your resume bullet** — any project line or tech stack from your resume
2. **AI detects danger zones** — which technologies interviewers will attack (JWT, MongoDB, React, ML models, etc.)
3. **Face the pressure drill** — 5 escalating questions with a 60-second live countdown timer and pressure meter
4. **Get honest scored feedback** — Clarity (10) + Technical Depth (10) + Honesty (10)
5. **See model answers** — know exactly what to improve before the real interview

**No installation. No signup. Open `index.html` and start in 10 seconds.**

---

## 2. The Problem — Validated with Evidence

Every year, thousands of engineering students get rejected in the **Technical Discussion round** — not because of DSA, but because they cannot defend their own projects.

Interviewers ask:
- *"Why MongoDB and not PostgreSQL?"*
- *"Your ML model shows 97% accuracy — could it be overfitting?"*
- *"JWT vs sessions — what are the actual trade-offs?"*

### Proof (62-Student Survey + 5 Deep Interviews)

| Metric | Number |
|---|---|
| Students who froze on own resume questions | **77.4%** |
| Students spending 3+ anxious hours before each interview | **67.7%** |
| Students who found NO existing tool helpful for resume defense | **91.9%** |
| Students who'd use PlacementShield if free | **100%** |
| Students who'd recommend it to placement batch | **100%** |
| ChatGPT users who said it's "too polite / no pressure" | **67.4%** |

> 📂 Full evidence: [`evidence/interview_notes.md`](evidence/interview_notes.md) · [`evidence/survey_analysis.md`](evidence/survey_analysis.md) · [`evidence/survey_results.csv`](evidence/survey_results.csv)

**Student Voices (from interviews):**
> *"ChatGPT gives me the answer but never puts me under pressure. I need something that mimics a real interviewer who keeps pushing."* — Rahul K., Final Year CSE, Pune

> *"People put things on their resume to impress recruiters, not because they understand it deeply. There's a massive gap between what students write and what they can actually defend."* — Kartik B., Final Year CSE, Delhi

---

## 3. Why Existing Tools Fall Short

| Tool | Specific Gap |
|---|---|
| **ChatGPT / Gemini** | Too agreeable — accepts any answer. Zero pressure simulation. 67.4% students confirmed this. |
| **LeetCode** | Only trains DSA problems. Never asks about *your* project decisions. |
| **Pramp / P2P Mock** | Peers often not technical enough. Hard to schedule. No consistent quality. |
| **YouTube / GeeksForGeeks** | One-way learning. No Q&A, no feedback, no pressure. |

**PlacementShield fills the exact gap none of these address.**

---

## 4. Done / In Progress / Planned

### ✅ Done (as of 8 Oct 2025)
- [x] Single-page web app — 4 screens: Home, Analysis, Drill, Results
- [x] Resume bullet analyzer — detects attack zones (JWT, MongoDB, React, ML, Docker, API, Redis, Payment, Python, Deployment)
- [x] 5-question escalating drill — questions get harder per round
- [x] 60-second live timer with warning at 15s
- [x] Real-time pressure meter (Warm-Up → Building → Intense → MAX PRESSURE)
- [x] Answer scoring engine — Clarity + Technical Depth + Honesty
- [x] Detailed feedback with model answer guidance
- [x] Comparison table vs existing tools on homepage
- [x] Student quote section with validated evidence
- [x] Dark mode responsive design
- [x] Mobile-friendly layout with responsive breakpoints
- [x] Evidence folder: 5 student interviews, 62-student survey, analysis
- [x] README with all 7 required sections

### 🔄 In Progress
- [ ] GitHub Pages deployment for live public URL
- [ ] Improving scoring algorithm with more keyword categories
- [ ] Adding more question banks per technology domain

### 📋 Planned (Post-Submission Roadmap)
- [ ] **V2**: Gemini API integration — real generative questions, not pattern-based
- [ ] **V2**: PDF resume parser — auto-extract all bullet points
- [ ] **V3**: Voice mode — speak answers aloud, speech-to-text evaluation
- [ ] **V4**: Domain-specific tracks (Backend, ML, Data Engineering, Frontend)
- [ ] **V4**: Company-specific question banks (Startup, MNC, MAANG)
- [ ] **V5**: College leaderboard — compare with placement batch
- [ ] **V5**: TPO dashboard — batch mock sessions for colleges

---

## 5. Architecture & Technical Details

```
PlacementShield/
├── index.html              # Single-page app — all 4 screens (Home, Analysis, Drill, Results)
├── style.css               # Dark mode design system, fully responsive
├── app.js                  # Core logic: pattern detection, drill engine, timer, scoring
├── .env.example            # Template for future API key integration (Gemini API)
├── evidence/
│   ├── interview_notes.md  # 5 detailed student interview transcripts
│   ├── survey_results.csv  # 62-student raw survey data
│   └── survey_analysis.md  # Key statistics and insights
└── README.md
```

### How the Resume Analyzer Works
1. User pastes resume bullet into textarea
2. `app.js` runs regex-based pattern matching against 10 technology categories
3. Each matched category maps to a curated question bank (5 questions per category)
4. Top 5 questions are selected (one per matched category, shuffled)
5. Questions are ordered by difficulty (warm-up to max pressure)

### How Scoring Works
- **Clarity (0–10):** Word count analysis — penalizes one-liners, rewards structured answers
- **Technical Depth (0–10):** Keyword matching against domain-specific technical vocabulary (e.g., "ACID", "cap theorem", "overfitting", "idempotency")
- **Honesty (0–10):** Detects genuine reasoning phrases ("because", "trade-off", "limitation", "would improve", "learned")

### Tech Stack — Why These Choices
- **Vanilla HTML/CSS/JS** — Zero dependencies = zero setup failure risk during demo. Works offline. No `npm install`, no build step.
- **Client-side only** — No backend server needed. Deployable as static site on GitHub Pages instantly.
- **No frameworks** — Deliberate choice: judges can open DevTools and read the code directly. Transparent and auditable.
- **Expandable to Gemini API** — The `evaluateAnswer()` function is designed to be swapped with a Gemini API call without changing any other code.

---

## 6. Tools and AI Used

> **This project was built using Antigravity IDE and its built-in AI coding assistant (Antigravity AI).**

### AI Tools Used
| Tool | How It Was Used |
|---|---|
| **Antigravity IDE** | Primary development environment — code was written with AI assistance via Antigravity's Agent Mode and inline code suggestions |
| **Antigravity AI (Agent Mode)** | Generated the full application structure, resume pattern detection engine, scoring algorithm, and responsive CSS design system |
| **Antigravity AI (Inline Completion)** | Used for autocomplete while refining scoring logic and question bank categories |

### How AI Accelerated This Project
- **Problem validation**: AI helped structure interview questions for student interviews
- **Code generation**: Full HTML/CSS/JS app generated with AI assistance in a single session
- **Evidence organization**: Survey analysis and interview summaries structured with AI help
- **README drafting**: This README was written with Antigravity AI assistance

> All code has been reviewed and understood by the team. No API keys are used in the current version. See `.env.example` for planned Gemini API integration.

---

## 7. How to Run

### Option A — Instant (Recommended for Demo)
```bash
# Clone the repository
git clone https://github.com/kapoorn0511-creator/ANANNAY-Ideathon.git
cd ANANNAY-Ideathon

# Open in browser — that's it!
# Double-click index.html  OR
# Right-click → Open with → Chrome/Edge/Firefox
```

### Option B — VS Code Live Server
```bash
# Install Live Server extension in VS Code
# Right-click index.html → Open with Live Server
# App opens at http://127.0.0.1:5500
```

### Option C — GitHub Pages (Live URL)
The app is deployed / will be deployed at:  
`https://kapoorn0511-creator.github.io/ANANNAY-Ideathon/`

---

## Security Notes
- ✅ No API keys in this repository
- ✅ No `.env` files committed
- ✅ No `node_modules` or build artifacts
- ✅ No passwords, tokens, or secrets anywhere in codebase
- See `.env.example` for the planned Gemini API key format (for V2 integration)

---

## PS 4 Submission Checklist
- [x] Clear problem definition — who has it, what it costs, why existing tools fail
- [x] Evidence — 5 student interviews + 62-student survey in `evidence/` folder
- [x] Working prototype — live demo, zero setup
- [x] Differentiation — comparison table vs all existing tools
- [x] Signs students would use it — 100% yes free, 41.9% would pay
- [x] Short pitch: *"Students write things on their resume they can't defend. PlacementShield fixes that in 5 minutes."*
- [x] AI tools disclosed in README (Rule 6)
- [x] No API keys / secrets committed (Rule 7)
- [x] Mobile-friendly layout (Final submission requirement)
- [x] Regular incremental commits (ongoing)

---

*ANANNAY Ideathon 2025 | PS 4 — Open Innovation: Student Placement Pain Points*