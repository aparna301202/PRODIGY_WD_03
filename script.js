// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let vsAI = false;

// DOM elements
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const twoPlayerRadio = document.getElementById('twoPlayer');
const vsAIRadio = document.getElementById('vsAI');

// Event listener for cell clicks
function handleCellClick(index) {
    if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();
        switchPlayer();
        
        if (vsAI && currentPlayer === 'O' && gameActive) {
            // If playing vs AI, let AI make a move after the player
            makeAIMove();
        }
    }
}

// Update the game board in the DOM
function updateBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

// Switch player after each turn
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for a winner or a tie
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            status.textContent = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        status.textContent = 'It\'s a tie!';
    }
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = '';
    updateBoard();
    vsAI = vsAIRadio.checked;
    twoPlayerRadio.disabled = false;
    vsAIRadio.disabled = false;
}

// AI Logic
function makeAIMove() {
    twoPlayerRadio.disabled = true;
    vsAIRadio.disabled = true;

    // Simple AI: Randomly choose an empty cell
    const emptyCells = gameBoard.reduce((acc, cell, index) => (cell === '' ? [...acc, index] : acc), []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiMove = emptyCells[randomIndex];

    // Delay the AI move for a better user experience
    setTimeout(() => {
        handleCellClick(aiMove);
    }, 800);
}

// Event listener for mode selection
twoPlayerRadio.addEventListener('change', resetGame);
vsAIRadio.addEventListener('change', resetGame);

// Initialize the game board
updateBoard();
