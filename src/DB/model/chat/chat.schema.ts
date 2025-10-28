import { Schema } from "mongoose";
import { IChat } from "../../../utils";
import {attachmentSchema, reactSchema} from "../common";

const chatSchema = new Schema<IChat>({
    users:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    }],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Message",
    }],
    // attachments: [attachmentSchema],
    // reactions:[reactSchema]

},{timestamps:true})

export default chatSchema;
