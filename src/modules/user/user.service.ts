import { type NextFunction, type Request, type Response } from "express";

class UserService {
    public profile = async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        res.json({user, success: true});
    }
}

export default new UserService();
