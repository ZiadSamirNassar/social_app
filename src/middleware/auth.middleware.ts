import { NextFunction, Request, Response } from "express";
import { TokenRepository, UserRepository } from "../DB";
import { UnauthorizedError, verifyToken, TOKEN_TYPE, IPayload } from "../utils";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepository();
    const tokenRepository = new TokenRepository();
    //get token from header
    const accessToken = req.headers.authorization;

    if(!accessToken){
        throw new UnauthorizedError("Unauthorized, Token not found");
    }

    const token = await tokenRepository.findOne({token: accessToken, type: TOKEN_TYPE.ACCESS});

    if(token){
        throw new UnauthorizedError("Unauthorized, Token blocked");
    }

    //verify token
    const decoded = verifyToken(accessToken) as IPayload;

    if(!decoded){
        throw new UnauthorizedError("Unauthorized, Token invalid");
    }

    const userId = decoded.id;

    const user = await userRepository.findOne({_id: userId});

    if(!user){
        throw new UnauthorizedError("Unauthorized, User not found");
    }

    //check user credentials(logout from all devices)
    if((decoded.iat*1000) < user.credentialsUpdatedAt.getTime()){
        throw new UnauthorizedError("Unauthorized, User credentials updated");
    }

    req.user = user;
    next();
};
