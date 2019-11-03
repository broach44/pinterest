import userData from './userData';
import userBoards from './boardData';
import userPins from './userPins';

const getCompleteUserDatas = () => new Promise((resolve, reject) => {
  userData.getUsers().then((singleUser) => {
    userBoards.getBoardsByUid(singleUser.uid).then((boards) => {
      userPins.getUserPinsByUid(singleUser.uid).then((boardPins) => {
        const finalBoards = [];
        boards.forEach((board) => {
          const newBoard = { ...board };
          const userPinCollection = boardPins;
          const filteredBoardPins = userPinCollection.filter((x) => x.boardId === board.id);
          newBoard.pinItems = filteredBoardPins;
          finalBoards.push(newBoard);
        });
        resolve(finalBoards);
      });
    });
  })
    .catch((error) => reject(error));
});

// 1. get boards for user that is logged in
// 2. get userPins for that board
// 3. grab pins that match the pinId from user


export default { getCompleteUserDatas };
