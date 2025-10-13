import { NextFunction, Request, Response } from "express";
import { TokenRepository } from "../../DB";
import { verifyToken } from "../token";
import { TOKEN_TYPE } from "../common/enums";



export class AppError extends Error {
    constructor(message: string, public statusCode: number, public details?: Record<string, any>[]) {
        super(message);
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, 403);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, details?: Record<string, any>[]) {
        super(message, 400, details);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, 500);
    }
}

export class InvalidCredentialsError extends AppError {
    constructor(message: string) {
        super(message, 401);
    }
}

export const globalErrorHandler = async (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const tokenRepository = new TokenRepository();

    //refresh token process
    if(err.message === "token expired"){
        const refreshToken = req.headers.refreshToken;
        if(!refreshToken){
            throw new UnauthorizedError("Unauthorized");
        }
        //verify token
        const decoded = verifyToken(refreshToken as string);
        //token exists
        const tokenExists = await tokenRepository.exists({ token: refreshToken, type: TOKEN_TYPE.REFRESH });
        
        if(!tokenExists){
            throw new UnauthorizedError("Unauthorized");
        }
        
    }
    
    

    res.status(err.statusCode || 500).json({
        message: err.message,
        details: err.details,
        success: false
    })
}

