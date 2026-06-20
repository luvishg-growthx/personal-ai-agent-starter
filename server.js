// server.js — runs your agent as a little website on your own computer.
//
// Start it, then open the link it prints in your browser. You'll see a chat box.
// Whatever you type goes to agent.js (the brain) and the reply shows up in the
// chat — in your voice.
//
// Nothing is installed and nothing goes online: this runs only on your laptop.

const http = require("http");
const fs = require("fs");
const path = require("path");
const { ask } = require("./agent.js");

// Start the reminder scheduler in the same process, so scheduled messages fire
// while your agent is running. Best-effort — ignored if scheduler.js is absent.
try {
  require("./scheduler.js").startScheduler(ask);
} catch (_) {}

const PORT = Number(process.env.PORT || 3000);
const PUBLIC = path.join(__dirname, "public");

// Which file types to serve (so the webpage loads correctly).
const TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".ico": "image/x-icon",
};

const server = http.createServer(async (req, res) => {
  // The chat box sends your message here; we reply with the agent's answer.
  if (req.method === "POST" && req.url === "/chat") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { message } = JSON.parse(body || "{}");
        const reply = await ask(String(message || ""));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply }));
      } catch (e) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply: "(Something went wrong handling that.)" }));
      }
    });
    return;
  }

  // Otherwise, serve the chat webpage (and its files) from the public/ folder.
  let urlPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(PUBLIC, path.normalize(urlPath).replace(/^(\.\.[/\\])+/, ""));
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("");
  console.log("  🤖 Your agent is live! Open this link in your browser:");
  console.log("");
  console.log("        http://localhost:" + PORT);
  console.log("");
  console.log("  (Leave this running. Press Ctrl+C to stop it.)");
  console.log("");
});
