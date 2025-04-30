import app from './app.js';
import { sequelize } from './models/index.js';
import zoomMockServer from './mock/zoom/index.js';
import { validateEnv } from './config/config.js';

// Validate environment before proceeding
const missingVars = validateEnv();
if (missingVars.length > 0) {
  console.error('❌ Server cannot start:');
  missingVars.forEach((varName) => console.error(`   ${varName} is required`));
  process.exit(1);
}

const port = process.env.PORT;

sequelize
  .authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log('Server is running on port: ' + port);
    });
  })
  .catch((err) => {
    console.log('error starting server:', err);
  });

if (process.env.NODE_ENV === 'development') {
  zoomMockServer.listen(8081, () => {
    console.log('Zoom mock server starting on port: ' + 8081);
  });
}
