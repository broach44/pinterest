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
      resolve(userPins);
    })
    .catch((error) => reject(error));
});

const deleteUserPin = (userPinId) => axios.delete(`${baseUrl}/userPins/${userPinId}.json`);

export default { getUserPinsByUid, deleteUserPin };
