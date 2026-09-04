export interface CertificateData {
  certId: string; // e.g. SJ-CERT-000184
  orderId: string; // e.g. SJ10018
  productId: string;
  customerId: string;
  customerName: string;
  productName: string;
  productImage: string;
  jewelleryType: string;
  metalType: string;
  metalPurity: string;
  grossWeight: string;
  netWeight: string;
  gemstoneDetails: string;
  sku: string;
  purchaseDate: string;
  certificationDate: string;
  status: "Pending" | "Generated" | "Issued" | "Revoked";
}

export const INITIAL_CERTIFICATES: CertificateData[] = [
  {
    certId: "SJ-CERT-000184",
    orderId: "SJ10018",
    productId: "prod-2",
    customerId: "USER_456",
    customerName: "Aanya Sharma",
    productName: "Celestial Drop Pendant",
    productImage: "/images/products/necklaces/necklace_placeholder.jpg",
    jewelleryType: "Pendant",
    metalType: "18K Rose Gold",
    metalPurity: "750",
    grossWeight: "8.42 g",
    netWeight: "7.95 g",
    gemstoneDetails: "Natural Lab-Grown Diamond (0.47 ct, VVS1 / E-F)",
    sku: "SKU-SJ-88219",
    purchaseDate: "12 May 2026",
    certificationDate: "13 May 2026",
    status: "Issued",
  },
  {
    certId: "SJ-CERT-000185",
    orderId: "SJ10016",
    productId: "prod-1",
    customerId: "USER_456",
    customerName: "Aanya Sharma",
    productName: "Luxe Solitaire Ring",
    productImage: "/images/products/rings/ring_placeholder.jpg",
    jewelleryType: "Ring",
    metalType: "18K Yellow Gold",
    metalPurity: "750",
    grossWeight: "5.10 g",
    netWeight: "4.80 g",
    gemstoneDetails: "Natural Solitaire Diamond (0.85 ct, VS1 / F)",
    sku: "SKU-SJ-10928",
    purchaseDate: "01 May 2026",
    certificationDate: "02 May 2026",
    status: "Issued",
  },
  {
    certId: "SJ-CERT-000186",
    orderId: "SJ10017",
    productId: "prod-3",
    customerId: "USER_456",
    customerName: "Aanya Sharma",
    productName: "Eternal Bloom Studs",
    productImage: "/images/products/earrings/earrings_placeholder.jpg",
    jewelleryType: "Earrings",
    metalType: "18K White Gold",
    metalPurity: "750",
    grossWeight: "6.20 g",
    netWeight: "5.90 g",
    gemstoneDetails: "Round Brilliant Diamonds (0.60 ct, VVS2 / G)",
    sku: "SKU-SJ-55412",
    purchaseDate: "08 May 2026",
    certificationDate: "09 May 2026",
    status: "Generated",
  },
];
