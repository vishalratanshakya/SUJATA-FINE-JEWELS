import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const googleLogin = async (token: string) => {
  if (!token) {
    throw new Error("Google token required");
  }

  const googleResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!googleResponse.ok) {
    throw new Error("Invalid or expired Google access token");
  }

  const payload = await googleResponse.json();

  if (!payload || !payload.email) {
    throw new Error("Invalid Google payload");
  }

  const { email, name, picture, sub } = payload;

  let user = await User.findOne({ googleId: sub });

  if (!user) {
    user = await User.findOne({ email });
  }

  if (!user) {
    user = await User.create({
      name: name || "SUJATA Customer",
      email,
      googleId: sub,
      role: "customer",
      profileImage: picture,
    });
  } else if (!user.googleId) {
    user.googleId = sub;
    if (picture && !user.profileImage) {
      user.profileImage = picture;
    }
    await user.save();
  }

  const jwtSecret = process.env.JWT_SECRET || "sujata_fine_jewels_secret_jwt_key_2026";
  const authToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    jwtSecret,
    { expiresIn: "7d" }
  );

  return {
    token: authToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    }
  };
};
