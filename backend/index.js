import app from './app.js';
import db from './models/index.js';

const port = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log('Server is running on port: ' + port);
    });
  })
  .catch((err) => {
    console.log('error connecting to the database:', err);
  });
