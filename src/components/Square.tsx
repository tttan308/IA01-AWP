interface SquareProps {
  readonly value: string | null;
  readonly onSquareClick: () => void;
  readonly isWinningSquare: boolean;
}

function Square({ value, onSquareClick, isWinningSquare }: SquareProps) {
  return (
    <button
      className={`square ${isWinningSquare ? "highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}


export default Square;
