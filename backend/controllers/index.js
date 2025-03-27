import express from 'express';
import microPostsController from './microPosts.js';
import healthcheckController from './health.js';
import webhookController from './webhook.js';

const router = express.Router();

router.use('/micro_posts', microPostsController);

router.use('/healthcheck', healthcheckController);

router.use('/webhooks', webhookController);

export default router;
