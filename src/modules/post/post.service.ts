import { Request, Response } from "express";
import { PostRepository } from "../../DB";
import { NotFoundError, REACTION, UnauthorizedError } from "../../utils";
import { PostFactorySrvice } from "./factory";
import { CreatePostDTO } from "./post.dto";
import { addReactionProvider } from "../../utils/common/providers/react.provider";

class postService {
    private postRepository = new PostRepository()

    public create = async (req: Request, res: Response) => {
        //get data fom request
        const createPostDTO: CreatePostDTO = req.body

        //factory
        const postFactorySrvice = new PostFactorySrvice()
        const post = postFactorySrvice.craatePost(createPostDTO, req.user)

        const postCreated = await this.postRepository.create(post)

        res.status(201).json({
            succes: true,
            data: postCreated
        })
    }

    public react = async (req: Request, res: Response) => {
        //get data fom request
        const {id} = req.params
        const {react} = req.body
        const userId = req.user.id

        //check post exist
        
        await addReactionProvider(this.postRepository, id, react, userId)

        res.status(204).end()
    }

    public getSpecific = async (req: Request, res: Response) => {
        //get data fom request
        const {id} = req.params

        //check post exist
        const postExist = await this.postRepository.findOne({_id: id},{},{
            populate: [ 
                {path: "userId", select: "name"},
                {path: "reactions.userId", select: "name"},
                {path: "Comments", match: {parentId: undefined}}
            ]
        })

        if(!postExist){
            throw new NotFoundError("Post not found")
        }

        res.status(200).json({
            succes: true,
            data: postExist
        })
    }

    public deletePost = async (req: Request, res: Response) => {
        //get data fom request
        const {id} = req.params

        //check post exist
        const postExist = await this.postRepository.exists({_id: id})

        if(!postExist){
            throw new NotFoundError("Post not found")
        }

        //check if user is the owner of the post
        if(postExist.userId.toString() !== req.user._id.toString()){
            throw new UnauthorizedError("You are not authorized to delete this post")
        }

        //delete post from DB
        await this.postRepository.delete({_id: id})

        //return response
        return res.status(204).end()
    }

}

export default new postService()