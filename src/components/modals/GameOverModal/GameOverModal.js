import React from "react";
import { createPortal } from "react-dom";
import classes from "./GameOverModal.module.css"

function GameOverModal(props) {

    if (props.disableGameOverModal) {
        return null;
    }

    return createPortal(
        <div className={classes.GameOver}>
            <p>Game Over</p>
            <button onClick={() => props.resetGame()}>Reset Game</button>
        </div>,
        document.getElementById('root'),
    )
}

export {GameOverModal}