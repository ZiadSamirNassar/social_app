import { SYS_ROLE, USER_AGENT } from "../../../utils";

export class User{
    public name!: string;
    public email!: string;
    public password!: string;
    public otp!: string;
    public otpExpiry!: Date;
    public credentialsUpdatedAt!: Date;
    public isVerified!: boolean;
    public role!: SYS_ROLE;
    public agent!: USER_AGENT;
}