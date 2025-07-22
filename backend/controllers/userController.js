import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !password || !username || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password do not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "all ready exist user try different username" });
    }
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      username,
      password: hashPassword,
      profilePhoto:gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res.status(201).json({
      message: "account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("error", error);
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "all fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "incorrect username" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ message: "incorrect password", success: false });
    }
    const tokenData = {
      userId: user?._id
    };
    const secretKey = process.env.JWT_SECRET
    const token = await jwt.sign(tokenData,secretKey, {
      expiresIn: "1d"});
      return res.status(200).cookie("token",token,{ maxAge:1*24*60*60*1000, httpOnly:true,sameSite:'strict' }).json({
      _id: user?._id,
      profilePhoto:user.profilePhoto,
      username:user?.username,success:true
      });
  } catch (err) {
    console.log("error", err);
  }
};
export const logout= (_,res)=>{
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({message: "successfully logout"})
  } catch (error) {
    console.log("error",error)
  }
}
export const getOtherUsers= async (req,res) => {
  try {
    const loggedInUserId = req?.id;
    
    const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    
    return res.status(200).json({message:otherUsers});
    
  } catch (error) {
    console.log("error",error);
  }
}