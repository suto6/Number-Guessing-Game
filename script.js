let randomNum = parseInt((Math.random() * 100) + 1);

const submitElement = document.getElementById('submit');
const inputElement = document.getElementById('guessField');
const preGuessElement = document.getElementsByClassName('previousGuesses')[0];
const guessRemainElement = document.getElementsByClassName('guessesRemaining')[0];
const lowOrHighElement = document.getElementById('lowOrHigh');
const startOver = document.querySelector('.resultPara');

const p = document.createElement('p');

let preGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    document.getElementById('guessForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const guess = parseInt(inputElement.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a valid positive number');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        preGuess.push(guess);
        if (numGuess >= 10) {
            displayGuess(guess);
            displayMsg(`Game Over. Correct answer was ${randomNum}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNum) {
        displayMsg('Your guess is RIGHT!');
        endGame();
    } else if (guess < randomNum) {
        displayMsg('Last guess was too low!');
    } else if (guess > randomNum) {
        displayMsg('Last guess was too high!');
    }
}

function displayGuess(guess) {
    inputElement.value = '';
    preGuessElement.innerHTML += ` ${guess}`;
    numGuess++;
    guessRemainElement.innerHTML = `${11 - numGuess}`;
}

function displayMsg(msg) {
    lowOrHighElement.innerHTML = `<h2>${msg}</h2>`;
}

function endGame(){
    inputElement.value = '';
    inputElement.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameBtn = document.getElementById('newGame');
    newGameBtn.addEventListener('click', function(e){
        randomNumber = parseInt((Math.random() * 100) + 1);
        preGuess = [];
        numGuess = 1;
        preGuessElement.innerHTML = '';
        guessRemainElement.innerHTML = `${11 - numGuess}`;
        inputElement.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}
