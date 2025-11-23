PR Review Agent

Automated AI-powered GitHub Pull Request Review System using multi-agent reasoning.

🚀 Overview

This project implements an intelligent backend service that reviews GitHub Pull Requests using multiple specialized AI agents. Each agent focuses on a different aspect of the code—such as logic, readability, performance, and security—resulting in structured, actionable feedback similar to a senior engineer’s review.

✨ Features

✔ Accepts GitHub PR URLs or raw diff text
✔ Multi-agent LLM reasoning
✔ Categorized review comments
✔ Severity levels (info / warning / critical)
✔ Line-based referencing
✔ Actionable suggestions
✔ API-driven FastAPI backend
✔ Small minimal UI for testing
✔ Extendable & configurable

🧠 Multi-Agent Architecture

The system uses four agents:

Agent	Responsibility
Security Agent	Detects SQL injection, unsafe I/O, authentication flaws
Performance Agent	Detects O(n²) loops, inefficient DB queries
Readability Agent	Detects long functions, naming issues, formatting
Logic Agent	Detects race conditions, unreachable conditions, logical bugs

Each agent independently analyzes the diff and returns structured output.

🏗️ System Architecture
User Input (PR URL or Diff)
         ↓
Backend — FastAPI
         ↓
GitHub API (if PR URL)
         ↓
Diff Extraction & Parsing
         ↓
Multi-Agent Execution
|  Security Agent
|  Performance Agent
|  Readability Agent
|  Logic Agent
         ↓
Result Aggregation
         ↓
Structured Review Output (JSON)

🛠️ Tech Stack
Backend:

Python

FastAPI

LLM Reasoning & Prompting

GitHub API (optional)

Orchestration:

Multi-agent framework (custom / LangChain / CrewAI / Lyzr Agent Studio)

🧪 Example Output
security — critical — Line 42
Potential SQL injection vulnerability detected
Suggestion: Use parameterized queries instead of string concatenation

performance — warning — Line 58
N+1 query pattern detected in loop
Suggestion: Use bulk fetch or join operation

readability — info — Line 73
Function exceeds recommended length
Suggestion: Break into smaller functions

logic — warning — Line 91
Potential race condition in async operation
Suggestion: Add lock or atomic handling

🔧 API Usage
POST /review

Submit a PR URL or raw diff:

{
  "input": "https://github.com/user/repo/pull/14"
}


or

{
  "input": "diff --git a/sample.py b/sample.py ..."
}

Response:
[
  {
    "category": "security",
    "severity": "critical",
    "line": 42,
    "issue": "SQL injection vulnerability",
    "suggestion": "Use parameterized queries"
  },
  ...
]

💻 Local Development
Clone:
git clone <your-repo>
cd pr-review-agent

Install dependencies:
pip install -r requirements.txt

Run backend:
uvicorn app:app --reload

Open browser:
http://localhost:8000
