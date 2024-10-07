import Square from "./Square";
import calculateWinner from "../utils/calculateWinner";

interface BoardProps {
  readonly xIsNext: boolean;
  readonly squares: (string | null)[];
  readonly onPlay: (squares: (string | null)[]) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winnerInfo = calculateWinner(squares);
  const nextPlayer = xIsNext ? "X" : "O";
  const status = winnerInfo
    ? `Winner: ${winnerInfo.winner}`
    : `Next player: ${nextPlayer}`;
  const winningSquares = winnerInfo ? winnerInfo.line : [];

  const renderSquare = (i: number) => {
    const isWinningSquare = winningSquares.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </>
  );
}

export default Board;
