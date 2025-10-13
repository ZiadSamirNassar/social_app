import { Schema } from "mongoose";
import { IComment } from "../../../utils";
import { reactSchema, attachmentSchema } from "../common"

const commentSchema = new Schema<IComment>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false
    },
    content: {
        type: String,
        required: true
    },
    reactions: {
        type: [reactSchema],
        ref: "Reaction",
        required: false
    },
    attachment: {
        type: attachmentSchema,
        ref: "Attachment",
        required: false
    }
},
{timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}}
)

commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId"
})

commentSchema.pre("deleteOne", async function(next) {

    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};

    const replies = await this.model.find({parentId: filter._id});

    if( replies.length > 0 ) {
        for(const reply of replies){
            await this.model.deleteOne({ _id: reply._id });
        }
    }
    
    next();
})

export default commentSchema;
