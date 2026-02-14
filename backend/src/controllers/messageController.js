import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};

export const deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: 'تم حذف الرسالة بنجاح' });
};

export const markAsRead = async (req, res) => {
  const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  res.json(message);
};