import recordingController from './recording.js';
import { Router } from 'express';

const router = Router();

router.use('/recording', recordingController);

export default router;
