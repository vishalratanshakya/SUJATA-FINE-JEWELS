import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/apiResponse";
import { getUserJewelleryWithCertificates, getCertificateDetails } from "../services/certificateService";

export const getMyJewellery = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.id;
  const jewellery = await getUserJewelleryWithCertificates(userId);
  sendResponse(res, 200, true, "Jewellery retrieved", jewellery);
});

export const downloadCertificate = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const cert = await getCertificateDetails(id);
    res.setHeader('Content-disposition', `attachment; filename=${id}.txt`);
    res.setHeader('Content-type', 'text/plain');
    res.send(`SUJATA FINE JEWELS - CERTIFICATE OF AUTHENTICITY\n\nCertificate ID: ${cert.certificateId}\nOrder ID: ${cert.orderId}\nProduct: ${cert.productName}\nMetal: ${cert.metalPurity}\nGross Weight: ${cert.grossWeight}\nNet Weight: ${cert.netWeight}\nDiamond Details: ${cert.diamondDetails}\nIssue Date: ${cert.issueDate}\n\nThis certifies that the jewellery item described above is authentic and crafted with the highest quality standards.`);
  } catch (error: any) {
    if (error.message === "Certificate not found") {
      return sendResponse(res, 404, false, error.message);
    }
    throw error;
  }
});
