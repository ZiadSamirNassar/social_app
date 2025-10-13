import { IAttachments } from "../../utils";

export interface CreateCommentDto {
    content: string;
    attachment?: IAttachments;
}
