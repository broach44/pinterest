import $ from 'jquery';

import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import boardMaker from '../Boards/boards';

import './userHome.scss';

const doSomethingFunc = (e) => {
  const targetedBoard = e.target.parentNode;
  const boardId = $(targetedBoard).attr('id');
  console.log(`You clicked the ${boardId} board`);
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
      $('.boardCard').on('click', doSomethingFunc);
    })
    .catch((error) => console.error(error));
};

export default { buildUserBoards };
