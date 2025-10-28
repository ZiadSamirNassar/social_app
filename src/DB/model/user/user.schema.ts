import { Schema } from "mongoose";
import {  IUser, sendOtpMail } from "../../../utils";
import { SYS_ROLE, USER_AGENT } from "../../../utils";

export const schema = new Schema<IUser>( {
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        //if agent is local then password is required
        required: function() { 
            return this.agent === USER_AGENT.LOCAL 
        } 
    },
    otp: { 
        type: String 
    },
    otpExpiry: { 
        type: Date 
    },
    credentialsUpdatedAt: { 
        type: Date 
    },
    isVerified: { 
        type: Boolean 
    },
    role: { 
        type: Number,
        enum: SYS_ROLE,
        default: SYS_ROLE.USER 
    },
    agent: { 
        type: Number, 
        enum: USER_AGENT,
        default: USER_AGENT.LOCAL 
    },
    friends:[{type: Schema.Types.ObjectId,ref: "User"}]
     
}, {timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }});

schema.pre("save", async function(next) {
    if (this.isNew) {
        //send otp
        await sendOtpMail({to: this.email, otp: this.otp});
    }
    next();
});
