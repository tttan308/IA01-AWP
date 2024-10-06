interface SquareProps {
    readonly value: string | null;
    readonly onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;
