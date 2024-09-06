const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const statusDisplay = document.createElement('div');
statusDisplay.style.fontSize = '1.5em';
document.body.insertBefore(statusDisplay, resetButton);
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function checkWin() {
    for (const [a, b, c] of winConditions) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].style.backgroundColor = 'lightgreen';
            cells[b].style.backgroundColor = 'lightgreen';
            cells[c].style.backgroundColor = 'lightgreen';
            statusDisplay.textContent = `${currentPlayer} wins!`;
            return true;
        }
    }
    if (board.every(cell => cell)) {
        statusDisplay.textContent = 'It\'s a tie!';
        return true;
    }
    return false;
}
function handleClick(e) {
    const index = e.target.dataset.index;
    if (!board[index]) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#f0f0f0'; // Reset cell color
        cell.addEventListener('click', handleClick);
    });
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
