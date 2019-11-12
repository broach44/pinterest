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

const addNewPin = (e) => {
  e.stopImmediatePropagation();
  const newPin = {
    category: $('#pin-category').val(),
    description: $('#pin-description').val(),
    imageUrl: $('#pin-image-url').val(),
    siteUrl: $('#pin-site-url').val(),
    title: $('#pin-title').val(),
  };
  const boardIdSelection = $('input[name=boardRadios]:checked').val();
  pinData.addNewPin(newPin)
    .then((response) => {
      $('#addPinModal').modal('hide');
      const newPinId = response.data.name;
      const { uid } = firebase.auth().currentUser;
      const newUserPin = {
        pinId: newPinId,
        uid,
        boardId: boardIdSelection,
      };
      userPins.addNewUserPin(newUserPin);
      if ($('#boardDiv').hasClass('hide')) {
        pinItems.printPinBoard(newUserPin.boardId);
      }
    })
    .catch((error) => console.error(error));
};

const addNewBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    boardTitle: $('#board-title').val(),
    boardImg: $('#board-image-url').val(),
    uid,
  };
  boardData.addBoard(newBoard)
    .then(() => {
      $('#addBoardModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildUserBoards(uid);
    })
    .catch((error) => console.error(error));
};

const buildUserBoards = (uid) => {
  smash.getCompleteUserDatas(uid)
    .then((boards) => {
      let domString = `
      <h2 class="text-center mt-3">User Boards</h2>
      <div class="board-container container">
      <div class="card-columns">
      `;
      boards.forEach((board) => {
        domString += boardMaker.makeABoard(board);
      });
      domString += '</div></div>';
      let domString2 = '';
      boards.forEach((board) => {
        domString2 += boardMaker.createRadioOptions(board);
      });
      utilities.printToDom('boardDiv', domString);
      utilities.printToDom('newPin-modal-radios', domString2);
      utilities.printToDom('updateUserPin-modal-radios', domString2);
      $('.boardCard').on('click', 'img', pinItems.makePinBoard);
      $('.boardCard').on('click', '.deleteBoard', deleteBoard);
      $('#add-new-Pin').on('click', addNewPin);
      $('#add-new-Board').on('click', addNewBoard);
    })
    .catch((error) => console.error(error));
};

export default { buildUserBoards };
