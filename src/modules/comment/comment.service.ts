import { Request, Response } from "express";
import { CommentRepository, PostRepository } from "../../DB";
import { NotFoundError, IComment, IPost, UnauthorizedError, addReactionProvider } from "../../utils";
import { CreateCommentDto } from "./comment.dto";
import {CommentFactoryService} from "./factory";
import { console } from "inspector";

class CommentService {

    private postRepository = new PostRepository();
    private commentRepository = new CommentRepository();
    private commentFactoryService = new CommentFactoryService();
    
    public create = async (req: Request, res: Response) => {
        const { postId, id } = req.params;
        const createCommentDto: CreateCommentDto = req.body;
        
        //check if post exists
        let postExists: IPost;
        if(postId){
            postExists = await this.postRepository.exists({_id: postId});
            if (!postExists) throw new NotFoundError("Post not found");
        }

        let commentExists: IComment;
        if(id){
            //check if comment exists
            commentExists = await this.commentRepository.exists({_id: id});
            if (!commentExists) throw new NotFoundError("Comment not found");
        }

        //prepare comment data(in factory)
        const comment = this.commentFactoryService.createComment(
            createCommentDto, 
            req.user, 
            postExists, 
            commentExists
        );

        //save comment to DB
        const createdComment = await this.commentRepository.create(comment);

        //return response
        return res.status(201).json({
            success: true,
            data: createdComment
        })
    }

    public getSpecific = async (req: Request, res: Response) => {
        const { id } = req.params;

        const commentExists = await this.commentRepository.exists(
            {_id: id},
            {},
            {populate: [
                {path: "replies"},
            ]}
        );
        if (!commentExists) throw new NotFoundError("Comment not found");


        //return response
        return res.status(200).json({
            success: true,
            data: commentExists
        })
    }

    public deleteComment = async (req: Request, res: Response) => {
        const { id } = req.params;
        const commentExists = await this.commentRepository.exists(
            {_id: id},
            {},
            {populate: [
                {path: "postId", select: "userId"},
            ]}
        );
        if (!commentExists) throw new NotFoundError("Comment not found");

        //check if user is the owner of the comment
        if(
            ![
                commentExists.userId.toString(),
                (commentExists.postId as unknown as IPost).userId.toString()
            ].includes(req.user._id.toString())
        ){
            throw new UnauthorizedError("You are not authorized to delete this comment")
        }
        //delete comment from DB
        await this.commentRepository.delete({_id: id});

        //return response
        return res.status(204).end();
    }

    public react = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { react } = req.body;
        const userId = req.user.id;

        //check comment exist
        await addReactionProvider(this.commentRepository, id, react, userId)

        //return response
        return res.status(204).end();
    }
}

export default new CommentService();
