import {
  createServer,
  IncomingMessage,
  ServerResponse,
  RequestListener,
} from "http";
import { Server as SocketServer } from "socket.io";

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./interfaces/socket";
import { handleDisconnect, handleDisconnecting } from "./handlers/connection";

const PORT = process.env.PORT || "5000";
const HOST = process.env.HOST || "localhost";

const httpHandler: RequestListener = (
  req: IncomingMessage,
  res: ServerResponse
): void => {
  const { method, url } = req;
  if (method && url) {
    const message = `Accessing ${method.toUpperCase()} ${url}`;
    res.writeHead(200);
    res.end(message);
  } else {
    res.writeHead(500);
    res.end();
  }
};

const httpServer = createServer(httpHandler);
const io = new SocketServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer);

io.on("connection", (socket) => {
  console.log(`[server] ${socket.id} connected`);

  socket.on("disconnecting", (reason) =>
    handleDisconnecting(socket.id, reason)
  );

  socket.on("disconnect", (reason) => handleDisconnect(socket.id, reason));
});

httpServer.listen(parseInt(PORT), HOST, () => {
  console.log(`Server: http://${HOST}:${PORT}`);
});
