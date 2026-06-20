// memory.js — long-term memory for your agent, powered by engram.
//
// This is OFF until you install engram (the Memory step in the handbook turns it
// on). Until then, every function here quietly does nothing, so your agent keeps
// working without it.
//
//   recallContext(msg) → relevant past memories to add to a reply
//   remember(text)      → save what just happened
//   dream()             → tidy up memory (run occasionally)

const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const ENGRAM = process.env.ENGRAM_BIN || path.join(__dirname, "node_modules", ".bin", "engram");
const DB = process.env.ENGRAM_DB || path.join(__dirname, "memory", "agent-memory.db");

function available() {
  return process.env.ENGRAM_BIN ? true : fs.existsSync(ENGRAM);
}

function run(args) {
  fs.mkdirSync(path.dirname(DB), { recursive: true });
  return spawnSync(ENGRAM, [...args, "--db", DB], {
    cwd: __dirname,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 10,
  });
}

function recallContext(query, k = 5) {
  if (!available() || !query) return "";
  try {
    const r = run(["recall", query, "--json", "-k", String(k), "--mark-used"]);
    if (r.status !== 0) return "";
    const hits = JSON.parse(r.stdout || "[]");
    if (!Array.isArray(hits) || hits.length === 0) return "";
    const lines = hits.map(
      (h, i) => `${i + 1}. ${String(h.content || "").replace(/\s+/g, " ").slice(0, 300)}`,
    );
    return ["Things you remember (from past conversations):", ...lines].join("\n");
  } catch (_) {
    return "";
  }
}

function remember(text, importance = 5, tier = "episodic") {
  if (!available() || !text) return;
  try {
    run(["add", text, "--tier", tier, "--importance", String(importance)]);
  } catch (_) {}
}

function dream() {
  if (!available()) return;
  try {
    run(["dream"]);
  } catch (_) {}
}

module.exports = { recallContext, remember, dream, available, DB };
