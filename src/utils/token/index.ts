import jwt from "jsonwebtoken";
import config from "../../config/dev.config";

export const generateToken = ({ payload, secret = config.JWT_SECRET, options }: {
    payload: jwt.JwtPayload;
    secret?: jwt.Secret;
    options?: jwt.SignOptions;
}) => {
    return jwt.sign(payload, secret, options);
}

export const verifyToken = (token: string, secret = config.JWT_SECRET) => {
    return jwt.verify(token, secret);
}
