import { Router } from "express";
import { googleAuthCallback } from "../controllers/authController";

const router = Router();

router.post("/google/callback", googleAuthCallback);

export default router;
