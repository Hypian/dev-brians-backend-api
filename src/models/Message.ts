import { Schema, model, Document } from "mongoose";

interface interfacemessage extends Document {
  fullname: string;
  email: string;
  message: string;
}

const MessageSchema = new Schema({
  fullname: String,
  email: String,
  message: String,
});

export default model<interfacemessage>("Message", MessageSchema);
