import { Certificate } from "../models/Certificate";
import { Order } from "../models/Order";

export const getUserJewelleryWithCertificates = async (userId: string) => {
  const orders = await Order.find({ customerId: userId });
  let jewellery: any[] = [];
  
  for (const order of orders) {
    for (const item of order.items) {
      let cert = await Certificate.findOne({ orderId: order.orderId, productName: item.productName });
      
      if (!cert) {
        cert = await Certificate.create({
          certificateId: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
          orderId: order.orderId,
          productName: item.productName,
          metalPurity: "18K Gold",
          grossWeight: "5.5g",
          netWeight: "4.8g",
          diamondDetails: "VVS/FG",
          issueDate: new Date().toISOString()
        });
      }
      
      jewellery.push({
        id: item.productId,
        orderId: order.orderId,
        name: item.productName,
        date: order.createdAt,
        image: item.image,
        metal: cert.metalPurity,
        stone: cert.diamondDetails,
        slug: item.productId,
        certificate: {
          certId: cert.certificateId,
          orderId: order.orderId,
          customerId: userId,
          customerName: order.customerName,
          productName: item.productName,
          productImage: item.image,
          sku: item.productId,
          jewelleryType: "Fine Jewellery",
          metalType: "Gold",
          metalPurity: cert.metalPurity,
          grossWeight: cert.grossWeight,
          netWeight: cert.netWeight,
          gemstoneDetails: cert.diamondDetails,
          purchaseDate: new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          certificationDate: new Date(cert.issueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          pdfUrl: `/api/certificates/${cert.certificateId}/download`
        }
      });
    }
  }
  
  return jewellery;
};

export const getCertificateDetails = async (certificateId: string) => {
  const cert = await Certificate.findOne({ certificateId });
  if (!cert) {
    throw new Error("Certificate not found");
  }
  return cert;
};
