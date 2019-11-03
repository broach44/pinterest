// import firebase from 'firebase';
import smash from '../../helpers/data/smash';

// const getCurrentUid = () => firebase.auth().currentUser.uid;

const buildUserBoards = () => {
  smash.getCompleteUserDatas()
    .then((boards) => {
      console.log(boards);
    })
    .catch((error) => console.error(error));
};
// 1. When a user logs in
// 2. Check which user is logged in
// 3. Pull their boards from the database to display on their home page

export default { buildUserBoards };
