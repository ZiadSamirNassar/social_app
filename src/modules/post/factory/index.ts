import { IUser } from './../../../utils/common/interfaces/index';
import { Post } from '../entity';
import { CreatePostDTO } from './../post.dto';
export class PostFactorySrvice {
    craatePost(createPostDTO:CreatePostDTO, user:IUser){

        const post = new Post()

        post.content = createPostDTO.content;
        post.userId = user._id;
        post.reacts = []
        post.attatchiments = []

        return post
    }
}