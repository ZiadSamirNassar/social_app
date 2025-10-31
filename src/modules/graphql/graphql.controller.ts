import { Router } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./graphql.schema";


export const router = Router();

router.post("/", createHandler({schema}))

export default router; 
