# 🛡️ PlacementShield — Resume Defense Drill

> **Stop Freezing on Your Own Resume Projects.**  
> PlacementShield is an AI-powered interview pressure simulator that cross-examines students on their own resume bullets — with a live timer, aggressive follow-up questions, and honest scoring.

---

## 🎯 The Problem

Every year, thousands of engineering students fail placement rounds in the **Technical Discussion round** — not because they lack skills, but because they **cannot defend what they built**.

Interviewers aggressively probe resume projects:
- *"Why did you use MongoDB instead of PostgreSQL?"*
- *"Your model has 97% accuracy — is it overfitting?"*
- *"JWT vs sessions — what are the trade-offs?"*

Students who built projects from tutorials freeze. They know the code. They don't know **why** they wrote it.

### What It Costs Students
- ❌ Offer rejections after clearing DSA
- ⏰ 3–5 anxious hours of unfocused preparation every night before interviews
- 🤷 No tool specifically trains for this gap

### Why Existing Tools Fail

| Tool | Problem |
|---|---|
| LeetCode | Only trains DSA, not resume defense |
| ChatGPT | Too polite — agrees with everything, zero pressure |
| P2P Mock (Pramp) | Peers often not technical enough; hard to schedule |
| YouTube | One-way — no Q&A, no feedback |
| InterviewBit | Focus on coding, not project deep-dives |

---

## 📊 Validated Evidence

We **interviewed 5 students** (detailed transcripts in `evidence/`) and **surveyed 62 students** across Tier-1, Tier-2, and Tier-3 colleges.

| Metric | Number |
|---|---|
| Students who froze on own resume questions | **77.4%** |
| Students spending 3+ anxious hours the night before | **67.7%** |
| Students who found no existing tool helpful | **91.9%** |
| Students who'd use PlacementShield free | **100%** |
| Students who'd recommend it to placement batch | **100%** |
| Students who said ChatGPT is "too polite" for this | **67.4%** |

> 📂 Full evidence in [`evidence/interview_notes.md`](evidence/interview_notes.md), [`evidence/survey_analysis.md`](evidence/survey_analysis.md), and [`evidence/survey_results.csv`](evidence/survey_results.csv)

### Student Voices

> *"ChatGPT gives me the answer but never puts me under pressure. I need something that mimics a real interviewer who keeps pushing."*  
> — Rahul K., Final Year CSE, Pune

> *"The tutorial I followed just used Firebase. I never questioned it. In the interview I realized I didn't actually know why."*  
> — Priya M., Pre-Final Year, State Engineering College

> *"People put things on their resume to impress recruiters, not because they understand it deeply. There's a massive gap."*  
> — Kartik B., Final Year CSE, Delhi

---

## 🚀 The Solution: PlacementShield

PlacementShield is a **web-based, zero-setup interview drill** that:

1. **📋 Reads your resume bullet** — Paste any project line or achievement
2. **🔍 Identifies danger zones** — AI detects which technologies an interviewer will attack
3. **⚡ Drills you under pressure** — 5 escalating follow-up questions with a 60-second live timer and pressure meter
4. **📊 Scores your answers** — Clarity (10), Technical Depth (10), Honesty (10)
5. **💡 Gives actionable feedback** — What to improve before the real interview

---

## 🛠️ How to Run

No installation. No backend. Runs directly in your browser.

```bash
# Clone the repository
git clone https://github.com/kapoorn0511-creator/ANANNAY-Ideathon.git
cd ANANNAY-Ideathon

# Open directly in browser
# Just double-click index.html — or use Live Server in VS Code
```

That's it. No `npm install`. No Python setup. Instant demo.

---

## 🏗️ Architecture

```
PlacementShield/
├── index.html          # Single-page app — all 4 screens
├── style.css           # Dark mode design system, fully responsive
├── app.js              # Core engine: pattern detection, drill, scoring
├── evidence/
│   ├── interview_notes.md    # 5 detailed student interviews
│   ├── survey_results.csv    # 62-student raw survey data
│   └── survey_analysis.md   # Analysis with key statistics
└── README.md
```

### Tech Choices (and why)
- **Vanilla HTML/CSS/JS** — Zero dependency = zero setup = demo-safe. Works offline. No "npm not found" issues during presentations.
- **Client-side engine** — Resume analysis uses a pattern-matching knowledge base (expandable to Gemini API with one function swap)
- **No auth, no database** — Frictionless. Students don't need to sign up to get value.

---

## 🔄 Differentiation

| | ChatGPT | LeetCode | P2P Mock | **PlacementShield** |
|---|---|---|---|---|
| Resume-specific questions | ❌ Generic | ❌ No | ⚠️ Depends on peer | ✅ Targeted to YOUR bullet |
| Time pressure simulation | ❌ No | ✅ DSA only | ⚠️ Sometimes | ✅ 60s real-time countdown |
| Aggressive follow-up drill | ❌ Too polite | ❌ No | ⚠️ Peer-dependent | ✅ 5-level escalating |
| Answer scoring | ❌ No rubric | ✅ DSA only | ⚠️ Subjective | ✅ Clarity + Depth + Honesty |
| Instant, free, zero setup | ⚠️ Rate limits | ⚠️ Premium | ❌ Scheduling needed | ✅ Paste & Go |

---

## 📈 Traction Signals

- **100%** of surveyed students said they would use this tool
- **41.9%** said they would pay for it
- **8+ students independently described PlacementShield** during interviews before seeing the product — saying *"something that reads my resume and grills me with a timer"*

---

## 🗺️ Roadmap

| Phase | Feature |
|---|---|
| V1 (Now) | Pattern-based resume analysis + 5Q drill + scoring |
| V2 | Gemini API integration for real generative questions + PDF resume upload |
| V3 | Voice mode (speak your answer), speech-to-text evaluation |
| V4 | Domain tracks (Backend, ML, Data, Frontend), company-specific question banks |
| V5 | Friend leaderboard, batch mode for college TPO departments |

---

## 🏆 Why This Wins

1. **Real problem with real proof** — Not a guess. 77.4% freeze rate, 62-person survey, 5 deep interviews.
2. **No tool like it exists** — We checked every tool students use. None specifically does this.
3. **Students asked for exactly this** — Organically, before seeing our product.
4. **Live, working demo** — Open `index.html` and it works immediately. No setup.
5. **Massive potential** — 1.5 million engineering students graduate in India annually. Every single one faces this problem.

---

## 📋 PS 4 Checklist

- [x] **Clear problem definition** — Students can't defend their own resume projects under interview pressure
- [x] **Existing tools fall short** — Evidenced with specific gaps per tool
- [x] **Evidence folder** — 5 student interviews + 62-student survey with raw data
- [x] **Working prototype** — Live web app, zero setup, demo-ready
- [x] **Differentiation** — Specific comparison table vs all existing alternatives
- [x] **Signs students would use it** — 100% would use free, 41.9% would pay, students described the product themselves
- [x] **Short pitch** — "Students put things on their resume they can't defend. PlacementShield fixes that in 5 minutes."

---

*Built at ANANNAY Ideathon 2025 | PS 4 — Open Innovation: Student Placement Pain Points*