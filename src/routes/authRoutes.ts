import express from "express";
import { signup, login, adminLogin } from "../controllers/authController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     tags: [Authentication]
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, missing required parameters or email already exists
 *       500:
 *         description: Internal server error
 */

router.post("/signup", signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     description: Authenticate user credentials and generate a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request, missing required parameters or invalid credentials
 *       500:
 *         description: Internal server error
 */

router.post("/login", login);

/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: Create an admin user
 *     tags: [Authentication]
 *     description: Create a new admin user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin user created successfully
 *       400:
 *         description: Bad request, missing required parameters or email already exists
 *       500:
 *         description: Internal server error
 */

router.post("/admin-login", adminLogin);

export default router;
