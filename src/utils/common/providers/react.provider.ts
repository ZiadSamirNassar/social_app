import { PostRepository, CommentRepository } from "../../../DB"
import { NotFoundError } from "../../error"
import { REACTION } from "../enums"

export const addReactionProvider = async (
    repo: PostRepository|CommentRepository, 
    id: string, 
    react: number, 
    userId: string
) => {
    
    const postExist = await repo.exists({_id: id})
    
            if(!postExist){
                throw new NotFoundError("Post not found")
            }
    
            const reactionIndex = postExist.reactions.findIndex((reaction) => reaction.userId.toString() === userId)
    
            //update post
            if(reactionIndex == -1){//if reaction not exist >> Create reaction
                await repo.update(
                    {_id: id},
                    {$push: {reactions: { react: react || REACTION.LIKE, userId } }
                })
            }else if(react == undefined){ //if reaction exist and reat not exist >> Delete reaction
                await repo.update(
                    {_id: id, "reactions.userId": userId},
                    {$pull: {reactions: { userId } }
                })
            }else{//if reaction exist and reat not Undefined >> Update react
                await repo.update(
                    {_id: id, "reactions.userId": userId},
                    { "reactions.$.react": react || REACTION.LIKE }
                )
            }
}
