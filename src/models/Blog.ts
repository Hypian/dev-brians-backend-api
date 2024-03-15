import { array } from "joi";
import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  likes: boolean;
  comments: Comment[];
}

const blogSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Boolean, default: false },
  comments: [{ type: String, required: true }],
});

export default mongoose.model<IBlog>("Blog", blogSchema);

export interface Comment {
  text: string;
  user: string;
}

interface BlogDocument extends Document {
  // Other fields in your Blog model
  comments: Comment[];
}

const BlogSchema = new Schema({
  // Define other fields in your Blog schema
  comments: [{ text: String, user: String }],
});

