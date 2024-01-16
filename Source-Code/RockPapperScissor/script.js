function getComputerChoice() {
  const rpsChoices = ['Rock', 'Paper', 'Scissors'];
  const computerChoice = rpsChoices[Math.floor(Math.random() * 3)];
  return computerChoice;
}

function getResult(playerChoice, computerChoice) {
  let score;

  if (playerChoice === computerChoice) {
    score = 0;
  } else if (playerChoice === 'Rock' && computerChoice === 'Scissors') {
    score = 1;
  } else if (playerChoice === 'Paper' && computerChoice === 'Rock') {
    score = 1;
  } else if (playerChoice === 'Scissors' && computerChoice === 'Paper') {
    score = 1;
  } else {
    score = -1;
  }

  return score;
}

function showResult(score, playerChoice, computerChoice) {
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
      break;
  }

  const playerScore = document.getElementById('player-score');
  const hands = document.getElementById('hands');
  playerScore.innerText = `${Number(playerScore.innerText) + score}`;
  hands.innerText = `👱 ${playerChoice} vs 🤖 ${computerChoice}`;
}

function onClickRPS(playerChoice) {
  const computerChoice = getComputerChoice();
  const score = getResult(playerChoice.value, computerChoice);
  showResult(score, playerChoice.value, computerChoice);
}

function endGame() {
  const playerScore = document.getElementById('player-score');
  const hands = document.getElementById('hands');
  const result = document.getElementById('result');
  playerScore.innerText = '';
  hands.innerText = '';
  result.innerText = '';
}

function playGame() {
  const rpsButtons = document.querySelectorAll('.rpsButton');

  rpsButtons.forEach((rpsButton) => {
    rpsButton.onclick = () => onClickRPS(rpsButton);
  });

  const endGameButton = document.getElementById('endGameButton');
  endGameButton.onclick = () => endGame();
}
playGame();
