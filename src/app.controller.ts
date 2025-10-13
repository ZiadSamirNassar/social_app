import  { NextFunction, Request, Response, type Express } from "express";
import { connectDB } from "./DB";
import * as routes from "./modules";
import { NotFoundError } from "./utils";
import { globalErrorHandler } from "./utils";

export const pootstrap = ( app: Express, express: any) => {

    app.use(express.json());
    connectDB();

    //routes
    app.use("/auth", routes.authRouter);
    app.use("/post", routes.postRouter);
    app.use("/comment", routes.commentRouter);

    //invalid url handling
    app.use( "/{*dumy}", (req, res, next) => {
        console.log("Invalid URL");
        throw new NotFoundError(" Hi there 👋, I'm Ziad Nassar, And this Invalid URL 🚨");
    })

    //global error handler
    app.use( globalErrorHandler)
};