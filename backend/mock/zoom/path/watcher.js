import fs from 'node:fs/promises';
import { zoomRecordingPath } from './index.js';
import { setTimeout } from 'node:timers/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export const fileWatcher = async () => {
  const watcher = await fs.watch(zoomRecordingPath);
  console.log(`starting file watcher on ${zoomRecordingPath}`);

  for await (const event of watcher) {
    const { filename, eventType } = event;
    if (!filename || filename === '.DS_Store') {
      continue;
    }

    console.log(`event type: ${eventType}`);

    const dir = path.resolve(zoomRecordingPath, filename);

    console.log(`watching the path ${dir}`);
    watchDir(dir);
  }
};

const watchDir = async (dir) => {
  let audioFile = '';
  let videoFile = '';
  const parent = path.basename(dir);

  while (!audioFile || !videoFile) {
    const files = await fs.readdir(dir);

    if (!videoFile) {
      const mp4 = files.find((f) => f.endsWith('.mp4'));
      if (mp4) {
        videoFile = path.join(parent, mp4);
      }
    }

    if (!audioFile) {
      const m4a = files.find((f) => f.endsWith('.m4a'));
      if (m4a) {
        audioFile = path.join(parent, m4a);
      }
    }

    await setTimeout(1000);
  }

  sendWebHook(audioFile, videoFile);
};

const sendWebHook = (...filePaths) => {
  const fileObject = (filePath) => {
    const pathFileHash = Buffer.from(filePath).toString('base64');
    const fileExt = path.extname(filePath);

    return {
      id: randomUUID(),
      meeting_id: randomUUID(),
      recording_start: Date.now(),
      recording_end: Date.now(),
      recording_type:
        fileExt === '.m4a' ? 'audio_only' : 'shared_screen_with_speaker_view',
      file_type: fileExt === '.m4a' ? 'M4A' : 'MP4',
      file_size: 0,
      file_extension: fileExt === '.m4a' ? 'M4A' : 'MP4',
      play_url: `http://localhost:8081/recording/play/${pathFileHash}`,
      download_url: `http://localhost:8081/recording/download/${pathFileHash}`,
      status: 'completed',
    };
  };

  const recording_files = filePaths.map((filePath) => fileObject(filePath));

  const request = {
    event: 'recording.completed',
    event_ts: Date.now(),
    payload: {
      account_id: randomUUID(),
      object: {
        id: 0,
        uuid: randomUUID(),
        host_id: randomUUID(),
        topic: path.dirname(filePaths[0]),
        type: 4,
        start_time: Date.now(),
        host_email: 'mocked@email.com',
        recording_files,
      },
    },
  };

  fetch('http://localhost:8080/api/webhook', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      console.error('received error status code:', res.status);
    }
  });
};
