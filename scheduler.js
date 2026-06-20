// scheduler.js — lets your agent send you things later ("remind me at 7pm",
// "every morning at 9 send me a hype message").
//
// You don't run this yourself — server.js starts it automatically when your
// agent is running. It checks data/jobs.json every 30s and, when a job is due,
// either runs your agent (for a message in your voice) or sends fixed text.
// Reminders pop up as a desktop notification (and in the console; and on Slack
// if you've set that up).

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// The agent's brain is injected by startScheduler() so this file doesn't depend
// on agent.js directly. Memory is optional (for the nightly tidy-up).
let askFn = async () => "(no brain wired in)";
let memory = null;
try {
  memory = require("./memory.js");
} catch (_) {}

const JOBS_FILE = process.env.JOBS_FILE
  ? path.resolve(process.env.JOBS_FILE)
  : path.join(__dirname, "data", "jobs.json");
const POLL_MS = Number(process.env.POLL_MS || 30000);
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_CHANNEL = process.env.SLACK_CHANNEL;

function loadJobs() {
  try {
    const raw = fs.readFileSync(JOBS_FILE, "utf8").trim();
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (_) {
    return [];
  }
}
function saveJobs(jobs) {
  fs.mkdirSync(path.dirname(JOBS_FILE), { recursive: true });
  const tmp = JOBS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(jobs, null, 2));
  fs.renameSync(tmp, JOBS_FILE);
}

function fieldMatch(field, value) {
  if (field === "*") return true;
  for (const part of field.split(",")) {
    if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = Number(stepStr);
      if (range === "*") {
        if (step && value % step === 0) return true;
      } else {
        const base = Number(range);
        if (value >= base && step && (value - base) % step === 0) return true;
      }
    } else if (part.includes("-")) {
      const [a, b] = part.split("-").map(Number);
      if (value >= a && value <= b) return true;
    } else if (Number(part) === value) {
      return true;
    }
  }
  return false;
}
function cronMatches(expr, d) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return false;
  const [mi, ho, dom, mo, dow] = parts;
  return (
    fieldMatch(mi, d.getMinutes()) &&
    fieldMatch(ho, d.getHours()) &&
    fieldMatch(dom, d.getDate()) &&
    fieldMatch(mo, d.getMonth() + 1) &&
    fieldMatch(dow, d.getDay())
  );
}
const minuteKey = (d) => d.toISOString().slice(0, 16);

function isDue(job, now) {
  if (job.status === "done") return false;
  if (job.runAt) return new Date(job.runAt) <= now;
  if (job.cron) return cronMatches(job.cron, now) && job.lastRun !== minuteKey(now);
  return false;
}

async function deliver(text, job) {
  const title = job.title || "reminder";
  console.log(`\n🔔 [${new Date().toLocaleTimeString()}] ${title}: ${text}\n`);
  try {
    spawnSync("osascript", [
      "-e",
      `display notification ${JSON.stringify(text)} with title ${JSON.stringify("🤖 " + title)}`,
    ]);
  } catch (_) {}
  const channel = job.channel || SLACK_CHANNEL;
  if (SLACK_BOT_TOKEN && channel) {
    try {
      await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SLACK_BOT_TOKEN}` },
        body: JSON.stringify({ channel, text }),
      });
    } catch (e) {
      console.error("[slack] post failed:", e.message);
    }
  }
}

async function runJob(job) {
  const text = job.prompt ? await askFn(job.prompt, `job-${job.id}-${Date.now()}`) : job.message || "(empty)";
  await deliver(text, job);
}

let lastDream = null;
async function tick() {
  const jobs = loadJobs();
  const now = new Date();
  let changed = false;
  for (const job of jobs) {
    if (!isDue(job, now)) continue;
    await runJob(job);
    job.lastRun = minuteKey(now);
    if (job.runAt) job.status = "done";
    changed = true;
  }
  if (changed) saveJobs(jobs);

  // Once a day at 3am, tidy up long-term memory (no-op if memory is off).
  if (now.getHours() === 3 && now.getMinutes() === 0 && lastDream !== minuteKey(now)) {
    lastDream = minuteKey(now);
    if (memory && memory.dream) memory.dream();
  }
}

// Start the checking loop. server.js calls this with the agent's ask function.
let started = false;
function startScheduler(ask) {
  if (typeof ask === "function") askFn = ask;
  if (started) return null;
  started = true;
  tick().catch((e) => console.error("[scheduler] error:", e.message));
  return setInterval(() => tick().catch((e) => console.error("[scheduler] error:", e.message)), POLL_MS);
}

module.exports = { startScheduler };

// Optional: run on its own with `node scheduler.js`.
if (require.main === module) {
  const { ask } = require("./agent.js");
  startScheduler(ask);
}
