import { type Request, type Response, type NextFunction, Router } from "express";
import {authService} from "./auth.service";
import { isValid, isAuthenticated } from "../../middleware";
import { registerSchema, loginSchema, verifyAccountSchema, sendOtpSchema, googleLoginSchema, resetPasswordSchema } from "./auth.validation";

const router = Router();

router.post("/register", isValid(registerSchema), authService.register)
router.post("/login", isValid(loginSchema), authService.login)
router.post("/google-login", isValid(googleLoginSchema), authService.googleLogin)
router.post("/send-otp", isValid(sendOtpSchema), authService.sendOtp)
router.post("/verify-account", isValid(verifyAccountSchema), authService.verifyAccount)
router.post("/reset-password", isValid(resetPasswordSchema), authService.resetPassword)
router.post("/logout", isAuthenticated, authService.logout)

export default router;