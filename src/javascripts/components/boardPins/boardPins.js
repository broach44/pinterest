import $ from 'jquery';

import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import makePinCard from '../makePinCard/makePinCard';

const userBoards = $('#boardDiv');
const usersPinArea = $('#userPinDiv');

const goback = () => {
  userBoards.removeClass('hide');
  usersPinArea.addClass('hide');
};

const makePinBoard = (e) => {
  const targetedBoard = e.target.parentNode;
  const boardId = $(targetedBoard).attr('id');
  userBoards.addClass('hide');
  usersPinArea.removeClass('hide');
  smash.getCompleteUserDatas()
    .then((boards) => {
      let domString = `
      <h4 id="backToBoards">Go Back to Boards</h4>
      <div class="container d-flex flex-wrap">
      `;
      const titleOfBoard = boards.find((x) => x.boardTitle === boardId);
      const pinnedItems = titleOfBoard.pinItems;
      pinnedItems.forEach((pinItem) => {
        const pinItemList = pinItem.pinId;
        console.log('image url', pinItemList.imageUrl);
        domString += makePinCard.makePinCard(pinItemList);
      });
      domString += '</div>';
      utilities.printToDom('userPinDiv', domString);
      $('#backToBoards').on('click', goback);
    })
    .catch((error) => console.error(error));
};


export default { makePinBoard };
