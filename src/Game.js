import React from "react";
import './index.css';
import Board from "./Board";

class Game extends React.Component {
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
        const {currentPlayer, timer} = this.state;
        const newCurrentPlayer = currentPlayer === 1 ? 2 : 1;
        this.setState({currentPlayer: newCurrentPlayer, timer: 10});
        clearInterval(this.timerInterval);
        this.startTimer();
    };

    startTimer = () => {
        this.timerInterval = setInterval(() => {
            const {timer} = this.state;
            if (timer > 0) {
                this.setState({timer: timer - 1});
            } else {
                clearInterval(this.timerInterval);
                this.updateTurn();
            }
        }, 1000);
    };

    changeCurrentPlayer = (col) => {
        const {currentPlayer, player1Color, player2Color, board, rows} = this.state;
        const newCurrentPlayer = currentPlayer === 1 ? 2 : 1;

        const updatedBoard = [...board];
        const playerColor = currentPlayer === 1 ? player1Color : player2Color;
        let boardFull = true;

        for (let i = rows - 1; i >= 0; i--) {
            if (updatedBoard[i][col].color === 'white') {
                updatedBoard[i][col] = {color: playerColor, selected: true};
                this.checkForVictory(i, col)
                boardFull = false;
                break;
            }
        }
        if (!boardFull) {
            this.setState({board: updatedBoard, currentPlayer: newCurrentPlayer, timer: 10});
            clearInterval(this.timerInterval);
            this.startTimer();
        } else {
            window.alert("Column is full, choose another one.");
        }

    };

    checkForVictory = (row, col) => {
        const {board, currentPlayer, player1Color, player2Color} = this.state;
        const playerColor = currentPlayer === 1 ? player1Color : player2Color;
        if (this.checkRow(row, playerColor) || this.checkColumn(col, playerColor)) {
            alert('Player ' + JSON.stringify(currentPlayer) + ' wins!');
            this.resetGame();
        }
    };

    checkRow = (row, playerColor) => {
        const {board} = this.state;
        let count = 0;
        for (let i = 0; i < board[row].length; i++) {
            if (board[row][i].color === playerColor) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    };

    checkColumn = (col, playerColor) => {
        const {board} = this.state;
        let count = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i][col].color === playerColor) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    };

    resetGame = () => {
        clearInterval(this.timerInterval);
        this.setState({
            rows: "",
            cols: "",
            currentPlayer: 1,
            player1Color: "",
            player2Color: "",
            board: [],
            timer: 0,
        });

    };
    createBoard = () => {
        const {rows, cols} = this.state;
        const board = Array(rows).fill().map(() => Array(cols).fill({color: 'white', selected: false}));
        this.setState({board, timer: 10}, () => {
            this.startTimer(); // נתחיל את הטיימר רק לאחר יצירת לוח המשחק
        });
    };

    changeSize = (event) => {
        const newSize = parseInt(event.target.value, 10);
        if (newSize >= 5 && newSize <= 10) {
            this.setState({rows: newSize, cols: newSize});
        }
    };


    updatePlayerColor = (event, playerNumber) => {
        const selectedColor = event.target.value;
        const otherPlayerColor = playerNumber === 1 ? this.state.player2Color : this.state.player1Color;

        if (selectedColor !== otherPlayerColor) {
            const playerColorKey = playerNumber === 1 ? 'player1Color' : 'player2Color';
            this.setState({[playerColorKey]: selectedColor});
        } else {
            alert('Please choose a different color from the other player.');
        }
    };


    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    render = () => {
        const backgroundURL = 'url("https://stuntsoftware.com/img/4inarow/title.png")';
        const {board, rows, colorOptions, player1Color, player2Color, timer} = this.state;
        return (
            <h2 style={{backgroundImage: backgroundURL, backgroundRepeat: 'no-repeat', backgroundPosition: '30% -5px'}}>
                <h1 style={{color: "darkgreen"}}>4 in a row game !</h1>
                <div>Current player : {this.state.currentPlayer} </div>
                <div>Time left : {timer} seconds</div>
                <div>
                    Player 1 Color :
                    <select value={player1Color} disabled={board.length > 0}
                            onChange={(event) => this.updatePlayerColor(event, 1)}>
                        {colorOptions.map((color, index) => (
                            <option key={index}>{color}</option>
                        ))}
                    </select>
                </div>
                <div>
                    Player 2 Color :
                    <select value={player2Color} disabled={board.length > 0}
                            onChange={(event) => this.updatePlayerColor(event, 2)}>
                        {colorOptions.map((color, index) => (
                            <option key={index}>{color}</option>
                        ))}
                    </select>
                </div>
                <div>
                    board size : <input type="number" min="5" max="10" value={rows} onChange={this.changeSize}/>
                    <button onClick={this.createBoard} disabled={board.length > 0}>Enter</button>
                </div>
                <div>
                    <Board createBoard={board} changeCurrentPlayer={this.changeCurrentPlayer}/>
                </div>
                <div>

                </div>
            </h2>
        );
    };
}

export default Game;