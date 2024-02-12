import React from "react";

class Player extends React.Component {
    state = {
        currentPlayer: 1,
    };

    switchPlayer = () => {
        const newCurrentPlayer = this.state.currentPlayer === 1 ? 2 : 1;
        this.setState({currentPlayer: newCurrentPlayer});
    };

    render() {
        return (
            <div>
                <div>Current player: {this.state.currentPlayer}</div>
            </div>
        );
    }
}

export default Player;
