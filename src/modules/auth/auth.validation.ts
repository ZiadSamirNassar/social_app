import { z } from "zod";
import { RegisterDto, LoginDto, VerifyAccountDto, SendOtpDto, GoogleLoginDto, ResetPasswordDto } from "./auth.dto";

export const registerSchema = z.object<RegisterDto>({
    name: z.string().min(3, "Name must be at least 3 characters long").max(30, "Name must be at most 30 characters long") as unknown as string,
    email: z.email("Invalid email address") as unknown as string,
    password: z.string().min(5, "Password must be at least 5 characters long").max(30, "Password must be at most 30 characters long") as unknown as string,
});

export const loginSchema = z.object<LoginDto>({
    email: z.email("Invalid email address") as unknown as string,
    password: z.string().min(5, "Password must be at least 5 characters long").max(30, "Password must be at most 30 characters long") as unknown as string,
});

export const verifyAccountSchema = z.object<VerifyAccountDto>({
    email: z.email("Invalid email address") as unknown as string,
    otp: z.string().length(6, "OTP must be at least 6 characters long") as unknown as string,
});

export const sendOtpSchema = z.object<SendOtpDto>({
    email: z.email("Invalid email address") as unknown as string,
});

export const googleLoginSchema = z.object<GoogleLoginDto>({
    email: z.email("Invalid email address") as unknown as string,
}); 

export const resetPasswordSchema = z.object<ResetPasswordDto>({
    email: z.email("Invalid email address") as unknown as string,
    otp: z.string().length(6, "OTP must be at least 6 characters long") as unknown as string,
    newPassword: z.string().min(5, "Password must be at least 5 characters long").max(30, "Password must be at most 30 characters long") as unknown as string,
}); 
