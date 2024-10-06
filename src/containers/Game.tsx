import { useState } from "react";
import Board from "../components/Board";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function toggleOrder() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={`move-${move}-${squares.join("")}`}>
        {move === currentMove ? (
          <span>You are at move #{move}</span>
        ) : (
          <button
            className="bg-gray-500 text-white py-1 px-2 rounded mb-2"
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        )}
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button
          className="toggle-order bg-blue-500 text-white py-1 px-2 rounded mb-2"
          onClick={toggleOrder}
        >
          {isAscending ? "Ascending" : "Descending"}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}

export default Game;
