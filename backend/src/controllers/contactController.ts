import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/apiResponse";
import { Contact } from "../models/Contact";

// POST /api/contact — Submit a contact form message
export const submitContact = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return sendResponse(res, 400, false, "Name, email, and message are required");
  }

  const contact = await Contact.create({ name, email, phone, message });
  sendResponse(res, 201, true, "Your message has been received. Our concierge will contact you shortly.", contact);
});

// GET /api/contact — Admin: Get all contact submissions
export const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  sendResponse(res, 200, true, "Contact submissions retrieved", contacts);
});

// PATCH /api/contact/:id/status — Admin: Update status of a contact
export const updateContactStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["new", "read", "replied"].includes(status)) {
    return sendResponse(res, 400, false, "Invalid status value");
  }

  const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });
  if (!contact) return sendResponse(res, 404, false, "Contact not found");

  sendResponse(res, 200, true, "Status updated", contact);
});

// DELETE /api/contact/:id — Admin: Delete a contact submission
export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) return sendResponse(res, 404, false, "Contact not found");
  sendResponse(res, 200, true, "Contact deleted");
});
