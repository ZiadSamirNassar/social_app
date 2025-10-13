import { type NextFunction, type Request, type Response } from "express";
import { LoginDto, RegisterDto, ResetPasswordDto, SendOtpDto, VerifyAccountDto } from "./auth.dto";
import { UserRepository, TokenRepository } from "../../DB";
import { comparePassword, ConflictError, InvalidCredentialsError, NotFoundError, generateToken, generateOtp, generateOtpExpiry, sendOtpMail, hashPassword } from "../../utils";
import { AuthFactory } from "./factory";
import { TOKEN_TYPE } from "../../utils";

class AuthService {

    private userRepository = new UserRepository();
    private tokenRepository = new TokenRepository();
    private authFactory = new AuthFactory();

    public register = async (req: Request, res: Response) => {
        //get data from req
        const registerDto: RegisterDto = req.body;

        //check if user already exists
        const userExists = await this.userRepository.exists({ email: registerDto.email });

        if(userExists){
            throw new ConflictError("User already exists");
        }

        //preprocess data
        const user = await this.authFactory.register(registerDto);
        
        //save into db
        await this.userRepository.create(user);

        //send response
        return res.status(201).json({
            message: "User registered successfully",
            data: user,
            success: true
        });
    }
    

    public login = async (req: Request, res: Response) => {
        //get data from req
        const loginDto: LoginDto = req.body;

        //check if user exists
        const userExists = await this.userRepository.exists({ email: loginDto.email });

        if(!userExists){
            throw new NotFoundError("User not found");
        }
        
        if(!userExists.isVerified){
            throw new ConflictError("User not verified");
        }
        //compare password
        const isPasswordMatch = await comparePassword(loginDto.password, userExists.password);

        if(!isPasswordMatch){
            throw new InvalidCredentialsError("Invalid credentials");
        }

        //generate token
        const accessToken = generateToken({payload: {id: userExists.id}});
        const refreshToken = generateToken({payload: {id: userExists.id}, options: { expiresIn: "7d" }});

        //save token into db
        await this.tokenRepository.create({
            token: refreshToken,
            userId: userExists.id,
            type: TOKEN_TYPE.REFRESH
        });
        
        //send response
        return res.status(200).json({
            message: "User logged in successfully",
            data: {
                accessToken,
                refreshToken
            },
            success: true
        });
    }

    public verifyAccount = async (req: Request, res: Response) => {
        
        const verifyAccountDto: VerifyAccountDto = req.body;

        //check if user exists
        const userExists = await this.userRepository.exists({ email: verifyAccountDto.email });

        if(!userExists){
            throw new NotFoundError("User not found");
        }

        if(userExists.otp !== verifyAccountDto.otp){
            throw new ConflictError("Invalid OTP");
        }

        if(userExists.otpExpiry < new Date()){
            throw new ConflictError("OTP expired");
        }

        //update user
        await this.userRepository.update(
            {_id: userExists.id},
            { isVerified: true, $unset: { otp: 1, otpExpiry: 1 } },
        );

        //send response
        return res.status(200).json({
            message: "User verified successfully",
            success: true
        });
    }

    public sendOtp = async (req: Request, res: Response) => {
        //get data from req
        const sendOtpDto: SendOtpDto = req.body;
        
        //cheack user exists
        const userExists = await this.userRepository.exists({ email: sendOtpDto.email });

        if(!userExists){
            throw new NotFoundError("User not found");
        }

        //generate otp
        const otp = generateOtp();
        const otpExpiry = generateOtpExpiry(5);

        //update user
        await this.userRepository.update(
            { email: sendOtpDto.email },
            { otp, otpExpiry },
        );

        //send otp to user
        sendOtpMail({to: sendOtpDto.email, otp});

        //send response
        return res.status(200).json({
            message: "OTP sent successfully",
            success: true
        });
    }

    public googleLogin = async (req: Request, res: Response) => {
        return res.status(200).json({
            message: "User logged in successfully",
            success: true
        });
    }

    public resetPassword = async (req: Request, res: Response) => {

        const resetPasswordDto: ResetPasswordDto = req.body;

        //check if user exists
        const userExists = await this.userRepository.exists({ email: resetPasswordDto.email });

        if(!userExists){
            throw new NotFoundError("User not found");
        }

        if(userExists.otp !== resetPasswordDto.otp){
            throw new ConflictError("Invalid OTP");
        }

        if(userExists.otpExpiry < new Date()){
            throw new ConflictError("OTP expired");
        }

        //update user
        await this.userRepository.update(
            { email: resetPasswordDto.email },
            { password: await hashPassword(resetPasswordDto.newPassword), $unset: { otp: 1, otpExpiry: 1 }, credentialsUpdatedAt: new Date() },
        );
        
        return res.status(200).json({
            message: "Password reset successfully",
            success: true
        });
    }

    public logout = async (req: Request, res: Response) => {

        const token = await this.tokenRepository.create({ token: req.headers.authorization, type: TOKEN_TYPE.ACCESS, userId: req.user.id });

        return res.status(204).json({success: true});
    }
}

//sengelton design pattern
export const authService = new AuthService();
