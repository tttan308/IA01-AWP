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

    const nextPlayer = xIsNext ? "X" : "O";
    const status = calculateWinner(squares)
        ? `Winner: ${calculateWinner(squares)}`
        : `Next player: ${nextPlayer}`;

    const renderSquare = (i: number) => (
        <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
    );

    return (
        <>
            <div className="status">{status}</div>
            {[0, 1, 2].map(row => (
                <div key={row} className="board-row">
                    {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
                </div>
            ))}
        </>
    );
}

export default Board;
