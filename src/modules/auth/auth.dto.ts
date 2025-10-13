
export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}
    
export interface LoginDto {
    email: string;
    password: string;
}

export interface GoogleLoginDto {
    email: string;
}

export interface SendOtpDto {
    email: string;
}

export interface VerifyAccountDto {
    email: string;
    otp: string;
}

export interface ResetPasswordDto {
    email: string;
    otp: string;
    newPassword: string;
}

