import { Router } from "express";
import { submitContact, getContacts, updateContactStatus, deleteContact } from "../controllers/contactController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public: submit contact form
router.post("/", submitContact);

// Admin only: view, update, delete
router.get("/", authMiddleware, adminMiddleware, getContacts);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateContactStatus);
router.delete("/:id", authMiddleware, adminMiddleware, deleteContact);

export default router;
