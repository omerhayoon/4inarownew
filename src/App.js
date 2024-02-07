import React from "react";

class App extends React.Component {
    state = {
        colorOptions: ["", "black", "green", "red", "blue"],
        rows: "",
        cols: "",
        currentPlayer: 1,
        player1Color: "",
        player2Color: "",
        board: [],
        timer: 10,
    };
    timerInterval;

    updateTurn = () => {
        const { currentPlayer, timer } = this.state;
        const newCurrentPlayer = currentPlayer === 1 ? 2 : 1;
        this.setState({ currentPlayer: newCurrentPlayer, timer: 10 });
        clearInterval(this.timerInterval);
        this.startTimer();
    };

    startTimer = () => {
        this.timerInterval = setInterval(() => {
            const { timer } = this.state;
            if (timer > 0) {
                this.setState({ timer: timer - 1 });
            } else {
                clearInterval(this.timerInterval);
                this.updateTurn();
            }
        }, 1000);
    };

    changeCurrentPlayer = (col) => {
        const { currentPlayer, player1Color, player2Color, board, rows } = this.state;
        const newCurrentPlayer = currentPlayer === 1 ? 2 : 1;

        const updatedBoard = [...board];
        const playerColor = currentPlayer === 1 ? player1Color : player2Color;

        for (let i = rows - 1; i >= 0; i--) {
            if (updatedBoard[i][col].color === 'white') {
                updatedBoard[i][col] = { color: playerColor, selected: true };
                break;
            }
        }
        this.setState({ board: updatedBoard, currentPlayer: newCurrentPlayer, timer: 10 });
        clearInterval(this.timerInterval);
        this.startTimer();
    };

    createBoard = () => {
        const { rows, cols } = this.state;
        const board = Array(rows).fill().map(() => Array(cols).fill({ color: 'white', selected: false }));
        this.setState({ board, timer: 10 }, () => {
            this.startTimer(); // נתחיל את הטיימר רק לאחר יצירת לוח המשחק
        });
    };

    changeSize = (event) => {
        const newSize = parseInt(event.target.value, 10);
        if (newSize >= 5 && newSize <= 10) {
            this.setState({ rows: newSize, cols: newSize });
        }
    };

    enterClick = () => {
        this.createBoard();
    };

    player1Color = (event) => {
        const selectedColor = event.target.value;
        const { player2Color } = this.state;

        if (selectedColor !== player2Color) {
            this.setState({ player1Color: selectedColor });
        } else {
            alert("Player 1 and Player 2 must choose different colors.");
        }
    };

    player2Color = (event) => {
        const selectedColor = event.target.value;
        const { player1Color } = this.state;

        if (selectedColor !== player1Color) {
            this.setState({ player2Color: selectedColor });
        } else {
            alert("Player 1 and Player 2 must choose different colors.");
        }
    };

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    render = () => {
        const backgroundURL = 'url("https://stuntsoftware.com/img/4inarow/title.png")';
        const { board, rows, colorOptions, player1Color, player2Color, timer } = this.state;
        return (
            <h2 style={{ backgroundImage: backgroundURL, backgroundRepeat: 'no-repeat', backgroundPosition: '30% -5px' }}>
                <h1 style={{ color: "red" }}>4 in a row game !</h1>
                <div>Current player : {this.state.currentPlayer} </div>
                <div>Time left : {timer} seconds</div>
                <div>
                    Player 1 Color :
                    <select value={player1Color} disabled={board.length > 0} onChange={this.player1Color}>
                        {colorOptions.map((color, index) => (
                            <option key={index}>{color}</option>
                        ))}
                    </select>
                </div>
                <div>
                    Player 2 Color :
                    <select value={player2Color} disabled={board.length > 0} onChange={this.player2Color}>
                        {colorOptions.map((color, index) => (
                            <option key={index}>{color}</option>
                        ))}
                    </select>
                </div>

                <div>
                    board size : <input type="number" min="5" max="10" value={rows} onChange={this.changeSize} />
                    <button onClick={this.enterClick} disabled={board.length > 0}>Enter</button>
                </div>
                <div>
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex}>
                            {row.map((col, colIndex) => (
                                <button key={colIndex} style={{ width: '100px', height: '50px', backgroundColor: col.color }}
                                        onClick={() => this.changeCurrentPlayer(colIndex)}></button>
                            ))}
                        </div>
                    ))}
                </div>
            </h2>
        );
    };
}

export default App;