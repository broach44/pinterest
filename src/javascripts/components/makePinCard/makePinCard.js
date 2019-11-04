import './makePinCard.scss';

const makePinCard = (pin) => {
  const domString = `
  <div class="card col-3 p-0 pinCard" id="${pin.id}">
    <img src=${pin.imageUrl} class="card-img" alt="${pin.title}-image">
    <div class="card-body text-center">
      <h5 class="card-title">${pin.title}</h5>
      <p>${pin.description}</p>
    </div>
  </div>
  `;
  return domString;
};

export default { makePinCard };
