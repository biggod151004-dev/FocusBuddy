# FocusBuddy

A tiny, kind companion that helps you start focused work without pretending to control your phone.

## Problem

A friend wants to study or work, but starting is hard when scrolling is always one tap away. A web app cannot reliably block Instagram, YouTube, WhatsApp, or other apps on a phone, and FocusBuddy does not claim that it can.

## Solution

FocusBuddy lowers the barrier to starting, makes tab-leaving visible without blame, offers a one-minute pause for scrolling urges, and turns completed sessions into a local story of progress.

## Features

- **Just 2 minutes:** name a task, get a short supportive nudge, and begin a tiny starter session.
- **Pomodoro:** adjustable 5–90 minute focus sessions, pause, reset, progress ring, and a five-minute break option.
- **Gentle awareness:** Page Visibility API counts when the FocusBuddy tab becomes hidden. It cannot see activity in other phone apps.
- **Scroll pause:** pause the timer and wait 60 seconds before deciding what to do.
- **Phone-down challenge:** a kind reminder at session start and an optional check-in afterward.
- **Reflection and story:** save a short reflection and see past sessions on a timeline.
- **Dashboard:** streak, total focus minutes, sessions, tab leaves, scroll pauses, and a seven-day chart.
- **PWA:** installable shell, app icon, service worker, and cached assets for repeat offline visits.
- **Demo mode:** explicitly load sample history from Settings.
- **About and privacy:** explain the real limitation, local data, and open innovation.

## Open-Source AI

The optional provider in `src/ai/nudge.ts` uses **Qwen2.5-0.5B-Instruct**, a small open-weight model, through the WebLLM browser runtime. It was selected as a small instruct model that can run locally in a compatible browser, keeping the AI layer replaceable without an application server. WebLLM and the configured model registry must support the user's browser/device; WebGPU is required by this app's AI path.

Enable **On-device AI nudges** in Settings. The browser downloads the model on first use, which can be a large download; later use can reuse the browser cache. The model receives the task, planned duration, aggregate count of previously noticed tab leaves, and up to three saved reflections. The prompt and input stay in the browser; model weights are fetched from the model registry. No AI API key or closed AI service is used. If WebGPU is unavailable or model startup fails, the app gives a built-in supportive nudge instead. Turn off the setting to skip model initialization entirely.

Replace the model or inference implementation in `src/ai/nudge.ts`; `generateNudge(context)` is the UI-facing boundary. WebLLM model identifiers and browser compatibility can evolve, so check the WebLLM supported-model list when changing the configured model.

## Tech Stack

- React 18, TypeScript, Vite
- WebLLM with Qwen2.5-0.5B-Instruct (optional, browser-local inference)
- Browser LocalStorage for sessions and preferences
- A small custom service worker and web app manifest
- Lucide icons, responsive CSS

## Architecture

`src/App.tsx` contains the screens and session flows. `src/ai/nudge.ts` defines the AI context, prompt, browser-local provider, and fallback. User data is serialized to LocalStorage; there is no account or application backend. `public/sw.js`, `public/manifest.webmanifest`, and `public/icons/` provide the installable app shell. Static assets are cached as they are visited and the app falls back to the shell when offline.

## Local Development

Requirements: Node.js 20 or newer and npm.

```bash
git clone <repo-url>
cd FocusBuddy
npm install
npm run dev
```

Open the local URL printed by Vite. Install dependencies once while online. The optional AI model also requires a network connection for its initial download.

## Build

```bash
npm run build
npm run preview
```

The production files are created in `dist/`.

## PWA

Deploy over HTTPS (or test on localhost). Visit the site once so the service worker can cache the app assets. On Android Chrome, open the browser menu and choose **Install app** or **Add to Home screen**. On desktop Chromium, use the install icon/menu. FocusBuddy caches its app shell and fetched same-origin assets for repeat offline visits. Core timers, tracking, history, and reflections work offline after the shell has loaded. AI generation requires a compatible browser runtime and model availability; first use needs internet to fetch model weights. The optional Google Fonts stylesheet falls back to system fonts offline.

## Privacy

Focus history, settings, and reflections stay in this browser's LocalStorage on this device. They are not sent to a FocusBuddy server. The optional model runs in-browser; only the model files are fetched remotely. The user-provided task and up to three recent reflections are passed to the local model in browser memory. There is no account, server database, or closed AI API.

## Limitations

- A browser cannot reliably block or inspect other apps on a phone.
- The Page Visibility API only detects when this web page/tab is hidden.
- AI availability depends on WebGPU, browser/device support, model download, and local runtime compatibility. A built-in nudge is used when AI is unavailable.
- LocalStorage is tied to the browser profile and can be cleared by the user or browser.
- Streaks use locally recorded session dates and are intended as gentle context, not a score.

## Future Improvements

- Accountability messages chosen and shared by the user
- Better local models and configurable AI personas
- Optional calendar integration
- Export/import of local session data
- Richer, accessible charts

## License

MIT. See [LICENSE](LICENSE).

## GitHub: first push

Create an empty GitHub repository, then run these commands from the project folder. Replace `YOUR_GITHUB_REPO_URL` with the HTTPS or SSH URL shown by GitHub (for example, `https://github.com/your-name/focusbuddy.git`).

```bash
git init
git add .
git commit -m "Build FocusBuddy"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

This repository has no secrets or required environment variables; `.env.example` is not needed.

## Deployment (Render)

**Live demo:** [focusbuddy-1-ykyk.onrender.com](https://focusbuddy-1-ykyk.onrender.com)

The site is published from the `main` branch of the GitHub repository. Render builds the Vite frontend and serves the output with the included Node server.

- Build command: `pnpm install --frozen-lockfile && pnpm run build`
- Start command: `node server.mjs`
- Health check path: `/healthz`

If configuring the service manually, use these commands and do not set a PHP start command. With auto-deploy enabled, new commits to `main` are deployed automatically. Alternatively, a Render Static Site can use the same build command and publish directory `dist`.
## Test the AI feature

Open Settings in a WebGPU-compatible browser, enable **On-device AI nudges**, then start a two-minute session. The first model initialization reports download progress on the AI label and may take time. The nudge is generated locally. To verify fallback behavior, disable the setting or use a browser without WebGPU; the timer still gets a built-in nudge.

## Two-minute demo script

1. On Home, choose **Just 2 minutes**, enter “Read one page,” then begin; point out the supportive nudge and phone-down challenge.
2. Briefly switch tabs and return to show the non-judgmental tab-leave count.
3. Choose **I want to scroll**; show the pause screen and 60-second countdown (for a short recording, use browser devtools to adjust the interval only in a demo build).
4. Return to focus. To show session completion quickly, use a short focus duration or wait for the timer; add a brief reflection and answer the phone check-in.
5. Open **Progress** to show the story, totals, and seven-day chart. For a fuller chart, use **Settings → Load demo data**.
6. Show **Install app** and explain HTTPS/Android browser installation. In Settings, mention local storage and optional browser-local Qwen inference.
