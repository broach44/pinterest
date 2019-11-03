import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserPinsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userPins.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demUserPins = response.data;
      const userPins = [];
      Object.keys(demUserPins).forEach((fbId) => {
        demUserPins[fbId].id = fbId;
        userPins.push(demUserPins[fbId]);
      });
      resolve(userPins); // Hard code to only return first user
    })
    .catch((error) => reject(error));
});

export default { getUserPinsByUid };
