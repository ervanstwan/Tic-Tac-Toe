
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';

function printBoard() {
    console.log(`
 ${board[0]} | ${board[1]} | ${board[2]}
---+---+---
 ${board[3]} | ${board[4]} | ${board[5]}
---+---+---
 ${board[6]} | ${board[7]} | ${board[8]}
    `);
}

function checkWinner() {
    const winCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (let combo of winCombos) {
        const [a,b,c] = combo;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            return true;
        }
    }
    return false;
}

function play() {
    printBoard();
    readline.question(`Player ${currentPlayer}, enter your move (1-9): `, (input) => {
        const move = parseInt(input) - 1;
        if (move >=0 && move <9 && board[move] === ' ') {
            board[move] = currentPlayer;
            if (checkWinner()) {
                printBoard();
                console.log(`🎉 Player ${currentPlayer} wins!`);
                return readline.close();
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        } else {
            console.log('Invalid move!');
        }
        play();
    });
}

play();
