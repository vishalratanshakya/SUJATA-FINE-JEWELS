import { Wishlist } from "../models/Wishlist";

export const getWishlistData = async (userId: string) => {
  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, productIds: [] });
  }
  return wishlist;
};

export const toggleProductInWishlist = async (userId: string, productId: string) => {
  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, productIds: [] });
  }

  const index = wishlist.productIds.indexOf(productId);
  if (index > -1) {
    wishlist.productIds.splice(index, 1);
  } else {
    wishlist.productIds.push(productId);
  }

  await wishlist.save();
  return wishlist;
};
