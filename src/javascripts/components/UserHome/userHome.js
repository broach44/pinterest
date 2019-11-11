import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import boardMaker from '../Boards/boards';
import pinItems from '../boardPins/boardPins';
import boardData from '../../helpers/data/boardData';
import userPins from '../../helpers/data/userPins';
import pinData from '../../helpers/data/pins';

import './userHome.scss';

const deleteBoard = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  const boardId = e.target.id.split('delete-board-')[1];
  userPins.getUserPinsByBoardId(boardId)
    .then((pins) => {
      pins.forEach((pin) => {
        userPins.deleteUserPin(pin.id);
      });
    })
    .catch((error) => console.error(error));
  // eslint-disable-next-line no-use-before-define
  boardData.deleteUserBoard(boardId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildUserBoards(uid);
    })
    .catch((error) => console.error(error));
};

const createNewUserPin = (e, newPinId) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newUserPin = {
    pinId: newPinId,
    uid,
    boardId: $('#pin-board-id').val(),
  };
  userPins.addNewUserPin(newUserPin)
    .then(() => {
      // reprint here
      pinItems.printPinBoard(newUserPin.boardId);
    })
    .catch((error) => console.error(error));
};

const addNewPin = (e) => {
  e.stopImmediatePropagation();
  const newPin = {
    category: $('#pin-category').val(),
    description: $('#pin-description').val(),
    imageUrl: $('#pin-image-url').val(),
    siteUrl: $('#pin-site-url').val(),
    title: $('#pin-title').val(),
  };
  pinData.addNewPin(newPin)
    .then((response) => {
      $('#addPinModal').modal('hide');
      // add to userPins so it will display on a board
      // reprint boards or pins
      const newPinId = response.data.name;
      // add to userPins and create new UserPin for the board selected
      createNewUserPin(e, newPinId);
    })
    .catch((error) => console.error(error));
};

const addNewBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    boardTitle: $('#board-title').val(),
    boardImg: $('#board-image').val(),
    uid,
  };
  boardData.addBoard(newBoard)
    .then(() => {
      $('#addBoardModal').modal('hide');
    })
    .catch((error) => console.error(error));
};

const buildUserBoards = (uid) => {
  smash.getCompleteUserDatas(uid)
    .then((boards) => {
      let domString = `
      <h2>User Boards</h2>
      <div class="container d-flex flex-wrap">
      `;
      boards.forEach((board) => {
        domString += boardMaker.makeABoard(board);
      });
      domString += '</div>';
      let domString2 = '';
      boards.forEach((board) => {
        domString2 += boardMaker.createRadioOptions(board);
      });
      utilities.printToDom('boardDiv', domString);
      utilities.printToDom('newPin-modal-radios', domString2);
      $('.boardCard').on('click', 'img', pinItems.makePinBoard);
      $('.boardCard').on('click', '.deleteBoard', deleteBoard);
      $('#add-new-Pin').on('click', addNewPin);
      $('#add-new-Board').on('click', addNewBoard);
    })
    .catch((error) => console.error(error));
};

export default { buildUserBoards };
