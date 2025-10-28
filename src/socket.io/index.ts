import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { socketAuth } from "./middleware/Unauthorization.middleware";
import { sendMessage } from "./chat";

export const connectedUsers = new Map<string,string>();

export const initSocket = (server: HttpServer) => {
    
    const io = new Server(server, { cors: { origin: "*" } });

    //auth middelwair
    io.use(socketAuth)


    io.on("connection", (socket) => {
        connectedUsers.set(socket.data.user.id,socket.id);

        socket.on("sendMessage", sendMessage(io,socket,connectedUsers))
    });

};