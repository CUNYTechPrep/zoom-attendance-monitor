import express from 'express';
import appRouter from './controllers/index.js';
import { fileWatcher } from './path/watcher.js';

const app = express();

app.use(express.json());

app.get('/healthcheck', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

app.use('/', appRouter);

fileWatcher();

export default app;
