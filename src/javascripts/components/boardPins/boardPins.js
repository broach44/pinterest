import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';

const makePinBoard = (boardName) => {
  smash.getCompleteUserDatas()
    .then((boards) => {
      let domString = '';
      const titleOfBoard = boards.find((x) => x.boardTitle === boardName);
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
