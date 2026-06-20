// schedule.js — adds a reminder/scheduled message. Your agent runs this for you
// (via the schedule-task skill) when you say things like "remind me at 7pm".
// You normally won't run it by hand.
//
// Examples:
//   node schedule.js --at "2026-06-21T19:15:00" --prompt "Write me a hi message"
//   node schedule.js --at "2026-06-21T19:15:00" --message "Call mom"
//   node schedule.js --cron "0 9 * * 1-5" --message "Standup in 30 min"

const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const JOBS_FILE = process.env.JOBS_FILE
  ? path.resolve(process.env.JOBS_FILE)
  : path.join(__dirname, "data", "jobs.json");

function parseArgs(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) flags[key] = true;
      else {
        flags[key] = next;
        i++;
      }
    }
  }
  return flags;
}

const flags = parseArgs(process.argv.slice(2));
if (!flags.at && !flags.cron) {
  console.error('Need --at "<time>" or --cron "<expr>".');
  process.exit(1);
}
if (!flags.message && !flags.prompt) {
  console.error("Need --message <text> or --prompt <instruction>.");
  process.exit(1);
}

const job = {
  id: randomUUID().slice(0, 8),
  title: flags.title || (flags.message ? String(flags.message).slice(0, 40) : "reminder"),
  status: "pending",
  lastRun: null,
};
if (flags.at) job.runAt = String(flags.at);
if (flags.cron) job.cron = String(flags.cron);
if (flags.prompt) job.prompt = String(flags.prompt);
if (flags.message) job.message = String(flags.message);
if (flags.channel) job.channel = String(flags.channel);

fs.mkdirSync(path.dirname(JOBS_FILE), { recursive: true });
let jobs = [];
try {
  const raw = fs.readFileSync(JOBS_FILE, "utf8").trim();
  if (raw) jobs = JSON.parse(raw);
  if (!Array.isArray(jobs)) jobs = [];
} catch (_) {
  jobs = [];
}
jobs.push(job);
fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));

console.log(`scheduled "${job.title}" ${job.runAt ? `at ${job.runAt}` : `on cron "${job.cron}"`} (id ${job.id})`);
