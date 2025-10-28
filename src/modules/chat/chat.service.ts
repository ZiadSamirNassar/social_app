import { Request, Response } from "express";
import { ChatRepository, MessageRepository } from "../../DB";

class ChatService{

    private readonly chatRepository = new ChatRepository();
    private readonly messageRepository = new MessageRepository();
    
    public getChat = async (req:Request,res:Response) => {
        
        const {userId} = req.params;
        const loginUserId = req.user.id;

        let chat;
        chat = await this.chatRepository.findOne({
            users:{$all:[userId,loginUserId]},            
        },{},{
            populate:[{path:"messages"}],
        });

        if(!chat){
            chat = await this.chatRepository.create({
                users:[userId,loginUserId],
                messages:[]
            })
        }

        return res.status(200).json({data:{chat}, success:true});
    }
    
}

export default new ChatService()
