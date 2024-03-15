// user.model.ts

import { Schema, model, Document } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  password: string;
  isAdmin: boolean; // Add isAdmin property
}

const UserSchema = new Schema<UserInterface>({
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false }, // Default isAdmin to false
});

export default model<UserInterface>("User", UserSchema);
