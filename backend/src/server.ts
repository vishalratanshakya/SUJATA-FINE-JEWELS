import app from "./app";
import { connectDB } from "./config/db";
import { startKeepAlive } from "./utils/keepAlive";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  
  const server = http.createServer(app);
  
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        process.env.CLIENT_URL || "http://localhost:3000",
      ],
      credentials: true,
    }
  });

  app.set("io", io);

  io.on("connection", (socket) => {
    console.log("Client connected via Socket.IO:", socket.id);
    
    // Admin clients can join an 'admin' room to receive admin-specific notifications
    socket.on("join_admin", () => {
      socket.join("admin_room");
      console.log(`Socket ${socket.id} joined admin_room`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  server.listen(PORT, () => {
    console.log(`SUJATA Fine Jewels Backend Server running on port ${PORT}`);
    
    // Start the keep-alive ping for Render
    startKeepAlive();
  });
}

startServer();
