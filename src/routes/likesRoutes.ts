import express from 'express';
import { likeBlog, getLikes } from '../controllers/likesController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like operations
 */

/**
 * @swagger
 * /api/likes/{id}:
 *   post:
 *     summary: Like a blog post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to like
 *     responses:
 *       200:
 *         description: Blog post liked successfully
 *       400:
 *         description: Bad request, user already liked the post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id', likeBlog);

/**
 * @swagger
 * /api/likes/{id}:
 *   get:
 *     summary: Get all likes for a blog post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post
 *     responses:
 *       200:
 *         description: List of users who liked the blog post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getLikes);

export default router;
