import express, { NextFunction, Request, Response } from "express";
import { pootstrap } from "./app.controller";
import config from "./config/dev.config";
import { initSocket } from "./socket.io";
import cors from "cors"

const port = config.PORT;
const app = express();
app.use(cors({origin: "*"}))
app.use((req:Request, res:Response, next:NextFunction)=> {
    console.log(`method : ${req.method}, URL : ${req.url}`)
    next()
})


pootstrap(app, express);

const server = app.listen(port, () => {
    console.log(`Server is running on url : http://127.0.0.1:${port} 🚀`);
});

const io = initSocket(server);
