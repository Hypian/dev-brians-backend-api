import { Request, Response } from "express";
import Blog from "../models/Blog";

interface AuthRequest extends Request {
  user?: any; // Define the user property
}

export const likeBlog = async (req: AuthRequest, res: Response) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blog.likes) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    blog.likes = true;
    await blog.save();

    res.json({ message: "Blog post liked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLikes = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const likes = blog.likes ? 1 : 0;
    res.json({ likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
