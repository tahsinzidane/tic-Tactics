// Description: Tic Tac Toe game script

// game winning msg
let winningMsg = document.getElementById('winningMsg');
function winner(message) {
    winningMsg.style.display = 'block';
    winningMsg.innerHTML = message;

    let closeBtn = document.createElement('p');
    closeBtn.innerHTML = `<i class="ri-close-large-fill"></i>`;

    // Click event to close the popup message
    closeBtn.addEventListener('click', function () {
        winningMsg.style.display = 'none';
    });

    winningMsg.appendChild(closeBtn);

    // Clear the cells after closing the popup box
    closeBtn.addEventListener('click', () => {
        cells.forEach(cell => {
            // Make empty cells
            cell.innerHTML = '';
            cell.classList.remove('clicked');
        });
    });
}

// ======================================== main game ==============

let cells = document.querySelectorAll('.cell');
let startBtn = document.getElementById('startBtn');

// Keep track of whose turn it is
let currentPlayer = 'X';

// Start the game
function startGame() {
    // Reset board 
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('clicked');
        cell.addEventListener('click', playerMove);
    });
    // Reset current player to 'X' at the start of the game
    currentPlayer = 'X'; 
}

// Player move
function playerMove(event) {
    let cell = event.target;

    // Only allow move if cell is empty
    if (!cell.innerHTML && !cell.classList.contains('clicked')) {
        // Set X or O
        cell.innerHTML = currentPlayer;
        // Mark the cell as clicked
        cell.classList.add('clicked');

        if (checkWin(currentPlayer)) {
            winner(`${currentPlayer} wins the game!`);
            return;
        }

        if (isDraw()) {
            winner("It's a draw!");
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        robotMove();
    }
}

// Robot move
function robotMove() {
    // Wait for the robot's turn
    if (currentPlayer === 'O') {
        let randomCell;
        do {
            randomCell = Math.floor(Math.random() * cells.length);
        } while (cells[randomCell].innerHTML);

        cells[randomCell].innerHTML = 'O';
        cells[randomCell].classList.add('clicked');

        if (checkWin('O')) {
            winner('Robot wins the game!');
            return;
        }

        if (isDraw()) {
            winner("It's a draw!");
            return;
        }

        currentPlayer = 'X';
    }
}

// Check for a win
function checkWin(player) {
    const winningCombinations = [
        // Horizontal
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertical
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonal 
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].innerHTML === player);
    });
}

// Check for a draw
function isDraw() {
    return [...cells].every(cell => cell.innerHTML); 
}

// Start button click event
startBtn.addEventListener('click', startGame);
