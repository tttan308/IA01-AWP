import { useState } from "react";
import Board from "../components/Board";
import getLocation from "../utils/getLocation";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: Array<string | null>) => {
    setHistory((prevHistory) => [
      ...prevHistory.slice(0, currentMove + 1),
      nextSquares,
    ]);
    setCurrentMove((prevMove) => prevMove + 1);
  };

  const jumpTo = (move: number) => {
    setCurrentMove(move);
  };

  const toggleOrder = () => {
    setIsAscending((prevIsAscending) => !prevIsAscending);
  };

  const moves = history.map((squares, move) => {
    if (move === 0)
      return (
        <button
          key="move-0"
          className="bg-gray-500 text-white py-1 px-2 rounded mb-2"
          onClick={() => jumpTo(0)}
        >
          Go to game start
        </button>
      );

    const prevSquares = history[move - 1];
    const location = squares.findIndex(
      (square, i) => square !== prevSquares[i],
    );
    if (location === -1) return null;

    const desc =
      move === currentMove ? (
        <button
          className="bg-red-500 text-white py-1 px-2 rounded mb-2"
          onClick={() => jumpTo(move)}
        >
          You are at move #{move} {getLocation(location)}
        </button>
      ) : (
        <button
          className="bg-gray-500 text-white py-1 px-2 rounded mb-2"
          onClick={() => jumpTo(move)}
        >
          Go to move #{move} {getLocation(location)}
        </button>
      );

    return <li key={`move-${move}-${squares.join("")}`}>{desc}</li>;
  });

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
        <ol>{isAscending ? moves : moves.slice().reverse()}</ol>
      </div>
    </div>
  );
}

export default Game;
