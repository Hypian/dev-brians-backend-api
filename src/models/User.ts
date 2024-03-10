import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
}

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

export default model<IUser>('User', UserSchema);
