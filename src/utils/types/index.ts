import "express"
import { IUser } from "../common/interfaces";
import { Document } from "mongoose";

declare global {
    namespace Express {
        interface Request {
            user: IUser&Document;
        }
    }
}