import { ObjectId } from "mongoose";
import { IComment, IPost, IUser } from "../../../utils";
import { CreateCommentDto } from "../comment.dto";
import { CommentEntity } from "../entity";

export class CommentFactoryService {

    public createComment(commentDto: CreateCommentDto, user: IUser, post: IPost, comment?: IComment){

        const newComment = new CommentEntity()
        newComment.userId = user._id;
        newComment.postId = post? post._id : comment?.postId;
        newComment.parentId = comment?._id;
        newComment.content = commentDto.content;
        newComment.reactions = [];
        newComment.attachment = commentDto.attachment;

        return newComment;
    }
    
}
