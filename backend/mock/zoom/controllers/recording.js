import { Router } from 'express';
import fs from 'node:fs';
import { zoomRecordingPath } from '../path/index.js';

const router = new Router();

const checkDownloadToken = (req, res, next) => {
  const authHeader = req.get('authorization');

  if (!authHeader || authHeader === '') {
    return res.status(401).json({ message: 'missing or invalid token' });
  }

  next();
};

router.get('/download/:fileId', checkDownloadToken, (req, res) => {
  const id = req.params.fileId;
  if (!id) {
    return res.status(400).json({ message: 'invalid file id' });
  }

  const fileName = Buffer.from(id, 'base64').toString('utf-8');

  const path = `${zoomRecordingPath}/${fileName}`;

  if (!fs.existsSync(path)) {
    return res.status(400).json({ message: 'file does not exist' });
  }

  res.download(path);
});

export default router;
