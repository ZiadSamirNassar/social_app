import { z } from "zod";
import { REACTION } from "../enums";

export const reactSchema = z.object({
    react: z.enum(REACTION).optional()
})