import { User } from "../models/User";

export const getProfile = async (userId: string) => {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const updateProfileInfo = async (userId: string, data: any) => {
  const { name, phone, profileImage } = data;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (name) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (profileImage) user.profileImage = profileImage;

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    profileImage: user.profileImage,
  };
};

export const getAllCustomers = async () => {
  const customers = await User.aggregate([
    {
      $match: { role: "customer" }
    },
    {
      $lookup: {
        from: "orders",
        let: { userIdString: { $toString: "$_id" } },
        pipeline: [
          { $match: { $expr: { $eq: ["$customerId", "$$userIdString"] } } }
        ],
        as: "orders"
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        phone: 1,
        createdAt: 1,
        totalOrders: { $size: "$orders" },
        totalSpent: {
          $sum: "$orders.totalAmount"
        }
      }
    },
    {
      $sort: { createdAt: -1 }
    }
  ]);

  return customers;
};
