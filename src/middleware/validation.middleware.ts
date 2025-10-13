import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { BadRequestError } from "../utils";

export const isValid = (schema: z.ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const result = schema.safeParse(data);
        if (!result.success) {
            let errorMessage = result.error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message
            }));
            throw new BadRequestError("Validation Error", errorMessage);
        }
        next();
    };
};