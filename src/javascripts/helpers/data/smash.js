import userBoards from './boardData';
import userPins from './userPins';
import pins from './pins';

const getCompleteUserDatas = (uid) => new Promise((resolve, reject) => {
  userBoards.getBoardsByUid(uid).then((boards) => {
    userPins.getUserPinsByUid(uid).then((boardPins) => {
      pins.getPins().then((pinSet) => {
        const newBoardPins = [];
        boardPins.forEach((boardPin) => {
          const newBp = { ...boardPin };
          const filteredPinItem = pinSet.find((x) => x.id === boardPin.pinId);
          newBp.pinId = filteredPinItem;
          newBoardPins.push(newBp);
        });
        const finalBoards = [];
        boards.forEach((board) => {
          const newBoard = { ...board };
          const filteredBoardPins = newBoardPins.filter((x) => x.boardId === board.id);
          newBoard.pinItems = filteredBoardPins;
          finalBoards.push(newBoard);
        });
        resolve(finalBoards);
      });
    });
  })
    .catch((error) => reject(error));
});

export default { getCompleteUserDatas };
