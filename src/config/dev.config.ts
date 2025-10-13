import dotenv from "dotenv";
dotenv.config();

export default {
    //database
    DB_URL : process.env.DB_URL,
    //server
    PORT : process.env.PORT,

    //Email
    EMAIL_USER : process.env.EMAIL_USER,
    EMAIL_PASSWORD : process.env.EMAIL_PASSWORD,
    EMAIL_HOST : process.env.EMAIL_HOST,
    EMAIL_PORT : process.env.EMAIL_PORT,

    //jwt
    JWT_SECRET : process.env.JWT_SECRET,
}
