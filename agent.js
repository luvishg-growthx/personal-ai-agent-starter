// agent.js — your agent's BRAIN. The one and only place that talks to the AI.
//
// Everything else (the website now, and any powers you add later) goes through
// this one function: ask(message). It reads your PERSONALITY.md so the reply
// sounds like YOU, and it keeps the conversation's memory so replies make sense
// in context.
//
// No API key needed — it uses your logged-in Claude Code session.
//
// 👉 When a capability you add later mentions "twin.js", it means THIS file
//    (agent.js). When it mentions "CLAUDE.md" or "PERSONA.md", it means your
//    PERSONALITY.md. New powers should wire INTO this file.

const { spawn } = require("child_process");
const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

// Read your voice file fresh every time, so edits to PERSONALITY.md show up
// immediately without restarting.
function personality() {
  try {
    return fs.readFileSync(path.join(__dirname, "PERSONALITY.md"), "utf8").trim();
  } catch (_) {
    return ""; // no personality file yet — the agent will still reply, just plainer
  }
}

// One conversation = one memory thread. The website uses a single thread, so the
// agent remembers what was said earlier in the chat.
const threads = new Map(); // threadId -> { id, started }
function threadFor(threadId) {
  let t = threads.get(threadId);
  if (!t) {
    t = { id: randomUUID(), started: false };
    threads.set(threadId, t);
  }
  return t;
}

// Ask the agent something. Returns a Promise with its reply (a string).
// `threadId` keeps separate conversations separate (default: one shared thread).
function ask(message, threadId = "main") {
  return new Promise((resolve) => {
    const t = threadFor(threadId);

    // First message starts the conversation; later messages continue it (memory).
    const memoryFlag = t.started ? ["--resume", t.id] : ["--session-id", t.id];
    t.started = true;

    // Wrap the message with your voice so every reply sounds like you.
    const voice = personality();
    const prompt = voice
      ? `Reply to the message below in this exact voice/persona. Stay in character.\n\n${voice}\n\n----- MESSAGE -----\n${message}`
      : message;

    const args = [
      "-p",
      prompt,
      ...memoryFlag,
      // Lets the agent use its tools freely (needed once you add powers),
      // without stopping to ask for permission each time.
      "--permission-mode",
      "bypassPermissions",
    ];

    const child = spawn("claude", args, { cwd: __dirname });

    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));

    child.on("close", (code) => {
      if (code !== 0) {
        console.error("[agent] error:", err.trim());
        resolve("(Hmm, I hit a snag. Is Claude Code installed and logged in?)");
        return;
      }
      resolve(out.trim() || "(…I didn't have anything to say to that.)");
    });
    child.on("error", (e) => {
      resolve("(I couldn't start the AI — make sure Claude Code is installed: " + e.message + ")");
    });
  });
}

module.exports = { ask };
