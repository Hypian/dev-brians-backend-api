import { Request, Response } from "express";
import Blog, { IBlog } from "../models/Blog";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, description, comments, likes } = req.body;
    const newBlog: IBlog = new Blog({ title, description, comments, likes });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog post created successfully", blog: newBlog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs: IBlog[] = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const blog: IBlog | null = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    // No admin check required (anyone can delete)

    const deletedBlog: IBlog | null = await Blog.findByIdAndDelete(
      req.params.id
    );
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editBlog = async (req: Request, res: Response) => {
  try {
    const { title, description, likes, comments } = req.body;
    const updatedFields: Partial<IBlog> = {
      title,
      description,
      likes,
      comments,
    };
    const editedBlog: IBlog | null = await Blog.findByIdAndUpdate(
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
