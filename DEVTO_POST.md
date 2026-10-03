---
title: FocusBuddy: A Tiny AI Companion That Helps My Friend Start
published: false
tags: devchallenge, weekendchallenge, hf26challenge
---

This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01).

## What I Built

I built FocusBuddy for a friend who wants to study and work but finds it hard to start when scrolling is always one tap away. I chose this problem because the first few minutes of a task can feel like the hardest part, and I wanted to make those minutes feel easier without blaming him or pretending a website can control his phone.

FocusBuddy lets him name a task and start with just two minutes. It can count when he leaves the FocusBuddy tab, pause for a 60-second scroll urge, encourage a phone-down moment, and save a short reflection after a session. A dashboard turns those sessions into a visible story of progress.

## Demo

Live Demo: YOUR_RENDER_URL (add the public Render URL after deployment)

## Code

GitHub: [biggod151004-dev/FocusBuddy](https://github.com/biggod151004-dev/FocusBuddy)

## How I Built It

FocusBuddy is built with React, TypeScript, and Vite. It saves focus history and reflections in browser LocalStorage and uses a service worker for the app shell.

The optional AI nudge uses the open-weight Qwen2.5-0.5B-Instruct model through WebLLM in a compatible browser. WebGPU is required by this implementation, and the model weights need to be downloaded the first time. If the model is disabled or unavailable, the app uses a short built-in nudge. No closed AI API is used.

## Why Does Open Innovation Matter?

The AI provider is isolated behind a small `generateNudge(context)` function, so developers can inspect the prompt and replace the model. On compatible devices, inference happens in the browser. Focus history and reflections stay in local browser storage and are not sent to an application server. The model weights are fetched from the configured model registry, so first-time AI setup needs internet; the app does not claim fully offline AI.

Using an open-weight model makes it practical to experiment with the nudge style and local inference without making the product depend on one proprietary AI API.

## My Agent Session

[Optional: add a DevRelay session link or embed after saving the session.]

## Prize Categories

[Add the applicable partner categories here, or remove this section.]
