import React from 'react'
import "./Header.css"
const Header = ({playerTurn, player1Score, player2Score, amount, setDisableSelect, runningGame, setRunningGame}) => {
    
    const allCardsVisible = player1Score + player2Score == amount ? true : false
    function returnPlayer() {
        if(runningGame) {
            if( !allCardsVisible || amount === 0 ) {
                let playerOutput
                if(playerTurn === "Spieler 1") {
                    playerOutput =  `${playerTurn} : ${player1Score}`
                } else {
                    playerOutput = `${playerTurn} : ${player2Score}`
                }
                return playerOutput
                
            } else {
                setDisableSelect(false)
                setTimeout(function() {
                    setRunningGame(false)
                }, 8000)
                
                if(player1Score > player2Score) {
                    return `Spieler 1 gewinnt ${player1Score} zu ${player2Score}`
                } else if(player2Score > player1Score) {
                    return `Spieler 2 gewinnt ${player2Score} zu ${player1Score}`
                } else {
                    return "Unentschieden"
                }
            }
        }
        
    }
    function returnStyle() {
        
        const style1 = {
            color: "lightgreen"
        }
        const style2 = {
                color: "orange"
        }
        const style3 = {
            color: "white"
        }
           
        if( allCardsVisible ) {
            if( player1Score > player2Score ) {
                return style1
            } else if( player2Score > player1Score ) {
                return style2
            } else {
                return style3
            }
        } 
        else {
            if (playerTurn === "Spieler 1") {
                return style1
            } else {
                return style2
            }
        }
    }
    return (
        <div className="header__container">
            <div className="header__title">Memory</div>
            <div style={returnStyle()}  className="header__player">{returnPlayer()}</div>
        </div>
    )
}

export default Header
