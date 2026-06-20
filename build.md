# Phase 2 — Build (about 2 hours)

Bring your agent to life in the browser, then give it powers — one at a time.
Each power is a **ready-made module**; you add it by pasting a prompt that tells
Claude to fetch it and wire it into your agent. After each step, **talk to your
agent to test it**. If anything breaks, paste the error to Claude and let it fix it.

> Everything here is **copy-paste prompts**. You never write code or type scary
> commands — you ask, Claude does.

---

## 📂 For your AI helper — how this project is named (paste this ONCE first)

This makes sure Claude never gets confused when it adds powers later.

> 📋 **Paste this to Claude:**
```text
For everything we do in this project, use these names exactly:
- PERSONALITY.md = my agent's voice.
- agent.js = the BRAIN — the only file that talks to the AI. Every power wires into here.
- server.js = runs my agent's website.
- public/ = the browser chat page.
When I later paste a module's guide to add a power, follow it but ADAPT it to my
project: anywhere it says "twin.js" it means agent.js; anywhere it says
"CLAUDE.md" or "PERSONA.md" it means PERSONALITY.md. Always wire the power into
agent.js — never create a second brain file or a separate terminal app. Confirm
you understand in one line.
```

---

## 📦 The power modules (links — copy any of these)

Each power lives in its own repo. The prompts below clone them for you, but here
are the links if you want to open or copy them yourself:

| Power | Repo link | Clone command |
|------|-----------|---------------|
| 🧠 Memory | https://github.com/luvishg-growthx/long-term-memory-engram-setup-guide-for-your-ai-agent | `git clone https://github.com/luvishg-growthx/long-term-memory-engram-setup-guide-for-your-ai-agent` |
| 📧 Email | https://github.com/luvishg-growthx/reading-your-emails-and-drafting-a-reply-for-them-setup-guide-for-your-ai-agent | `git clone https://github.com/luvishg-growthx/reading-your-emails-and-drafting-a-reply-for-them-setup-guide-for-your-ai-agent` |
| ⏰ Scheduler | https://github.com/luvishg-growthx/cronjobs-and-reminders-setup-guide-for-your-ai-agent | `git clone https://github.com/luvishg-growthx/cronjobs-and-reminders-setup-guide-for-your-ai-agent` |
| 💬 Slack (optional) | https://github.com/luvishg-growthx/upgrading-your-bot-to-being-a-slack-bot | `git clone https://github.com/luvishg-growthx/upgrading-your-bot-to-being-a-slack-bot` |

---

## Iteration 0 — see your agent talk (your magic moment)

> 📋 **Paste this to Claude:**
```text
Start my agent's website in the background, then tell me the exact link to open
in my browser. Keep it running so I can chat with it.
```

Claude gives you a link like **http://localhost:3000**. Open it → you'll see a
chat box. **Say hi.** It should answer in *your* voice. 🎉

Doesn't sound like you yet?

> 📋 **Paste this to Claude:**
```text
That reply didn't sound like me — it was too [formal / stiff / generic]. Update
PERSONALITY.md to be more [what you want], then I'll test again.
```

> 💾 **Save your progress.** Paste `checkpoint` and Claude saves your work so you
> can always come back to this point.

---

## Iteration 1 — give it memory 🧠

This adds long-term memory so your agent remembers things **forever**, across
every chat (not just the current one).

> 📋 **Paste this to Claude:**
```text
Add long-term memory to my agent. First clone the module, then follow its guide:
git clone https://github.com/luvishg-growthx/long-term-memory-engram-setup-guide-for-your-ai-agent memory-module
Read memory-module's guide and do everything it needs (including any installs),
wiring it INTO agent.js — its "twin.js" means my agent.js, its "CLAUDE.md" /
"PERSONA.md" mean my PERSONALITY.md. Don't make a second brain file. When it's
wired in, delete the memory-module folder, restart my agent in the background,
and give me the link.
```

**Test it:** tell your agent something ("my dog's name is Pixel"). Then ask Claude
to *"restart my agent"*, open a fresh chat, and ask *"what's my dog's name?"* — it
should remember. 🧠

> 💾 Paste `checkpoint`

---

## Iteration 2 — let it help with email 📧

Your agent reads your unread Gmail and **drafts replies in your voice** (it never
sends — only writes drafts you can check).

**Step A — connect Gmail (one-time, on the web):**
1. Go to **<https://claude.ai/customize/connectors>**
2. Find **Gmail** → **Connect** → sign in → allow read access.

**Step B — add the power:**

> 📋 **Paste this to Claude:**
```text
Add the email reply-drafting power to my agent. First clone the module, then
follow its guide:
git clone https://github.com/luvishg-growthx/reading-your-emails-and-drafting-a-reply-for-them-setup-guide-for-your-ai-agent email-module
Read email-module's guide and set it up for my agent (its "twin.js" = my
agent.js, "CLAUDE.md"/"PERSONA.md" = my PERSONALITY.md). Delete the email-module
folder when done.
```

**Test it** — in your browser chat, say:

> 📋 **Type this to your agent:**
```text
Read my unread emails and draft replies to the ones a human would actually
reply to, in my voice. Save the drafts to a file and tell me where.
```

> 💾 Paste `checkpoint`

---

## Iteration 3 — give it a sense of time ⏰

Now your agent can remind you and send you messages later.

> 📋 **Paste this to Claude:**
```text
Add the scheduler/reminders power to my agent. First clone the module, then
follow its guide:
git clone https://github.com/luvishg-growthx/cronjobs-and-reminders-setup-guide-for-your-ai-agent scheduler-module
Read scheduler-module's guide and wire it into my agent — its "twin.js" = my
agent.js; make the scheduler auto-start from my server.js so reminders fire
whenever my agent runs. Delete the scheduler-module folder when done, then
restart my agent in the background and give me the link.
```

**Test it** — in your browser chat, say:

> 📋 **Type this to your agent:**
```text
Send me a hi message in 2 minutes.
```

About two minutes later a reminder pops up on your screen, in your voice. 🎉

> 💾 Paste `checkpoint`

---

## Optional / advanced — put your agent on Slack 💬

Want to message your agent from Slack too?

> 📋 **Paste this to Claude:**
```text
Add the Slack power to my agent (optional/advanced). First clone the module, then
follow its guide:
git clone https://github.com/luvishg-growthx/upgrading-your-bot-to-being-a-slack-bot slack-module
Read slack-module's guide and wire Slack into my agent alongside my website (its
"twin.js" = my agent.js) — don't replace my website. Walk me through any accounts
or tokens I need. Delete the slack-module folder when done.
```

This needs a Slack account and a couple of tokens, so do it only if you're ahead
of time. Otherwise, polish what you have.

---

## You've built a real agent ✅

It chats like you, remembers you, helps with email, and reminds you — all in your
browser. Now make it shine on stage. 👉 Go to **Demo**.

> 🛟 Stuck? Don't struggle alone — paste the exact error to Claude, or grab a
> mentor.
