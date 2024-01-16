// eslint-disable-next-line import/no-unresolved
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const party = () => {
  confetti({
    particleCount: 100,
    spread: 90,
    origin: { y: 0.6 },
  });
};

const getComputerChoice = () => {
  const rpsChoices = ['Rock', 'Paper', 'Scissors'];
  const computerChoice = rpsChoices[Math.floor(Math.random() * 3)];
  return computerChoice;
};

const getResult = (playerChoice, computerChoice) => {
  let score;

  if (playerChoice === computerChoice) {
    score = 0;
  } else if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors')
    || (playerChoice === 'Paper' && computerChoice === 'Rock')
    || (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    score = 1;
  } else {
    score = -1;
  }

  return score;
};

const showResult = (score, playerChoice, computerChoice) => {
  const result = document.getElementById('result');

  // eslint-disable-next-line default-case
  switch (score) {
    case -1:
      result.innerText = 'You Lose!';
      break;
    case 0:
      result.innerText = "It's a Draw!";
      break;
    case 1:
      result.innerText = 'You Win!';
      party();
      break;
  }

  const playerScore = document.getElementById('player-score');
  const hands = document.getElementById('hands');
  playerScore.innerText = `${Number(playerScore.innerText) + score}`;
  hands.innerText = `👱 ${playerChoice} vs 🤖 ${computerChoice}`;
};

const onClickRPS = (playerChoice) => {
  const computerChoice = getComputerChoice();
  const score = getResult(playerChoice, computerChoice);
  showResult(score, playerChoice, computerChoice);
};

const endGame = () => {
  const playerScore = document.getElementById('player-score');
  const hands = document.getElementById('hands');
  const result = document.getElementById('result');
  playerScore.innerText = '';
  hands.innerText = '';
  result.innerText = '';
};

const playGame = () => {
  const rpsButtons = document.querySelectorAll('.rpsButton');

  rpsButtons.forEach((rpsButton) => {
    rpsButton.onclick = () => onClickRPS(rpsButton.value);
  });

  const endGameButton = document.getElementById('endGameButton');
  endGameButton.onclick = () => endGame();
};

playGame();
