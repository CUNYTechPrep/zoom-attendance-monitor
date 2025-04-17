import 'dotenv/config';

export const validateEnv = () => {
  const requiredVars = ['ZOOM_WEBHOOK_SECRET_TOKEN', 'PORT'];

  return requiredVars.filter((varName) => !process.env[varName]);
};

export default {
  development: {
    username: 'root',
    password: null,
    database: 'zoom-attendance',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  test: {
    username: 'root',
    password: null,
    database: 'zoom-attendance',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: './database.test.sqlite',
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgresql',
  },
  // Add the required vars to the exported config
  ZOOM_WEBHOOK_SECRET_TOKEN: process.env.ZOOM_WEBHOOK_SECRET_TOKEN,
  PORT: process.env.PORT,
};
