# Personal AI Agent — Starter

A personal AI agent you **chat with in your browser**. It speaks in *your* voice,
runs entirely on your own laptop, and needs **no API key** (it uses your
logged-in Claude Code session). This is the starter you build on during the
buildathon — you'll add powers (memory, email, reminders) step by step.

> ## 🤖 If you are Claude Code or Codex, read this first
>
> The user is building their personal AI agent from this starter. **Don't
> rebuild it — help them run it, personalize it, and add capabilities later.**
>
> - `PERSONALITY.md` — the agent's voice. Editing it changes how it talks.
> - `agent.js` — **the brain.** The only file that talks to the AI; everything
>   goes through its `ask(message)` function. **When a capability you add later
>   refers to `twin.js`, that means `agent.js`; when it refers to `CLAUDE.md` or
>   `PERSONA.md`, that means `PERSONALITY.md`. Wire new powers INTO `agent.js`;
>   never create a duplicate brain file.**
> - `server.js` — runs the agent as a local website.
> - `public/` — the browser chat page (`index.html`, `style.css`, `app.js`).
> - To run it: `node server.js`, then open the printed `http://localhost:3000`.
>
> Capabilities (memory, email, scheduler, Slack) are **not** included here — they
> get added during the buildathon by following each module's guide and wiring it
> into `agent.js`.

## Run it

```
node server.js
```

Then open **http://localhost:3000** in your browser and start chatting. Leave the
window running; press Ctrl+C to stop. **No install needed** to chat.

## Make it yours

Edit **`PERSONALITY.md`** — tone, humor, greetings, signature phrases. The agent
reads it fresh on every reply, so changes show up immediately.

## What's next (added during the build)

You'll give your agent these powers by pasting prompts that pull in ready-made
modules and wire them into `agent.js`:

- 🧠 **Memory** — remembers across chats
- 📧 **Email drafting** — reads Gmail, drafts replies in your voice
- ⏰ **Scheduler** — reminders and timed messages
- 💬 **Slack** (optional/advanced) — reach your agent from Slack too

## Files

```
PERSONALITY.md     your agent's voice
agent.js           the brain (talks to the AI)
server.js          runs the local website
public/            the browser chat page
```
