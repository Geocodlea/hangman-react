import React from "react";

function StartPage({ startGame }) {
  return (
    <div className="gameContainer">
      <h1>HANGMAN</h1>
      <p>
        The game is a word guessing game where you need to guess a random word
        letter by letter.
      </p>
      <p>
        You have 6 chances to guess the word, if you run out of chances the game
        will end.
      </p>
      <p>
        You get 10 points for a good guess and -10 points for a wrong guess.
      </p>
      <p>
        You can use the hint button to reveal one letter of the word and lose 10
        points.
      </p>
      <button id="start" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}

export default StartPage;
