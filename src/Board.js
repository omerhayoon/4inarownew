// Board.js
import React from "react";

class Board extends React.Component {
    render() {
        const { createBoard, changeCurrentPlayer } = this.props;
        return (
            <div>
                {createBoard.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        {row.map((col, colIndex) => (
                            <button
                                key={colIndex}
                                style={{ width: '100px', height: '50px', backgroundColor: col.color,padding:'0' }}
                                onClick={() => changeCurrentPlayer(colIndex)}
                            ></button>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}
export default Board;
