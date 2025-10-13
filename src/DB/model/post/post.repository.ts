import { Post } from "./post.model";
import { IPost } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";

export class PostRepository extends AbstractRepository<IPost> {
    constructor() {
        super(Post);
    }
}