import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import { OrderModel } from "@/models/Order";
import { CertificateModel } from "@/models/Certificate";
import { FEATURED_PRODUCTS } from "@/data/mockData";
import { INITIAL_CERTIFICATES } from "@/data/certificates";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Seed Products
    await ProductModel.deleteMany({});
    const dbProducts = await ProductModel.insertMany(FEATURED_PRODUCTS);

    // 2. Seed Certificates
    await CertificateModel.deleteMany({});
    const dbCerts = await CertificateModel.insertMany(INITIAL_CERTIFICATES);

    // 3. Seed Initial Orders
    await OrderModel.deleteMany({});
    const initialOrders = [
      {
        orderId: "SJ10018",
        customerId: "USER_456",
        customerName: "Aanya Sharma",
        customerEmail: "aanya.sharma@email.com",
        items: [
          {
            productId: "prod-2",
            productName: "Celestial Drop Pendant",
            price: 42000,
            quantity: 1,
            image: "/images/products/necklaces/necklace_placeholder.jpg",
          },
        ],
        totalAmount: 42000,
        status: "DELIVERED",
        shippingAddress: {
          title: "HOME",
          name: "Aanya Sharma",
          line1: "12, Green Avenue, South Extension",
          line2: "New Delhi - 110049",
          phone: "+91 98765 43210",
        },
      },
      {
        orderId: "SJ10017",
        customerId: "USER_456",
        customerName: "Aanya Sharma",
        customerEmail: "aanya.sharma@email.com",
        items: [
          {
            productId: "prod-3",
            productName: "Eternal Bloom Studs",
            price: 68000,
            quantity: 1,
            image: "/images/products/earrings/earrings_placeholder.jpg",
          },
        ],
        totalAmount: 68000,
        status: "DELIVERED",
        shippingAddress: {
          title: "HOME",
          name: "Aanya Sharma",
          line1: "12, Green Avenue, South Extension",
          line2: "New Delhi - 110049",
          phone: "+91 98765 43210",
        },
      },
    ];
    const dbOrders = await OrderModel.insertMany(initialOrders);

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully into MongoDB Atlas (sujatafinejewels)!",
      counts: {
        products: dbProducts.length,
        certificates: dbCerts.length,
        orders: dbOrders.length,
      },
    });
  } catch (error: any) {
    console.error("Database seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error.stack || error.message || error) },
      { status: 500 }
    );
  }
}
