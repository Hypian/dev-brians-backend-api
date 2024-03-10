import express from 'express';
import { getUsers } from '../controllers/userController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User operations
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */

router.get('/', authenticateToken, authorizeAdmin, getUsers);

export default router;
