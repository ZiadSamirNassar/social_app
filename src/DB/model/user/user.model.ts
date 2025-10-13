import { model } from "mongoose";
import { schema } from "./user.schema";
import { IUser } from "../../../utils";

export const User = model<IUser>("User", schema);
