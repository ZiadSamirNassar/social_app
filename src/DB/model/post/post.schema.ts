import {Schema} from "mongoose";
import { IPost } from "../../../utils";
import { reactSchema, attachmentSchema } from "../common";
import Comment from "../comment/comment.model";

export const postSchema = new Schema<IPost>({
    
     userId: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true
     },
     
     content: {
         type: String,
         required: function() {
             return this.attachments.length === 0;
         },
         trim: true,
     },

     reactions: [reactSchema],

     attachments: [attachmentSchema]
}, 
{timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}})

postSchema.virtual("Comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId"
})


postSchema.pre("deleteOne", async function(next) {

    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};

    await Comment.deleteMany({postId: filter._id});
    console.log("deleted");
    next();
});

