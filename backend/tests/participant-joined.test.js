import request from 'supertest';
import app from '../app';
import { WEBHOOK_PARTICIPANT_JOINED} from '../service/events.js';
import { WEBHOOK_PARTICIPANT_JOINED_BH} from '../service/events.js';


const participantJoined = {
    "account_id": "AAAAAABBBB",
    "object": {
      "participant": {
        "user_id": "1234567890",
        "user_name": "Jill Chill",
        "email": "jchill@example.com",
        "phone_number": "8615250064084"
      }
    }
};
const participantJoinedBeforeHost =   {
    "account_id": "AAAAAABBBB",
    "object": {
      "participant": {
        "user_id": "1234567890",
        "user_name": "Jill Chill",
        "email": "jchill@example.com",
        "phone_number": "8615250064084"
      }
  }};


async function handleRequest(userData, eventToTrigger, expectedReturnValue){

    const response = await request(app)
      .post('/api/webhook')
      .send({
        event: eventToTrigger,
        payload: {
          ...userData,
        },
      })

      const parsedRes = await JSON.parse(response.text);
      expect(response.statusCode).toBe(200);
      expect(parsedRes).toBe(expectedReturnValue);

}


describe("participant joined", () =>{
    test('trigger and compare backend response', ()=>handleRequest(participantJoined, WEBHOOK_PARTICIPANT_JOINED,
           "{\"account_id\":\"AAAAAABBBB\",\"user_name\":\"Jill Chill\",\"phone_number\":\"8615250064084\"}"
    ))
      test(
        'trigger and compare backend response',
        ()=> handleRequest(participantJoinedBeforeHost, WEBHOOK_PARTICIPANT_JOINED_BH, 
          "{\"account_id\":\"AAAAAABBBB\",\"user_name\":\"Jill Chill\"}")
      );


});