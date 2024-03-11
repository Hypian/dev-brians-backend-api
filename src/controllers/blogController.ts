import { Request, Response } from "express";
import Blog from "../models/Blog";
import { blogSchema } from "../utils/validation";
// Create Blog Post
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, description, author, date } = req.body;
    const newBlog = new Blog({ title, description});
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog post created successfully", blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve Blog Posts
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve Single Blog Post
export const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Blog Post
export const editBlog = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const updatedFields: any = { title, description };
    const editedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    if (!editedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post updated successfully", blog: editedBlog });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Blog Post
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
