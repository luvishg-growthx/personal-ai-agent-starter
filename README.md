# Personal AI Agent — Starter

A personal AI agent you **chat with in your browser**. It speaks in *your* voice,
runs entirely on your own laptop, and needs **no API key** (it uses your
logged-in Claude Code session). This is the starter you build on during the
buildathon.

> ## 🤖 If you are Claude Code or Codex, read this first
>
> The user is building their personal AI agent from this starter. Here's how it
> fits together — **don't rebuild any of it; just help them run and personalize it.**
>
> - `PERSONALITY.md` — the agent's voice. Editing this changes how it talks.
> - `agent.js` — **the brain.** The only file that talks to the AI. Everything
>   goes through its `ask(message)` function. *(If any capability instructions
>   mention `twin.js`, they mean `agent.js`; if they mention `CLAUDE.md` or
>   `PERSONA.md`, they mean `PERSONALITY.md`.)*
> - `server.js` — runs the agent as a local website and auto-starts the scheduler.
> - `public/` — the browser chat page (`index.html`, `style.css`, `app.js`).
> - Bundled capabilities (already wired into `agent.js` / `server.js`):
>   - **Memory** (`memory.js`) — off until engram is installed; then the agent
>     recalls past chats. Turn on: `npm install github:luvishg-growthx/engram-memory`.
>   - **Email drafting** (`.claude/skills/email-replies` + `.claude/commands/reply.md`)
>     — needs the user's Gmail connector at claude.ai.
>   - **Scheduler** (`scheduler.js` + `schedule.js` + `.claude/skills/schedule-task`)
>     — already auto-starts; the agent creates reminders by running `schedule.js`.
> - To run it: `node server.js`, then open the printed `http://localhost:3000`.

## Run it

```
node server.js
```

Then open **http://localhost:3000** in your browser and start chatting. (Leave
the window running; press Ctrl+C to stop.)

That's it for the core — **no install needed** to chat.

## Make it yours

Edit **`PERSONALITY.md`** — tone, humor, greetings, signature phrases. The agent
reads it fresh on every reply, so changes show up immediately.

## Capabilities included

| Capability | What it does | To turn on |
|---|---|---|
| 🧠 **Memory** | Remembers things across chats | `npm install github:luvishg-growthx/engram-memory` |
| 📧 **Email drafting** | Reads unread Gmail, drafts replies in your voice (never sends) | Connect Gmail at claude.ai/customize/connectors |
| ⏰ **Scheduler** | "Remind me at 7pm" → fires a notification | Already on (starts with the agent) |

## Optional / advanced

- 💬 **Slack** — also reach your agent from Slack. Add it later from the Slack
  module repo.

## Files

```
PERSONALITY.md     your agent's voice
agent.js           the brain (talks to the AI)
server.js          runs the local website + scheduler
public/            the browser chat page
memory.js          long-term memory (off until engram installed)
scheduler.js       reminder engine (auto-started)
schedule.js        creates reminders (your agent runs this)
.claude/skills/    email + schedule skills
.claude/commands/  /reply command
```
