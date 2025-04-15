import os from 'os';
import path from 'node:path';
import fs from 'node:fs';

const currentUser = os.userInfo().username;
let zoomRecordingPath = path.join('/Users', currentUser, 'Documents', 'Zoom');

if (os.platform() === 'win32') {
  zoomRecordingPath = path.join(
    'C:',
    'Users',
    currentUser,
    'Documents',
    'Zoom'
  );
}

zoomRecordingPath = path.resolve(zoomRecordingPath);

if (!fs.existsSync(zoomRecordingPath)) {
  fs.mkdirSync(zoomRecordingPath, { recursive: true });
}

export { zoomRecordingPath };
