const cardValues = [
  '🍎',
  '🍎',
  '🍌',
  '🍌',
  '🍮',
  '🍮',
  '🎂',
  '🎂',
  '🍟',
  '🍟',
  '🍫',
  '🍫',
  '🍇',
  '🍇',
  '🥝',
  '🥝',
];
let shuffledValues = [];
let cardElements = [];
let flippedCards = [];
let matchedCards = [];

const shuffleArray = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const checkMatch = () => {
  const [card1, card2] = flippedCards;

  if (
    card1.querySelector('.card-back').textContent
    === card2.querySelector('.card-back').textContent
  ) {
    matchedCards.push(card1, card2);
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }
  flippedCards = [];

  if (matchedCards.length === cardElements.length) {
    alert('Congratulations! You found all pairs!');
  }
};

const flipCard = (card) => {
  if (
    flippedCards.length < 2
    && !card.classList.contains('flipped')
    && !matchedCards.includes(card)
  ) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
};
const startGame = () => {
  shuffledValues = shuffleArray(cardValues);
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  matchedCards = [];
  cardElements = [];
  for (let i = 0; i < shuffledValues.length; i += 1) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = shuffledValues[i];

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
    cardElements.push(card);
  }
};

const btn = document.querySelector('.btn');
btn.addEventListener('click', startGame);
// Initialize the game when the page loads
window.onload = startGame;
