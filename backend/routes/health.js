import { Router } from 'express';
import { healthcheck } from '../controllers/health.js';

const router = Router();

router.get('/', healthcheck);

export default router;
