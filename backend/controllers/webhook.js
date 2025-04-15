import { Router } from 'express';
import { hashZoomPlainToken } from '../service/webhook.js';
import {
  WEBHOOK_VALIDATION,
  WEBHOOK_MEETING_ENDED,
  WEBHOOK_MEETING_STARTED,
  WEBHOOK_PARTICIPANT_JOINED,
  WEBHOOK_PARTICIPANT_JOINED_BH,
} from '../service/events.js';

const router = Router();

router.post('/', (req, res) => {
  const { event } = req.body;

  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.ZOOM_WEBHOOK_SECRET_TOKEN);
    console.log('headers:', req.headers);
    console.log('body:', req.body);
  }

  switch (event) {
    case WEBHOOK_VALIDATION: {
      const plainToken = req.body.payload.plainToken;

      const encryptedToken = hashZoomPlainToken(
        plainToken,
        process.env.ZOOM_WEBHOOK_SECRET_TOKEN
      );

      return res.status(200).json({ plainToken, encryptedToken });
    }
    case WEBHOOK_MEETING_ENDED: {
      const meetingName = req.body.payload.object.topic;
      const timeEnded = req.body.payload.object.end_time;

      console.log(`Meeting ${meetingName} ended at ${timeEnded}`);
      return res.status(200).json({ message: 'Meeting has ended.' });
    }
    case WEBHOOK_MEETING_STARTED: {
      const meetingName = req.body.payload.object.topic;
      const timeStarted = req.body.payload.object.start_time;

      console.log(`Meeting ${meetingName} started at ${timeStarted}`);
      return res.status(201).json({ message: 'Meeting has started.' });
    }
    case WEBHOOK_PARTICIPANT_JOINED: {
      const { topic, participant } = req.body.payload.object;
      console.log(
        `${participant.participant_uuid} - ${participant.user_name} joined ${topic} at ${participant.join_time}`
      );

      const participantInfo = {
        participant_id: participant.participant_uuid,
        participant_name: participant.user_name,
        join_time: participant.join_time,
      };

      return res.status(200).json(participantInfo);
    }
    case WEBHOOK_PARTICIPANT_JOINED_BH: {
      const { participant, topic } = req.body.payload.object;
      console.log(
        `${participant.id} - ${participant.user_name} joined ${topic} at ${participant.date_time}`
      );

      const participantInfo = {
        participant_id: participant.participant_uuid,
        participant_name: participant.user_name,
        join_time: participant.join_time,
      };

      return res.status(200).json(participantInfo);
    }

    default:
      console.log(`no match found for event ${event}`);
      return res.status(200).end();
  }
});

export default router;
