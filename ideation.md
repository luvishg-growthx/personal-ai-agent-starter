# Phase 1 — Ideate (about 20 minutes)

Before any building, decide **who your agent is**: its **name** and its
**personality**. That personality is the single most important thing — it's what
makes the agent feel like *you* and not a robot.

This phase is quick on purpose. Don't overthink it. In ~20 minutes you'll walk
away with a finished personality and a name.

> No code here. You're just having a short chat with Claude about how you talk.

---

## Pick a starting vibe (optional, but it speeds things up)

Don't start from a blank page. Skim these and pick the one closest to you — your
agent can be a mix, and you'll tweak it in a second.

| Vibe | Sounds like… |
|------|--------------|
| 😎 **The Witty Sidekick** | Quick, playful, a joke in every reply, but always helpful |
| 🔥 **The Hype Friend** | Warm, encouraging, hypes you up, lots of energy + emojis |
| 🧘 **The Calm Mentor** | Steady, thoughtful, kind, never rushed |
| 💼 **The Sharp Professional** | Crisp, confident, polished — friendly but to the point |
| 🤗 **The Warm Bestie** | Casual, caring, talks like your closest friend |
| 😏 **The Deadpan Comedian** | Dry, sarcastic, understated, secretly very competent |

Remember the one you like (or "a mix of Hype Friend + Witty Sidekick"). You'll
hand it to Claude in the prompt below.

---

## Do it: the Ideation prompt

Make sure Claude is running **inside your `my-agent` folder** (from the Welcome
step). Then paste this:

> 📋 **Paste this to Claude:**
```text
You are helping me design the PERSONALITY of my personal AI agent — a little AI
version of me that I'll chat with in my browser. Your ONLY job right now is to
figure out how I talk and write it down. Do NOT write any code.

Keep this FAST — we have about 20 minutes. Follow these rules:
- Ask me a SHORT set of quick questions, ONE or TWO at a time, mostly
  multiple-choice so I can answer in a word. Aim for 5–6 questions TOTAL, then
  stop. Do not interview me forever.
- Start by asking which "vibe" fits me best (e.g. Witty Sidekick, Hype Friend,
  Calm Mentor, Sharp Professional, Warm Bestie, Deadpan Comedian — or a mix).
- Then ask only what you still need: how formal/casual, how much humour, emojis
  or not, a couple of words/phrases I actually say, and one thing my agent
  should NEVER do.
- Also help me NAME my agent — suggest 3 names based on my answers, or use mine.

When you have enough (don't drag it out), do ALL of this:
1. Write my answers into the PERSONALITY.md file in this folder — a short, vivid
   description written as "You are ..." that captures my voice.
2. Put my agent's NAME in PERSONALITY.md, and also set it as the title/name shown
   in public/index.html (replace "Your Agent" everywhere).
3. Show me the finished PERSONALITY.md and tell me my agent's name.

Begin by greeting me and asking your first question.
```

---

## You're done with ideation when…

- [ ] Your agent has a **name** you like.
- [ ] Your **`PERSONALITY.md`** is filled in (Claude wrote it for you).
- [ ] It took about 20 minutes — not an hour. If Claude keeps asking questions,
      tell it: *"that's enough, write my PERSONALITY.md now."*

> 💡 Don't aim for perfect. You'll hear your agent talk in a few minutes and can
> tweak the personality any time — it updates instantly.

👉 Next: **Build** — bring it to life in your browser.
