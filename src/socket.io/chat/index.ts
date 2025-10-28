import { Server, Socket } from "socket.io";
import { MessageRepository, ChatRepository } from "../../DB";

interface ISendMessageData { message:string, destId:string }

const messageRepository = new MessageRepository();
const chatRepository = new ChatRepository();

export const sendMessage = (
    io:Server,
    socket:Socket,
    connectedUsers:Map<string,string>
) => {

    return async (data:ISendMessageData) => {
        console.log("send message", {data})

        socket.emit("successMessage",data)

        const senderId = socket.data.user.id;
        const receiverId = data.destId;
        const receiverSocketId = connectedUsers.get(receiverId);
        if(!receiverSocketId){
            console.log("receiver not found")
            return;
        }
        io.to(receiverSocketId).emit("receiveMessage",data)

        //save message in db
        //create message
        const createdMessage = await messageRepository.create({
            senderId,
            content: data.message,
        })
        //push message to chat messages array
        await chatRepository.update({
            users:{$all:[senderId,receiverId]}
        },{
            $push:{messages:createdMessage._id}
        })

    }
}