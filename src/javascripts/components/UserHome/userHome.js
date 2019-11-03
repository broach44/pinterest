// import firebase from 'firebase';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import boardMaker from '../Boards/boards';
// const getCurrentUid = () => firebase.auth().currentUser.uid;

const buildUserBoards = () => {
  smash.getCompleteUserDatas()
    .then((boards) => {
      console.log(boards);
      let domString = '<h2>User Boards</h2>';
      boards.forEach((board) => {
        domString += boardMaker.makeABoard(board);
      });
      utilities.printToDom('boardDiv', domString);
    })
    .catch((error) => console.error(error));
};
// 1. When a user logs in
// 2. Check which user is logged in
// 3. Pull their boards from the database to display on their home page

export default { buildUserBoards };
