import { model } from "mongoose";
import { schema } from "./token.schma";
import { IToken } from "../../../utils";

export const Token = model<IToken>("Token", schema);