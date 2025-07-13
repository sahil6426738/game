const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
let gameActive = true;

const WINNING_COMBINATIONS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = isXTurn ? 'X' : 'O';

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
    setStatusText();
  }
}

function setStatusText() {
  statusText.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    statusText.textContent = "It's a Draw!";
  } else {
    statusText.textContent = `Player ${isXTurn ? 'X' : 'O'} Wins!`;
  }
}

function restartGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  isXTurn = true;
  gameActive = true;
  setStatusText();
}
