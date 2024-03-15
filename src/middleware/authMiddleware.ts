import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { UserInterface } from "../models/User";
import Blog from "../models/Blog";
import { blogSchema } from "../utils/validation";
import router from "../routes/blogRoutes";
import { getBlogs } from "../controllers/blogController";

// Authentication middleware function
const jwtSecret = process.env.JWT_SECRET || "Brian";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    console.log("Decoded token:", decoded);
    const user: UserInterface | null = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserInterface | undefined = req.user as UserInterface | undefined;

  if (!user || !user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
  }

  next();
};


