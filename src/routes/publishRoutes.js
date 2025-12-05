import express from 'express';
import { publishMessage } from '../controllers/publishController.js';

const router = express.Router();

router.post('/publish', publishMessage);

export default router;