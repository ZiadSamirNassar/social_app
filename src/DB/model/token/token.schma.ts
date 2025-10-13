import { Schema } from "mongoose";
import { IToken } from "../../../utils";
import { TOKEN_TYPE } from "../../../utils/common/enums";

export const schema = new Schema<IToken>({
    token: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: Number, enum: TOKEN_TYPE, default: TOKEN_TYPE.ACCESS },
}, {
    timestamps: true,
});
