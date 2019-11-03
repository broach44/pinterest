// import firebase from 'firebase';
import users from '../../helpers/data/userData';
import boardData from '../../helpers/data/boardData';
// const getCurrentUid = () => firebase.auth().currentUser.uid;

const buildUserBoards = () => {
  users.getUsers()
    .then((user) => {
      console.log(boardData.getBoardsByUid(user.uid));
    })
    .catch((error) => console.error(error));
};
// 1. When a user logs in
// 2. Check which user is logged in
// 3. Pull their boards from the database to display on their home page

export default { buildUserBoards };
