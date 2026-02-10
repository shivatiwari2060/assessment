import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AuthModel from "../model/Authentication.js";

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await AuthModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ sucess: false, message: "User already exists" });
    }

    const user = new AuthModel({ name, email, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(201).json({
      data: user,
      sucess: true,
      token: token,
      message: "User Registered Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const userExist = await AuthModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    const isPassswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPassswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    return res.status(201).json({
      success: true,
      message: "Login Successful",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export default { register, login };
