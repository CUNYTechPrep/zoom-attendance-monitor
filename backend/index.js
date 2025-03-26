import app from './app.js';
import { sequelize } from './models/index.js';
import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';

const port = process.env.PORT;

const umzug = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
    resolve: async ({ name, path, context }) => {
      const migration = await import(path);
      return {
        name,
        up: async () => migration.up(context, Sequelize),
        down: async () => migration.down(context, Sequelize),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

sequelize
  .authenticate()
  .then(() => umzug.pending())
  // .then(async (pending) => {
  //   const migrations = await umzug.up();
  // })
  .then(() => {
    app.listen(port, () => {
      console.log('Server is running on port: ' + port);
    });
  })
  .catch((err) => {
    console.log('error starting server:', err);
  });
