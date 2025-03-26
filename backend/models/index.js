import { readdirSync } from 'node:fs';
import { basename, dirname } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import Sequelize, { DataTypes } from 'sequelize';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configuration = config[process.env.NODE_ENV || 'development'];

const db = {};

// connect to the database
const sequelize = new Sequelize(
  configuration.database,
  configuration.username,
  configuration.password,
  configuration
);

// find all files in ./models/ that end in `.model.js`
const files = readdirSync(__dirname).filter(
  (file) => file.indexOf('.') !== 0 && file !== basename(__filename)
);

// dynamically import and initialize all models
// model.default is the exported default function
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

// call the .associate() method on all models
Object.keys(db).forEach((key) => {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});

export { sequelize };

export default db;
