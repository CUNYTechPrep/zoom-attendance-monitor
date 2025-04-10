import express from 'express';
import morgan from 'morgan';
import process from 'node:process';
import path from 'node:path';
import apiRouter from './controllers/index.js';
import { validateEnv } from './config/config.js';  // Import the validator

const app = express();

// Validate environment before proceeding
const missingVars = validateEnv();
if (missingVars.length > 0) {
  console.error('❌ Server cannot start:');
  missingVars.forEach(varName => console.error(`   ${varName} is required`));
  process.exit(1);
}

app.use(express.json());

// add http request logging to help us debug and audit app use
const logFormat = app.get('env') === 'production' ? 'combined' : 'dev';
app.use(morgan(logFormat));

// load our controller routes at /api
app.use('/api', apiRouter);

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(import.meta.dirname, '../frontend/dist')));

  // all unknown routes should be handed to our react app
  app.get('*', function (req, res) {
    res.sendFile(
      path.join(import.meta.dirname, '../frontend/dist', 'index.html')
    );
  });
}

// 404 route
app.use((req, res) => {
  res.status(404);
  res.json({
    error: 'Not Found',
  });
});

// Error route: catches all errors
app.use(function (err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500);
  res.json({
    error: {
      code: err.status || 500,
      message: err.message,
    },
  });
  next();
});

export default app;
