import $ from 'jquery';

import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import boardMaker from '../Boards/boards';
import pinItems from '../boardPins/boardPins';
import boardData from '../../helpers/data/boardData';
import userPins from '../../helpers/data/userPins';

import './userHome.scss';

const deleteBoard = (e) => {
  e.preventDefault();
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
      buildUserBoards();
    })
    .catch((error) => console.error(error));
};

const buildUserBoards = () => {
  smash.getCompleteUserDatas()
    .then((boards) => {
      let domString = `
      <h2>User Boards</h2>
      <div class="container d-flex flex-wrap">
      `;
      boards.forEach((board) => {
        domString += boardMaker.makeABoard(board);
      });
      domString += '</div>';
      utilities.printToDom('boardDiv', domString);
      $('.boardCard').on('click', 'img', pinItems.makePinBoard);
      // put in listener
      $('.boardCard').on('click', '.deleteBoard', deleteBoard);
    })
    .catch((error) => console.error(error));
};

export default { buildUserBoards };
