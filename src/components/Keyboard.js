export default function Keyboard({ checkLetter }) {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <div id="keyboard">
      {letters.map((letter) => (
        <button
          className="key"
          key={letter}
          onClick={(letter) => checkLetter(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
