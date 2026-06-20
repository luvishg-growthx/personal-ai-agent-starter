# Build guide — build the agent, then add powers

> **For the AI helper (Claude / Codex):** read this when the user is in the Build
> phase. Build their agent from this starter, then add only the powers they ask
> for. Prefer **cloning ready-made modules** over writing code from scratch.

## Names (so nothing gets confused)

- `PERSONALITY.md` = the agent's voice.
- `agent.js` = **the brain** — the only file that talks to the AI. Every power
  wires in here.
- `server.js` = runs the local website (and any auto-started powers).
- `public/` = the browser chat page.

If a power's instructions mention **`twin.js`**, that means **`agent.js`**. If
they mention **`CLAUDE.md`/`PERSONA.md`**, that means **`PERSONALITY.md`**. Always
wire powers **into `agent.js`** — never create a second brain file.

## Iteration 1 — the web agent (do this first)

1. Make sure `PERSONALITY.md` is filled in. If it isn't, tell the user to do the
   Ideation step first (read `ideation.md`).
2. Make sure the agent's **name** is set in `public/index.html` (title + header).
3. Start the website in the **background** and give the user the exact
   `http://localhost:…` link to open. Keep it running.

The user can now chat with their agent, in their voice, in the browser. 🎉

## Then ask which powers they want, and add the chosen ones — in order

For each power, **clone its module and follow that module's own guide**, wiring
it into `agent.js`. Delete the cloned module folder when done, then restart the
agent. Don't rebuild anything by hand.

**Iteration 2 — Memory** (remembers across chats):
```
git clone https://github.com/luvishg-growthx/long-term-memory-engram-setup-guide-for-your-ai-agent memory-module
```

**Iteration 3 — Reminders** (timed/recurring messages; auto-start from server.js):
```
git clone https://github.com/luvishg-growthx/cronjobs-and-reminders-setup-guide-for-your-ai-agent scheduler-module
```

**Iteration 4 — Email** (drafts replies; first tell the user to connect Gmail at
claude.ai/customize/connectors):
```
git clone https://github.com/luvishg-growthx/reading-your-emails-and-drafting-a-reply-for-them-setup-guide-for-your-ai-agent email-module
```

**Iteration 5 (optional) — Slack + deploy** (reach the agent from Slack; walk the
user through creating the Slack app + tokens to deploy):
```
git clone https://github.com/luvishg-growthx/upgrading-your-bot-to-being-a-slack-bot slack-module
```

**Bonus (optional) — Calendar** (block time / create events): no module — tell
the user to connect **Google Calendar** at claude.ai/customize/connectors, then
they can just ask the agent ("block 6–8pm for deep work").

## As you go

- After each power works, commit with a `checkpoint`.
- Keep the personality intact — the voice is the user's.
- If something breaks, read the error and fix it; don't rewrite whole files.
