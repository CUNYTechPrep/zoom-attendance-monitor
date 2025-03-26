import express from 'express';
import microPostsController from './microPosts.js';
import healthcheckController from './health.js';

const router = express.Router();

router.use('/micro_posts', microPostsController);

router.use('/healthcheck', healthcheckController);

export default router;
