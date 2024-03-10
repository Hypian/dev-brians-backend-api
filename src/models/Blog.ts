import { Schema, model, Document } from 'mongoose';

interface adblog extends Document {
        title: string;
        text: string;
        likes: string[];
        comments: Array<{ text: string; user: string }>;
}

const BlogSchema = new Schema({
    title: String,
    text: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    comments: [{ text: String, user: { type: Schema.Types.ObjectId, ref: 'User' } }],
});

export default model<adblog>('Blog', BlogSchema);
