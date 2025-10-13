import { ObjectId } from "mongoose";
import { IAttachments, IReaction } from "../../../utils";

export class CommentEntity {
        public userId: ObjectId;
        public postId: ObjectId;
        public parentId?: ObjectId;
        public content: string;
        public reactions: IReaction[];
        public attachment?: IAttachments;   
}

