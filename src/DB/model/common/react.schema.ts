import { Schema } from "mongoose";
import { IReaction, REACTION } from "../../../utils";

export const reactSchema = new Schema<IReaction>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    react: {
        type: Number,
        enum: REACTION,
        default: REACTION.LIKE
    }
}, {
    timestamps: true,
    _id: false
})
