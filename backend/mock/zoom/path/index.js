import os from 'os';
import path from 'node:path';

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

export { zoomRecordingPath };
