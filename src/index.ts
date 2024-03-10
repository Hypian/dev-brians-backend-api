import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import likeRoutes from "./routes/likesRoutes";
import commentRoutes from "./routes/commentsRoutes";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import messageRoutes from "./routes/contactFormRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { contactFormSchema } from "./utils/validation";
import contactFormRoutes from "./routes/contactFormRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/messages", contactFormRoutes);
app.use("/api/users", userRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for your application.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("MongoDB URI is not defined");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
  });
