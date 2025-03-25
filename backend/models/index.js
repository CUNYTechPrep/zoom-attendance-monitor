import { readdirSync } from 'fs';
import { basename, dirname } from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import config from '../config/config.js';

const configuration = config[process.env.NODE_ENV || 'development'];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = {};
const sequelize = new Sequelize(
  configuration.database,
  configuration.username,
  configuration.password,
  configuration
);

const files = readdirSync(__dirname).filter(
  (file) =>
    file.indexOf('.') !== 0 &&
    file !== basename(__filename) &&
    file.slice(-3) === '.js'
);

(async () => {
  await Promise.all(
    files.map(async (file) => {
      const model = await import(`./${file}`);
      if (!model.default) {
        return;
      }

      const namedModel = model.default(sequelize, DataTypes);
      db[namedModel.name] = namedModel;
    })
  );
})();

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
