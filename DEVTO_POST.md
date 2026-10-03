# FocusBuddy: A Tiny AI Companion That Helps My Friend Start

This is a submission for the Hacktoberfest Weekend Challenge: Build for a Friend.

## What I Built

I built FocusBuddy for a friend who wants to study and work but finds it hard to begin when scrolling is always one tap away. I chose this because the starting moment is a real, everyday friction point, and I wanted to build something small that could help without blaming him or pretending a website can control his phone.

FocusBuddy makes it easier to begin with two minutes, gives optional supportive AI nudges, notices when its browser tab is left, offers a one-minute pause for an urge to scroll, and saves reflections as a visible story of progress.

## Demo

Live Demo: YOUR_DEPLOYED_URL

GitHub: YOUR_GITHUB_REPO_URL

## How It Works

- **2-minute start:** name a task and make a small beginning.
- **Pomodoro:** adjustable focus duration, countdown, pause, reset, and progress ring.
- **Distraction counter:** counts when FocusBuddy's page becomes hidden using Page Visibility.
- **Scroll urge timer:** pause and wait 60 seconds before deciding.
- **Phone-down challenge:** a gentle prompt to place the phone farther away.
- **AI nudge:** optional short encouragement from an open-weight Qwen model in a compatible browser.
- **Reflection:** leave a short note after a completed focus session.
- **Dashboard:** view session history, totals, streak, and the last seven days.
- **PWA:** install the web app and revisit its cached shell offline.

## How I Built It

The app uses React, TypeScript, Vite, browser LocalStorage, a custom service worker, and the WebLLM runtime with Qwen2.5-0.5B-Instruct for optional in-browser inference. The model weights download from the model registry; the first download requires internet and WebGPU-compatible hardware/browser. If AI is disabled or unavailable, a short built-in nudge is used. No closed AI API is used.

## Why Open Innovation Matters

For a small personal tool, open-weight AI makes the nudge layer replaceable and open to experimentation. Developers can inspect and customize the prompt and provider, and a compatible device can run inference locally. Focus history stays in local browser storage; the app sends no task or reflection to an application server. Qwen weights are fetched from the configured registry, so this app does not claim that AI is fully offline on first use. An open, replaceable provider reduces dependence on a single proprietary AI API for the app's architecture.

## The Honest Part

FocusBuddy cannot block other phone apps. It doesn't pretend to. Instead, it helps the user notice distractions, delay the urge to scroll, and make starting easier.

The browser can only count when the FocusBuddy tab becomes hidden; it cannot inspect activity in other apps.

## My Friend's Feedback

> "I handed it to my friend and asked what felt useful, what felt annoying, and whether the AI nudges felt natural."

Actual feedback: [Add your friend's feedback here after asking.]

What felt useful: [Add response]

What felt annoying: [Add response]

Did the nudges feel natural?: [Add response]

## Open Source

FocusBuddy is available under the MIT License. Contributions are welcome: open an issue to discuss an idea, then submit a pull request with a focused change and a short explanation.

## What I Learned

- Building for one real person helps keep the feature set grounded.
- A gentle start can be more useful than another strict productivity score.
- Local-first storage makes a private reflection feel appropriate for a personal tool.
- Open-weight AI is useful when the provider boundary and runtime requirements are made clear.
- A PWA can make a small web tool easier to revisit, while offline behavior still needs honest limits.

## Prize Categories

[Add the applicable partner categories here.]
