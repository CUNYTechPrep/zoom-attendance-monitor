import { sequelize } from '../models/index.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  await sequelize.authenticate();
  res.status(200).send({ message: 'ok' });
});

export default router;
