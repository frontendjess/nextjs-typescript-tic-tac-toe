import { useEffect, useState } from "react";
import Square from "../components/Square";

type PlayerWinner = "X" | "O" | "BOTH" | null;

function calculateWinner(squares: PlayerWinner[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}


function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
        Math.round(Math.random() * 1) === 1 ? "X" : "O"
    );
    const [winner, setWinner] = useState<PlayerWinner>(null);

    function reset() {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
    }

    function setSquareValue(index: number) {
        // when click on square, set that value to that player
        const newData = squares.map((val, i) => {
            if (i === index) {
                //if index in this map is equal to the index passed in the square (the parameter) then
                // return current player, otherwise return that value that is in the square
                return currentPlayer;
            }
            return val;
        });
        // setSquares with newData
        setSquares(newData)
        // set current player to the other player
        // if the current player is X then set it to O, if O then set to X
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }

    useEffect(() => {
        const w = calculateWinner(squares);
        if (w) {
            setWinner(w)
        }

        if (!w && !squares.filter((square) => !square).length) {
            setWinner("BOTH");
        }
    })

    return (<div>
        {!winner && <p>Hey {currentPlayer}, it&apos;s your turn</p>}
        {winner && winner !== "BOTH" && <p>Congratulations {winner}, you won!</p>}
        {winner && winner === "BOTH" && <p>Congratulations you&apos;re both winners!</p>}
        <div className="grid">
            {Array(9).fill(null).map((_, i) => {
                return <Square winner={winner} key={i} onClick={() => setSquareValue(i)} value={squares[i]} />
            })}
        </div>

        <button className="reset" onClick={reset}>RESET</button>
     </div>);
}

export default Board;