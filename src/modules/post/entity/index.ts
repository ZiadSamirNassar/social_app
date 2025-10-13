import { ObjectId } from "mongoose";
import { IAttachments, IReaction } from "../../../utils";

export class Post{
    public userId: ObjectId;
    public content:string;
    public attatchiments?:IAttachments[];
    public reacts: IReaction[]
}