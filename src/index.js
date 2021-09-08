import https from "https";
import fs from "fs";
import { logger } from "./logger.js";
import { Server } from "socket.io";
import { Socket } from "dgram";
import Routes from "./routes.js";

const PORT = process.env.port || "3000";

const localHostSsl = {
  key: fs.readFileSync("./certificates/key.pem"),
  cert: fs.readFileSync("./certificates/cert.pem"),
};

const routes = new Routes();
const server = https.createServer(localHostSsl, routes.handler.bind(routes));

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

routes.setSocketInstance(io);

io.on("connection", (socket) => {
  logger.info(`someone connected to ${socket.id}`);
});

const startServer = () => {
  const add = server.address();
  logger.info(`app running at https://${add.address}:${add.port}`);
};

server.listen(PORT, startServer);
