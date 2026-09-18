import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/apiResponse";
import { getAddressesForUser, addAddressForUser, updateAddressForUser, deleteAddressForUser, setDefaultAddressForUser } from "../services/addressService";

export const getAddresses = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const addresses = await getAddressesForUser(userId);
  sendResponse(res, 200, true, "Addresses retrieved", addresses);
});

export const addAddress = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const address = await addAddressForUser(userId, req.body);
  sendResponse(res, 201, true, "Address added", address);
});

export const updateAddress = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const address = await updateAddressForUser(userId, id, req.body);
    sendResponse(res, 200, true, "Address updated", address);
  } catch (error: any) {
    if (error.message === "Address not found") {
      return sendResponse(res, 404, false, error.message);
    }
    throw error;
  }
});

export const deleteAddress = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    await deleteAddressForUser(userId, id);
    sendResponse(res, 200, true, "Address deleted");
  } catch (error: any) {
    if (error.message === "Address not found") {
      return sendResponse(res, 404, false, error.message);
    }
    throw error;
  }
});

export const setDefaultAddress = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const address = await setDefaultAddressForUser(userId, id);
    sendResponse(res, 200, true, "Default address updated", address);
  } catch (error: any) {
    if (error.message === "Address not found") {
      return sendResponse(res, 404, false, error.message);
    }
    throw error;
  }
});
