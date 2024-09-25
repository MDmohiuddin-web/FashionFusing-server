import validator from "validator";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/UserModels.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "6h" });
};

// route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({
        success: true,
        message: "User logged in successfully",  
        token,
      }); 
    } 
    else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//   route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters ",
        });
    }
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    // save user to database
    const user = await newUser.save();
    const token = createToken(user._id);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//   route for admin login
const adminLogin = async (req, res) => {
  // TODO: Implement admin login logic
  res.status(501).json({ message: "Admin login not implemented" });
};

// route for user logout
const logoutUser = async (req, res) => {
  // TODO: Implement user logout logic
  res.status(501).json({ message: "User logout not implemented" });
};

export { loginUser, registerUser, adminLogin, logoutUser };
