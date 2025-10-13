import { Schema } from "mongoose";
import { IAttachments } from "../../../utils";

export const attachmentSchema = new Schema<IAttachments>({
    url: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    _id: false
})
