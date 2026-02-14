


import express from 'express';
const router = express.Router();
import { sendMessage, getMessages, deleteMessage, markAsRead } from '../controllers/messageController.js';

router.route('/').post(sendMessage);
router.route('/').get(getMessages);
router.route('/:id').delete(deleteMessage);
router.route('/:id').put(markAsRead);


export default router;