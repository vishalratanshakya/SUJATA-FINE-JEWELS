import { Router } from "express";
import { getMyJewellery, downloadCertificate } from "../controllers/certificateController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/my-jewellery", getMyJewellery);
router.get("/:id/download", downloadCertificate);

export default router;
