import { Router } from 'express';
import healthCheckRouter from './health.js';

const router = Router();

router.use('/healthcheck', healthCheckRouter);

export default router;
