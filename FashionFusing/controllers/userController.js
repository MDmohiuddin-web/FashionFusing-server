
import validator from "validator";
import userModel from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'3d'})

}

// route for user login
const loginUser = async (req, res) => {
  // res.json({ message: "User logged in successfully" });

  
};

//   route for user registration
const registerUser = async (req, res) => {
  // res.json({ message: "User registered successfully" });

  try {
    const { name, email, password } = req.body;
    // checking for existing user
    const existingUser = await userModel.findOne({email})
    if (existingUser) {
      return res.json({success:false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({success:false, message: "Invalid email address" });
    }
    if(password.length < 8){
      return res.json({success:false, message: "Password must be at least 8 characters " });
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
    res.json({success:true, message: "User registered successfully" });
    console.log(user);
    const token = createToken(user._id);
    res.json({success:true, token});


    
  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//   route for admin login

const adminLogin = async (req, res) => {
  // res.json({ message: "Admin login successful" });

  
};

// route for user logout

export { loginUser, registerUser, adminLogin };
