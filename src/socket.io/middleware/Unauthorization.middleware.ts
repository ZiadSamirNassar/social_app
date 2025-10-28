import { Socket } from "socket.io";
import { NotFoundError, UnauthorizedError, verifyToken } from "../../utils";
import { UserRepository } from "../../DB";

export const socketAuth = async(socket:Socket, next: Function)=>{
        try{
            const { authorization } = socket.handshake.auth;
            if (!authorization) {
                throw new UnauthorizedError("Authentication error");
            }
            const payload = verifyToken(authorization);

            const userRepository = new UserRepository();
            const user = await userRepository.findOne({_id:payload["id"] as string});

            if(!user)  throw new NotFoundError("User not found");

            socket.data.user = user;
            next();
        }
        catch(error){
            console.log(error);
            next(new UnauthorizedError("Authentication error"));
        }
    }
    