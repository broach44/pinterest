import './boards.scss';

const makeABoard = (board) => {
  const domString = `
  <div class="card col-3 p-0 boardCard" id="${board.boardTitle}">
    <img src=${board.boardImg} class="card-img" alt="${board.boardTitle}-image">
    <div class="card-body text-center">
      <h5 class="card-title">${board.boardTitle}</h5>
    </div>
</div>
  `;
  return domString;
};

export default { makeABoard };
