import express from "express";
import { setupSocket } from "./config/socket.js";
import apiRoutes from "./routes/index.js";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use("/api", apiRoutes);

setupSocket(server);

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
