import { Router } from "express";
import { googleAuthCallback, adminLogin } from "../controllers/authController";

const router = Router();

router.post("/google/callback", googleAuthCallback);
router.post("/admin-login", adminLogin);

export default router;
