import { array } from "joi";
import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  likes: number;
  comments: Comment[];
}

const blogSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Boolean, default: false },
  comments: [{ type: String, required: true }],
});

export default mongoose.model<IBlog>("Blog", blogSchema);
