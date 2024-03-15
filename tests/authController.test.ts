jest.mock("dotenv"); // Mock environment variables
jest.mock("../models/User"); // Mock User model

import { signup, login, adminLogin } from "../src/controllers/authController";
import { NextFunction, Request, Response } from "express";
import User from "../src/models/User";
import * as bcrypt from "bcrypt"; // Mock bcrypt
import * as jwt from "jsonwebtoken"; // Mock jwt
import { loginSchema, signupSchema } from "../src/utils/validation";

const mockUser = {
  email: "test@example.com",
  password: "hashedPassword",
  _id: "123",
  isAdmin: true, // Add isAdmin property for admin user
}; // Mock user object

// Mock functions for User.findOne and bcrypt.compare
(User.findOne as jest.Mock).mockImplementation((query) => {
  if (query.email === "test@example.com") {
    return Promise.resolve(mockUser);
  } else {
    return Promise.resolve(null);
  }
});
(bcrypt.compare as jest.Mock).mockResolvedValue(true);

describe("signup function", () => {
  // ... Existing signup tests ...

  it("should return 400 for missing email in request body", async () => {
    const req = { body: { password: "validpassword" } } as Request;
    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400); // Verify bad request response
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) }) // Check for error message
    );
  });

  // Add tests for other validation errors and database errors
});

describe("login function", () => {
  // ... Existing login tests with error handling for invalid credentials ...

  it("should verify isAdmin property for successful admin login", async () => {
    const req = {
      body: { email: "test@example.com", password: "validpassword" },
    } as Request;
    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;

    loginSchema.validate = jest.fn().mockReturnValue({ error: null });

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "validpassword",
      mockUser.password
    );
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Login successful" })
    );
  });
});

describe("adminLogin function", () => {
  it("should login an admin user with valid credentials", async () => {
    const req = {
      body: { email: "test@example.com", password: "validpassword" },
    } as Request;
    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;

    loginSchema.validate = jest.fn().mockReturnValue({ error: null });

    await adminLogin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "validpassword",
      mockUser.password
    );
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Login successful" })
    );
  });

  it("should return 401 for non-admin users", async () => {
    mockUser.isAdmin = false; // Modify mock user to be non-admin

    const req = {
      body: { email: "test@example.com", password: "validpassword" },
    } as Request;
    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;

    loginSchema.validate = jest.fn().mockReturnValue({ error: null });

    await adminLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Unauthorized" }) // Missing text added here
    );
  });

  // Add other test cases for adminLogin, including invalid credentials and missing JWT secret
});
