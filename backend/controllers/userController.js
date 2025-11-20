// controllers/authController.js
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==================== Middleware ====================
export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.id = decoded.userId; // Attach userId to request
    next();
  } catch (error) {
    console.error("JWT verify error:", error.message);
    return res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

// ==================== Register ====================
export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePhoto: gender === "male" ? maleProfile : femaleProfile,
    });

    return res.status(201).json({ success: true, message: "Account created successfully" });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== Login ====================
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: "Incorrect username" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      })
      .json({
        success: true,
        _id: user._id,
        username: user.username,
        profilePhoto: user.profilePhoto,
      });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== Logout ====================
export const logout = (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "Successfully logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== Get Other Users ====================
export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    return res.status(200).json({ success: true, message: otherUsers });

  } catch (error) {
    console.error("GetOtherUsers error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
