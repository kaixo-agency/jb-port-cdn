const WebSocket = require("ws");
const path = require("path");
const fs = require("fs");

const wss = new WebSocket.Server({ port: 35729 });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send("connected");

  ws.on("close", () => console.log("Client disconnected"));
});

// Watch for changes in the assets folder (relative to the root of the project)
const assetsPath = path.join(__dirname, "../assets"); // Adjust path if needed
fs.watch(assetsPath, { recursive: true }, () => {
  console.log("File change detected. Reloading...");
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send("reload");
    }
  });
});

console.log("WebSocket server running on ws://localhost:35729");
