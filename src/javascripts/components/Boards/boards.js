import './boards.scss';

const createRadioOptions = (board) => {
  const domString2 = `
  <div class="form-check">
    <input class="form-check-input" type="radio" name="boardRadios" id="${board.boardTitle}" value="${board.id}">
    <label class="form-check-label" for="${board.boardTitle}">
      ${board.boardTitle}
    </label>
  </div>
  `;
  return domString2;
};

const makeABoard = (board) => {
  const domString = `
  <div class="card col-3 p-0 boardCard" id="${board.id}">
    <img src=${board.boardImg} class="card-img" alt="${board.boardTitle}-image">
    <div class="card-body text-center">
      <h5 class="card-title">${board.boardTitle}</h5>
      <button class="btn btn-secondary deleteBoard" id="delete-board-${board.id}">Delete Board</button>
    </div>
  </div>
  `;
  return domString;
};

export default { makeABoard, createRadioOptions };
