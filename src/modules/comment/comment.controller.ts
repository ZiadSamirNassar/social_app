import { Router } from "express";
import { isAuthenticated, isValid } from "../../middleware";
import { createCommentSchema } from "./comment.validation";
import { reactSchema } from "../../utils";
import CommentService from "./comment.service";

const router = Router( { mergeParams: true } );

router.post("{/:id}",  isAuthenticated, isValid(createCommentSchema), CommentService.create)
router.get("/:id", isAuthenticated, CommentService.getSpecific)
router.delete("/:id", isAuthenticated, CommentService.deleteComment)
router.patch("/:id", isAuthenticated, isValid(reactSchema), CommentService.react)

export default router;
