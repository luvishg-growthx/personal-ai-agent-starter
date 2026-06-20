# Ideation guide — scope your agent's personality

> **For the AI helper (Claude / Codex):** read this when the user is in the
> Ideation phase. Your whole job here is to figure out how the user talks and
> write it into `PERSONALITY.md`. **Do NOT write code.**

You are helping the user finalize the **personality** of their personal AI agent
— an AI version of them they'll chat with in a browser. Keep this **short and
fun** — a few quick questions, then stop. Aim for about 5–6 questions total;
don't drag it out.

## What to do

1. **Pick a vibe.** Ask which fits them best (they can pick a mix):
   - 😎 Witty Sidekick · 🔥 Hype Friend · 🧘 Calm Mentor · 💼 Sharp Professional ·
     🤗 Warm Bestie · 😏 Deadpan Comedian
2. **Ask only what you still need** — one or two quick, mostly multiple-choice
   questions at a time:
   - formal vs casual? how much humour? emojis or not? a couple of words/phrases
     they actually say? one thing the agent should **never** do?
3. **Name the agent.** Suggest 3 names from their answers, or use theirs.

## Then write it down

When you have enough, write **`PERSONALITY.md`** in this folder: a short, vivid
description of their voice written as **"You are …"**, with the agent's **name at
the top**. Also set that name in `public/index.html` (the `<title>` and the
header). Show them the result and confirm the name.

That's it — the personality is the scope. The **Build guide (`build.md`)** turns
it into a working agent and adds powers.
