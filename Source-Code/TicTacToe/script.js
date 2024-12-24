/* eslint-disable no-use-before-define */
// Get elements
const board = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null); // 3x3 grid, initialized to null (empty)

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Check for a winner or draw
const checkWinner = () => {
  const winner = winPatterns.some(([a, b, c]) => {
    if (
      gameBoard[a]
      && gameBoard[a] === gameBoard[b]
      && gameBoard[a] === gameBoard[c]
    ) {
      message.textContent = `${gameBoard[a]} wins!`;
      board.style.pointerEvents = 'none'; // Disable clicks after game ends
      return true;
    }
    return false;
  });

  if (!winner && !gameBoard.includes(null)) {
    message.textContent = "It's a draw!";
  }
};

// Create the board cells
const createBoard = () => {
  board.innerHTML = ''; // Clear any existing cells
  gameBoard.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cellElement);
  });
};

// Handle cell click
const handleCellClick = (index) => {
  if (gameBoard[index] !== null) return; // If cell is already filled, return
  gameBoard[index] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  createBoard();
  checkWinner();
};

// Restart the game
restartBtn.addEventListener('click', () => {
  gameBoard = Array(9).fill(null); // Reset the game board
  currentPlayer = 'X'; // Reset to Player X
  createBoard();
  message.textContent = ''; // Clear the message
  board.style.pointerEvents = 'auto'; // Enable clicks again
});

// Initialize the game
createBoard();
