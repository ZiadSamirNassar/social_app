import { SYS_ROLE, USER_AGENT, generateOtp, generateOtpExpiry, hashPassword } from "../../../utils";
import { RegisterDto } from "../auth.dto";
import { User } from "../entity";

export class AuthFactory {
    
    async register( registerDto: RegisterDto){
        const user = new User();

        user.name = registerDto.name;
        user.email = registerDto.email;
        user.password = await hashPassword(registerDto.password);
        user.role = SYS_ROLE.USER;
        user.agent = USER_AGENT.LOCAL;
        user.isVerified = false;
        user.credentialsUpdatedAt = new Date();
        user.otp = generateOtp();
        user.otpExpiry = generateOtpExpiry(5);//5 minutes
        
        return user;
    }
    
}
