const hangmanImage = document.querySelector('.hangman-box img');
const wordDisplay = document.querySelector('.word-display');
const guessesText = document.querySelector('.guesses-text b');
const keyboardDiv = document.querySelector('.keyboard');
const gameModal = document.querySelector('.game-modal');
const playAgainBtn = document.querySelector('.play-again');

let currentWord, correctLetters = [], wrongGuessCount = 0;
let maxGuesses = 6;

function resetGame() {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  keyboardDiv.querySelectorAll('button').forEach(button => button.disabled = false);
  gameModal.classList.remove('show');
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  getRandomWord();
}

// Function to get a random word from the word list
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(word);
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  wordDisplay.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join("");
}

const gameOver = (isWin) => {
  setTimeout(() => {
    const modalText = isWin ? `You found the word:` : `The correct word was:`
    gameModal.querySelector('img').src = `images/${isWin ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector('h4').innerText = `${isWin ? 'You Win' : 'Game Over'}`;
    gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add('show');
  }, 300);
}

// Function to initialize the game
const initGame = (button, clickedLetter) => {
  console.log(button, clickedLetter);
  if(currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter,index) => {
      if(letter === clickedLetter) {
        correctLetters.push(clickedLetter);
        wordDisplay.querySelectorAll('li')[index].innerText = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
      }
    })
  } else {
    wrongGuessCount++;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;

  if(wrongGuessCount === maxGuesses) return gameOver(false);
  if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement('button');
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

playAgainBtn.addEventListener('click', resetGame);