import nodemailer from "nodemailer";
import config from "../../config/dev.config";
import { otpMailPage } from "./otpMail.page";


export const sendOtpMail = async ({to, otp }:{
    to: string,
    otp: string
}) => {
    //create transporter
    const transporter = nodemailer.createTransport({
        host: config.EMAIL_HOST,
        port: Number(config.EMAIL_PORT),
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASSWORD
        }
    });

    //send mail
    const mailOptions = {
        from: ` "Social App" <${config.EMAIL_USER}>`,
        to,
        html: await otpMailPage(otp)
    };
    await transporter.sendMail(mailOptions);
};
