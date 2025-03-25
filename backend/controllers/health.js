import db from '../models/index.js';

export const healthcheck = async (req, res) => {
  await db.sequelize.authenticate();
  res.status(200).send({ message: 'ok' });
};
