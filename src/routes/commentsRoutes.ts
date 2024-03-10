import express from "express";
import { addComment, fetchComments } from "../controllers/commentsController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment operations
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   post:
 *     summary: Add a comment to a blog post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id", addComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get all comments for a blog post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post
 *     responses:
 *       200:
 *         description: List of comments on the blog post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", fetchComments);

export default router;
