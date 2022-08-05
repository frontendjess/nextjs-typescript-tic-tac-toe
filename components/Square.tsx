type Player = 'X' | 'O' | null

function Square({
    value, onClick, winner
}: {
        winner: Player
        value: Player
        onClick: () => void
}) {
    //if we have no value, return an empty button
    if (!value) {
        // if there is a winner, the button is disabled
        // disabled requires a boolean value
        //passed winner into the Boolean, so if it exists it will be true and if doesnt exist, it will be false
        // pass onClick handler to button that doesnt have a value, so player can select it 
        return <button className="square" onClick={onClick} disabled={Boolean(winner)} />;
    }
    return <button className={`square square_${value.toLocaleLowerCase()}`} disabled>{value}</button>
}

export default Square;