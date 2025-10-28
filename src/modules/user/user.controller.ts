import userService from "./user.service";
import { Router } from "express";
import { isAuthenticated } from "../../middleware";

const router = Router();

router.get("/profile", isAuthenticated, userService.profile);

export default router;