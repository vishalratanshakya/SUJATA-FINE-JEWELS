import { Cart } from "../models/Cart";

export const getCartData = async (userId: string) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
};

export const addItemToCart = async (userId: string, itemData: any) => {
  const { productId, quantity = 1, selectedMetal, selectedSize, price } = itemData;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  const existingItem = cart.items.find((item: any) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity, selectedMetal, selectedSize, price });
  }

  await cart.save();
  return cart;
};

export const removeItemFromCart = async (userId: string, productId: string) => {
  let cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = cart.items.filter((item: any) => item.productId !== productId);
    await cart.save();
  }
  return cart;
};

export const clearUserCart = async (userId: string) => {
  let cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  return cart;
};
