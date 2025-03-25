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
    username: 'root',
    password: null,
    database: 'zoom-attendance',
    host: '127.0.0.1',
    dialect: 'postgresql',
  },
};
