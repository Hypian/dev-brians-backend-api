import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import {
  signupSchema,
  loginSchema,
  adminLoginSchema,
} from "../utils/validation";
import Joi from "joi";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error("JWT secret is not defined");
}
// signup ep
export const signup = async (req: Request, res: Response) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}; //login ep
export const login = async (req: Request, res: Response) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//admin login endpoint
export const adminLogin = async (req: Request, res: Response) => {
  try {
    // Validate request body against adminLoginSchema
    const { error } = adminLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Proceed with the login logic
    const { email, password } = req.body;

    // Hardcoded email and password from frontend
    const adminEmail: string = process.env.ADMIN_EMAIL ?? "";
    const adminPassword: string = process.env.ADMIN_PASSCODE ?? "";

    // Check if the provided credentials match the hardcoded ones
    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid email or passcode" });
    }

    // If the credentials are correct, return success message
    res.status(200).json({ message: "Admin login successfull" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
