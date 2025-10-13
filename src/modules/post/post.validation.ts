import {z} from "zod"
import {REACTION} from "../../utils"
const attatchementSchema = z.object({
    url: z.string() as unknown as string,
    id: z.string() as unknown as string
})
export const createPostSchema = z.object({
    content: z.string().min(1, "Content is required").max(255, "Content must be at most 255 characters long") as unknown as string,
    attachments: z.array(attatchementSchema).optional()
})

