const gameItems = document.querySelectorAll('.game_item');
const message = document.querySelector('#message');
const restartButton = document.querySelector("#restart-button");

let board = {};

gameItems.forEach((item, index) => {
    item.addEventListener("click" , () => {
        clickHandler(item,index);
    })
})

restartButton.addEventListener("click", () => {restartHandler()});

let indexX = [];
let indexY = [];
let count = 0;
let result = null;

function clickHandler(item,index) {

    if (gameItems[index].innerHTML !== "X" && gameItems[index].innerHTML !== "O") {
        item.innerHTML = "X";
        indexX.push(index);
    
        board.x = indexX.sort((a,b) => a - b);
        board.o = indexY;
        console.log(board);
        
        count++;
        checkForWin();

        if (!result ) {
            setTimeout(() => { 

                let randomIndex = cpuIndexDefiner();
                indexY.push(randomIndex);
                gameItems[randomIndex].innerHTML = "O";
                board.o = indexY.sort((a,b) => a - b);
                checkForWin();

            }, 500);
            console.log(count);
        }
    }
    
}

function cpuIndexDefiner() {
    let randomIndex = Math.floor(Math.random() * 8);
    if (gameItems[randomIndex].innerHTML !== "X" && gameItems[randomIndex].innerHTML !== "O") {
        return randomIndex;
    } else return cpuIndexDefiner();
}


function checkForWin() {

    let winningCombinations = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [3,4,5],
        [6,7,8],
    ];

    winningCombinations.forEach((item) => {
        
        if (count < 5){
            if (item.every((coordinate) => board.x.includes(coordinate))) {
                result = "X wins";
            } else if (item.every((coordinate) => board.o.includes(coordinate))) {
                result = "O wins";
            } 
            message.innerHTML = result;
        } else if (item.every((coordinate) => board.x.includes(coordinate))) {
            result = "X wins";
            message.innerHTML = result;
        } else if (!result) {
            message.innerHTML = "Tie";
            result = "Tie";
        }

    })

}

function restartHandler() {

    gameItems.forEach((item) => item.innerHTML = "");
    board = {};
    result = null;
    message.innerHTML = "";
    count = 0;
    indexX = [];
    indexY = [];

}