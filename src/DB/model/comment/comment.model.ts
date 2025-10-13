import { model } from "mongoose";
import commentSchema from "./comment.schema";

const Comment = model("Comment", commentSchema);

export default Comment;
