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

        res.status(201).json({ message: 'Message created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all messages
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single message by ID
export const getMessageById = async (req: Request, res: Response) => {
    try {
        const messageId = req.params.id;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a message by ID
export const updateMessage = async (req: Request, res: Response) => {
    try {
        const messageId = req.params.id;
        const { fullname, email, message } = req.body;
        const updatedMessage = await Message.findByIdAndUpdate(messageId, { fullname, email, message }, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json({ message: 'Message updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a message by ID
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const messageId = req.params.id;
        const deletedMessage = await Message.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};



