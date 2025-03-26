import 'dotenv/config';

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
};
