import $ from 'jquery';

import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import boardMaker from '../Boards/boards';
import pinItems from '../boardPins/boardPins';

import './userHome.scss';


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
      $('.boardCard').on('click', pinItems.makePinBoard);
      console.log('build boards func', boards);
    })
    .catch((error) => console.error(error));
};

export default { buildUserBoards };
