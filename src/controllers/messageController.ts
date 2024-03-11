import { Request, Response } from 'express';
import Message from '../models/Message';
import { contactFormSchema } from '../utils/validation';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { error } = contactFormSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { fullname, email, message } = req.body;
        const newMessage = new Message({ fullname, email, message });
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};



