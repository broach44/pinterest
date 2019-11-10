import $ from 'jquery';
// import firebase from 'firebase/app';
// import 'firebase/auth';

import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import makePinCard from '../makePinCard/makePinCard';
import userPinsData from '../../helpers/data/userPins';

const userBoards = $('#boardDiv');
const usersPinArea = $('#userPinDiv');

const goback = () => {
  userBoards.removeClass('hide');
  usersPinArea.addClass('hide');
};

// const getCurrentUid = () => firebase.auth().currentUser.uid;
// const uid = getCurrentUid();
// console.log('what user is logged', uid);

// Look at some options to get the boardId from the userPinsId and way to pass into the make pin board
// let tempPinNum = '';

const deletePin = (e) => {
  e.preventDefault();
  const userPinId = e.target.id.split('delete-pin-')[1];
  userPinsData.deleteUserPin(userPinId)
    .then(() => {
    // TODO: need to reprint the pins here
    })
    .catch((error) => console.error(error));
};

const makePinBoard = (e) => {
  const targetedBoard = e.target.parentNode; // targeting to get the board id
  const boardId = $(targetedBoard).attr('id');
  userBoards.addClass('hide');
  usersPinArea.removeClass('hide');
  smash.getCompleteUserDatas()
    .then((boards) => {
      let domString = `
      <h4 id="backToBoards">Go Back to Boards</h4>
      <div class="container d-flex flex-wrap">
      `;
      const titleOfBoard = boards.find((x) => x.id === boardId);
      const pinnedItems = titleOfBoard.pinItems;
      pinnedItems.forEach((pinItem) => {
        const pinItemList = pinItem.pinId;
        const userPinId = pinItem.id;
        domString += makePinCard.makePinCard(pinItemList, userPinId);
        console.log('pin item', pinItem);
        console.log('pin userPinId', pinItem.id);
      });
      domString += '</div>';
      utilities.printToDom('userPinDiv', domString);
      $('#backToBoards').on('click', goback);
      $('#userPinDiv').on('click', deletePin);
    })
    .catch((error) => console.error(error));
};


export default { makePinBoard };
