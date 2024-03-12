import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import Blog from "../models/Blog";
import { blogSchema } from "../utils/validation";
import router from "../routes/blogRoutes";
import { getBlogs } from "../controllers/blogController";

// Authentication middleware function
const jwtSecret = process.env.JWT_SECRET || "Brian";

export const authenticateToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

// Authorization middleware function
export const authorizeAdmin = (req: Request, res: Response, next: any) => {
  const userRole = req.user.role;
  if (userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
  }
  next();
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    // Check if the authenticated user is an admin
    const user = req.user;
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    // Check if the provided admin email matches the hardcoded one
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || user.email !== adminEmail) {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin email does not match" });
    }

    // Proceed with creating the blog post
    const { title, description } = req.body;
    const newBlog = new Blog({ title, description });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog post created successfully", blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
