import app from "./app";
import { connectDB } from "./config/db";
import { startKeepAlive } from "./utils/keepAlive";

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`SUJATA Fine Jewels Backend Server running on port ${PORT}`);
    
    // Start the keep-alive ping for Render
    startKeepAlive();
  });
}

startServer();
