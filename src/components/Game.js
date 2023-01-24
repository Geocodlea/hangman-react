import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Keyboard from "./Keyboard";
import StartPage from "./StartPage";

const modalStyle = {
  content: {
    width: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

function Game() {
  const [word, setWord] = useState("");
  const [score, setScore] = useState(0);
  const [hiddenWord, setHiddenWord] = useState([]);
  const [chances, setChances] = useState(6);
  const [incorrectGuesses, setIncorrectGuesses] = useState("");
  const [win, setWin] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showStartPage, setShowStartPage] = useState(true);

  async function getRandomWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await response.json();
    setWord(data[0].toUpperCase());
    setHiddenWord(data[0].split("").map(() => "_ "));
  }

  useEffect(() => {
    getRandomWord();
  }, []);

  function endGame() {
    setModalIsOpen(true);
  }

  function checkLetter(letter) {
    let guess = letter.target.textContent;
    if (!word.includes(guess)) {
      setIncorrectGuesses(incorrectGuesses + guess);
      setChances(chances - 1);
      setScore(score - 10);
      if (chances === 1) {
        setWin(false);
        endGame();
      }
    } else {
      let newHiddenWord = hiddenWord;
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          newHiddenWord[i] = guess;
        }
      }
      setHiddenWord(newHiddenWord);
      setScore(score + 10);
      if (!newHiddenWord.includes("_ ")) {
        setWin(true);
        endGame();
      }
    }
  }

  function showHint() {
    let hintIndex = Math.floor(Math.random() * word.length);
    while (hiddenWord[hintIndex] !== "_ ") {
      hintIndex = Math.floor(Math.random() * word.length);
    }
    const newHiddenWord = [...hiddenWord];
    newHiddenWord[hintIndex] = word[hintIndex];
    setHiddenWord(newHiddenWord);
    setChances(chances - 1);
    setScore(score - 10);
    if (chances === 1) {
      setWin(false);
      endGame();
    }
    if (!hiddenWord.includes("_ ")) {
      setWin(true);
      endGame();
    }
  }

  function playAgain() {
    getRandomWord();
    setScore(0);
    setChances(6);
    setIncorrectGuesses("");
    setWin(false);
    setModalIsOpen(false);
  }

  function startGame() {
    setShowStartPage(false);
  }

  return (
    <div>
      {showStartPage ? (
        <StartPage startGame={startGame} />
      ) : (
        <div className="gameContainer">
          <img src={`images/${6 - chances}.png`} alt="Hangman" id="image" />
          <Keyboard checkLetter={checkLetter} />
          <div id="incorrect">Incorrect guesses: {incorrectGuesses}</div>
          <div id="remaining">Remaining chances: {chances}</div>
          <div id="score">Score: {score}</div>
          <div id="word">{hiddenWord}</div>
          <button id="hint" onClick={showHint}>
            Hint
          </button>
          <Modal isOpen={modalIsOpen} style={modalStyle}>
            <h2>{win ? "You won!" : "You lost :("}</h2>
            <p>
              The word was: <b>{word}</b>
            </p>
            <button id="playAgain" onClick={playAgain}>
              Play Again
            </button>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Game;
