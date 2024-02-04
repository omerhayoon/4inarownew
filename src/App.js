import React from "react";

class App extends React.Component {
    state = {
        colorOptions: ["black", "green", "red", "blue"],
        rows: "",// שורה
        cols: "",// עמודה
        currentPlayer: "",//תור איזה שחקן
        player1Color:"",// צבע שחקן 1
        player2Color:"", // צבע שחקן 2
        board: [],// לוח משחק
    };


// יצירת לוח משחק
    createBoard = () => {
        const { rows, cols } = this.state;
        const board = Array(rows).fill().map(() => Array(cols).fill({ color: 'white', selected: false }));
        this.setState({ board });
    };


    // שינוי גודל הלוח
    changeSize = (event) => {
        const newSize = parseInt(event.target.value, 10);
        if ( newSize >= 5 && newSize <= 10) {
            this.setState({ rows: newSize, cols: newSize });
        }
    };

    // עדכון הלוח כאשר יש לחיצה
    enterClick = () => {
        this.createBoard();
    };
    player1Color = (event) => {
        const selectedColor = event.target.value;
        const { player2Color } = this.state;

        //אולי כפל קוד בדיקה שהצבע הנבחר לשחקן 1 אינו זהה לצבע של שחקן 2
        if (selectedColor !== player2Color) {
            this.setState({ player1Color: selectedColor });
        } else {
            alert("Player 1 and Player 2 must choose different colors.");
        }
    };

    player2Color = (event) => {
        const selectedColor = event.target.value;
        const { player1Color } = this.state;

        //  אולי כפל קוד בדיקה שהצבע הנבחר לשחקן 2 אינו זהה לצבע של שחקן 1
        if (selectedColor !== player1Color) {
            this.setState({ player2Color: selectedColor });
        } else {
            alert("Player 1 and Player 2 must choose different colors.");
        }
    };



    getCurrentPlayerColor = () => {
        return this.state.currentPlayer === 1 ? this.state.player1Color : this.state.player2Color;
    };

    render = () => {
        const { board, rows, colorOptions, player1Color,player2Color } = this.state;
        return (
            <div>
                <h1 style={{ color: "red" }}>4 in a row game!</h1>
                <div> Current Player: {this.state.currentPlayer} </div>
                <div>
                    Player 1 Color:
                    <select value={player1Color} onChange={this.player1Color}>
                        {colorOptions.map((color) => (
                            <option>
                                {color}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    player 2 color:
                    <select value={player2Color} onChange={this.player2Color}>
                        {colorOptions.map((color)=>(
                            <option>
                                {color}
                            </option>

                        ))}
                    </select>
                </div>

                <div>bord size : <input type="number" min="5" max="10" value={rows} onChange={this.changeSize}/>
                    <button onClick={this.enterClick}>enter</button>
                </div>
                <div>{board.map((row, rowIndex) => (
                    <div>
                        {row.map((cell, colIndex) => (
                            <button></button>
                        ))}
                    </div>
                ))}
                </div>
            </div>
        );
    };
}
export default App;
