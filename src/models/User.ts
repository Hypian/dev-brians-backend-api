import { Schema, model, Document } from 'mongoose';

interface interfaceuser extends Document {
    email: string;
    password: string;
}

const UserSchema = new Schema({
    email: String,
    password: String,
});

export default model<interfaceuser>('User', UserSchema);
