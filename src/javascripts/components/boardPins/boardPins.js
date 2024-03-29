import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import makePinCard from '../makePinCard/makePinCard';
import userPinsData from '../../helpers/data/userPins';

import './boardPins.scss';

const userBoards = $('#boardDiv');
const usersPinArea = $('#userPinDiv');

const goback = () => {
  userBoards.removeClass('hide');
  usersPinArea.addClass('hide');
};

let currentBoard = '';

const deletePin = (e) => {
  e.preventDefault();
  const userPinId = e.target.id.split('delete-pin-')[1];
  // eslint-disable-next-line no-use-before-define
  userPinsData.deleteUserPin(userPinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printPinBoard(currentBoard);
    })
    .catch((error) => console.error(error));
};

const updatePin = (e) => {
  e.preventDefault();
  const userPinId = e.target.id.split('update-pin-')[1];
  $('#userPin-update-button').on('click', () => {
    const boardIdSelection = $('input[name=boardRadios]:checked').val();
    userPinsData.updatedUserPin(userPinId, boardIdSelection)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        printPinBoard(currentBoard);
        $('#updateUserPinModal').modal('hide');
      })
      .catch((error) => console.error(error));
  });
};

const printPinBoard = (boardId) => {
  currentBoard = boardId;
  const { uid } = firebase.auth().currentUser;
  smash.getCompleteUserDatas(uid)
    .then((boards) => {
      let domString = `
      <button class="btn btn-secondary ml-3" id="backToBoards">Go Back to Boards</button>
      <div class="card-columns">
      `;
      const titleOfBoard = boards.find((x) => x.id === boardId);
      const pinnedItems = titleOfBoard.pinItems;
      pinnedItems.forEach((pinItem) => {
        const pinItemList = pinItem.pinId;
        const userPinId = pinItem.id;
        domString += makePinCard.makePinCard(pinItemList, userPinId);
      });
      domString += '</div>';
      utilities.printToDom('userPinDiv', domString);
      $('#backToBoards').on('click', goback);
      $('.pin-delete-button').on('click', deletePin);
      $('.pin-update-button').on('click', updatePin);
    })
    .catch((error) => console.error(error));
};

const makePinBoard = (e) => {
  const targetedBoard = e.target.parentNode;
  const boardId = $(targetedBoard).attr('id');
  userBoards.addClass('hide');
  usersPinArea.removeClass('hide');
  printPinBoard(boardId);
};


export default { makePinBoard, printPinBoard };
