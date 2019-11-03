import userData from './userData';
import userBoards from './boardData';

const getCompleteUserDatas = () => new Promise((resolve, reject) => {
  userData.getUsers()
    .then((singleUser) => userBoards.getBoardsByUid(singleUser.uid))
    .then((board) => {
      const boardsToDisplay = userBoards.getBoardsByUid(board[0].uid);
      resolve(boardsToDisplay);
    })
    .catch((error) => reject(error));
});

export default { getCompleteUserDatas };
