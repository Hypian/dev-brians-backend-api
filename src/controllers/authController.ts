import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/User"; // Assuming User model interface
import {
  signupSchema,
  loginSchema,
  adminLoginSchema,
} from "../utils/validation"; // Assuming validation schema interfaces

dotenv.config();

// Enforce JWT secret presence during runtime
const jwtSecret: Secret = process.env.JWT_SECRET as Secret;

if (!jwtSecret) {
  throw new Error("JWT secret is not defined in environment variables");
}

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
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Return token and success message to the client
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminLogin = async (
  req: Request,
  res: Response,
) => {
  try {
    const { error } = adminLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Find admin user by email
    const existingAdmin = await User.findOne({ email });

    if (!existingAdmin) {
      // Admin user doesn't exist, consider returning an error or throwing an exception
      return res.status(401).json({ message: "Unauthorized" }); // Consider a more informative message
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token with admin flag
    const token = jwt.sign(
      { email, isAdmin: existingAdmin.isAdmin },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    // Return the token with success message (avoid sensitive data)
    res.status(200).json({ message: "Admin login successful", token });
  } catch (err) {
    console.error("Error during admin login:", err);
    res.status(500).json({ message: "Internal server error" }); // Avoid specific error details in response
  }
};
