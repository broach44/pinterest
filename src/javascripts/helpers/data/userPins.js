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

const getUserPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userPins.json?orderBy="boardId"&equalTo="${boardId}"`)
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

const addNewUserPin = (newUserPin) => axios.post(`${baseUrl}/userPins/.json`, newUserPin);

const updateUserPin = (userPinId, updatedUserPinObject) => axios.put(`${baseUrl}/userPins/${userPinId}.json`, updatedUserPinObject);

const updatedUserPin = (userPinId, newBoardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userPins/${userPinId}.json`)
    .then((result) => {
      const userPinObject = result.data;
      userPinObject.boardId = newBoardId;
      updateUserPin(userPinId, userPinObject);
      resolve();
    })
    .catch((error) => reject(error));
});

export default {
  getUserPinsByUid,
  deleteUserPin,
  getUserPinsByBoardId,
  addNewUserPin,
  updatedUserPin,
};
