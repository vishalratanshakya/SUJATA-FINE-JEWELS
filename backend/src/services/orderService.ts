import { Order } from "../models/Order";
import { Cart } from "../models/Cart";
import { User } from "../models/User";
import { Coupon } from "../models/Coupon";

const generateOrderId = () => `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

export const createOrder = async (userId: string, data: any) => {
  const { items, totalAmount, shippingAddress, paymentMethod, couponCode, discountAmount } = data;

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (!items || items.length === 0) {
    throw new Error("Order must have at least one item");
  }

  // If coupon applied, increment usedCount
  if (couponCode) {
    await Coupon.findOneAndUpdate(
      { code: couponCode.toUpperCase().trim() },
      { $inc: { usedCount: 1 } }
    );
  }

  const finalAmount = discountAmount ? Math.max(0, totalAmount - discountAmount) : totalAmount;

  const order = await Order.create({
    orderId: generateOrderId(),
    customerId: userId,
    customerName: user.name,
    customerEmail: user.email,
    items,
    totalAmount: finalAmount,
    shippingAddress,
    status: "PENDING",
    paymentMethod: paymentMethod || "COD",
    couponCode: couponCode || undefined,
    discountAmount: discountAmount || 0,
  });

  // Clear cart after successful order
  await Cart.findOneAndUpdate({ userId }, { items: [] });

  return order;
};


export const getUserOrders = async (userId: string) => {
  return await Order.find({ customerId: userId }).sort({ createdAt: -1 });
};

export const getOrderDetails = async (userId: string, orderId: string) => {
  const order = await Order.findOne({ _id: orderId, customerId: userId });
  if (!order) throw new Error("Order not found");
  return order;
};
