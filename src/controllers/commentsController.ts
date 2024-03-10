import { Request, Response } from 'express';
import Blog from '../models/Blog';

/**
 * Add a comment to a blog post
 * @param req Request object
 * @param res Response object
 */
interface AuthRequest extends Request {
    user?: any; // Define the user property
}


export const addComment = async (req: AuthRequest, res: Response) => {
    try {
        const blogId = req.params.id;
        const { text } = req.body;
        const userEmail = req.user.email;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        blog.comments.push({ text, user: userEmail });
        await blog.save();

        res.status(201).json({ message: 'Comment added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get all comments for a blog post
 * @param req Request object
 * @param res Response object
 */
export const fetchComments = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        const comments = blog.comments;
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
