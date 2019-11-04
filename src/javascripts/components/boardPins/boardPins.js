import $ from 'jquery';

import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';

const makePinBoard = (e) => {
  const targetedBoard = e.target.parentNode;
  const boardId = $(targetedBoard).attr('id');
  smash.getCompleteUserDatas()
    .then((boards) => {
      let domString = '';
      const titleOfBoard = boards.find((x) => x.boardTitle === boardId);
      const pinnedItems = titleOfBoard.pinItems;
      pinnedItems.forEach((pinItem) => {
        const pinTitles = (pinItem.pinId.title);
        domString += `<p>${pinTitles}</p>`;
      });
      utilities.printToDom('userPinDiv', domString);
    })
    .catch((error) => console.error(error));
};


export default { makePinBoard };
