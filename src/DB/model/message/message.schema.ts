import { Schema } from "mongoose";
import { IMessage } from "../../../utils";
import {attachmentSchema, reactSchema} from "../common";

const messageSchema = new Schema<IMessage>({
    content:{
        type:String,
        required:true
    },
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    // attachments: [attachmentSchema],
    // reactions:[reactSchema]

},{timestamps:true})

export default messageSchema;
