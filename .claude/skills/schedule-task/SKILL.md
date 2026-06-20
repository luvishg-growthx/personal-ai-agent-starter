---
name: schedule-task
description: Schedule a future or recurring reminder/message for the user (e.g. "remind me at 7:30pm", "send me a hype message every weekday at 9am"). Trigger whenever the user asks to schedule, remind, or send something later or on a repeating schedule.
---

# Schedule a reminder / message

When the user asks to be reminded or sent something later, you MUST actually
create it by running the `schedule.js` tool. Don't just say "okay, I'll remind
you" — if you don't run the command, nothing is scheduled. The reminder fires
on its own while the agent is running (a desktop notification pops up).

## Step 1 — find the current time
Run: `date "+%Y-%m-%dT%H:%M:%S"`

## Step 2 — work out when it should happen
- "at 7:30" / "7:30pm" → today (or tomorrow if already past) at `19:30:00`.
- "in 10 minutes" → now + 10 minutes.
- Write it as 24-hour local time like `2026-06-21T19:30:00` (no timezone letters).
- Repeating ("every weekday at 9am") → a cron pattern instead: `0 9 * * 1-5`
  (the 5 fields are: minute hour day-of-month month day-of-week; 0=Sunday).

## Step 3 — create it (this is the real step)
Compose it in the user's voice at send time:
```
node schedule.js --at "2026-06-21T19:30:00" --prompt "Write a short, friendly hi message." --title "hi message"
```
Or send exact words they gave you:
```
node schedule.js --at "2026-06-21T19:30:00" --message "Call mom" --title "call reminder"
```
Repeating:
```
node schedule.js --cron "0 9 * * 1-5" --message "Standup in 30 minutes."
```

## Step 4 — confirm
Tell them what you set and when (use the line the tool printed). It fires by
itself as long as their agent is running — they don't need to do anything else.
