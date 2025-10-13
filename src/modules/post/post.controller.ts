import { Router } from "express";
import { isAuthenticated, isValid } from "../../middleware";
import postService from "./post.service";
import { createPostSchema } from "./post.validation";
import { reactSchema } from "../../utils";
import commentRouter from "../comment/comment.controller";

const router = Router();

router.use("/:postId/comment", commentRouter)

router.post("/", isAuthenticated, isValid(createPostSchema), postService.create)
router.patch("/:id", isAuthenticated, isValid(reactSchema), postService.react)
router.get("/:id", isAuthenticated, postService.getSpecific)
router.delete("/:id", isAuthenticated, postService.deletePost)

export default router