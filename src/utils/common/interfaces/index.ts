import { SYS_ROLE, USER_AGENT, TOKEN_TYPE, REACTION } from "../enums";
import { ObjectId } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    otp?: string;
    otpExpiry?: Date;
    credentialsUpdatedAt: Date;
    isVerified: boolean;
    role: SYS_ROLE;
    agent: USER_AGENT;
}

export interface IToken {
    userId: ObjectId;
    token: string;
    type: TOKEN_TYPE;
}

export interface IPayload extends JwtPayload{
    id: ObjectId;
}

export interface IReaction {
    userId: ObjectId;
    react: REACTION;
}

export interface IAttachments {
    url: string;
    id: string;
}

export interface IPost {
    _id: ObjectId;
    userId: ObjectId;
    content: string;
    attachments?: IAttachments[];
    reactions: IReaction[];
}

export interface IComment {
    _id: ObjectId;
    userId: ObjectId;
    postId: ObjectId;
    parentId?: ObjectId;
    content: string;
    reactions: IReaction[];
    attachment?: IAttachments;
}