import https from "https";
import http from "http";

export function startKeepAlive() {
  // RENDER_EXTERNAL_URL is automatically set by Render for Web Services
  const url = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;
  
  // 5 minutes in milliseconds
  const interval = 5 * 60 * 1000;
  
  console.log(`[KeepAlive] Initialized. Will ping ${url}/health every 5 minutes.`);

  setInterval(() => {
    console.log(`[KeepAlive] Pinging ${url}/health to prevent sleep...`);
    
    const client = url.startsWith("https") ? https : http;
    
    client.get(`${url}/health`, (res) => {
      console.log(`[KeepAlive] Ping successful, status: ${res.statusCode}`);
    }).on("error", (err) => {
      console.error(`[KeepAlive] Ping failed: ${err.message}`);
    });
  }, interval);
}
