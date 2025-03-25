import express from 'express';
import appRoutes from './routes/index.js';

const app = express();

app.use(express.json());

app.use(express.static('../frontend/dist'));

app.use('/api', appRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, _next) => {
  console.log('there was an err', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
