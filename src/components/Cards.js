import React, { useState } from 'react'
import reactLogo from '../images/logo512.png'
import "./Cards.css";

const Cards = ({amount, setPlayerTurn, incrementScore1, incrementScore2, resetScore, setDisableSelect, setRunningGame}) => {
    const [player1, setPlayer1] = useState(true)
    let secondCardOpen = false
    const extraClass = player1 ? "spieler1" : "spieler2"
        const randomNumbersArray = () => {
            let randomArray = []
            let newArray = []
            for( let i = 0; i < amount; i++ ) {
                let randomTest =  randomNumber()   
                if(!randomArray.includes(randomTest)) {
                    randomArray.push(randomNumber())
                } else {
                    i--
                }
                console.log(randomArray)
                
        }
        newArray = [...randomArray.concat(randomArray)]
        newArray.sort(() => Math.random() - 0.5)
        return newArray
        }
        const [allCards, setAllCards] = useState(randomNumbersArray())
        const player1Styling  = "3px solid lightgreen"
        const player2Styling  = "3px solid orange"

        let firstId 
        let secondPart
        let firstCardOpen = false
        function handleClick(e) {
            e.preventDefault();
            if(!secondCardOpen) {
                let firstValueId = e.target.id.split("-")[0]
                let secondValueId = e.target.id.split("-")[1]
                let imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${firstValueId}.png`
            
                if(e.target.className.includes("invisible") && !firstCardOpen) {
                    e.target.src = imageUrl
                    e.target.classList.add("visible")
                    e.target.classList.remove("invisible")
                    firstId = firstValueId
                    secondPart = secondValueId
                    firstCardOpen = true

                } else if(e.target.className.includes("invisible") && firstCardOpen) {
                    e.target.src = imageUrl
                    e.target.classList.add("visible")
                    e.target.classList.remove("invisible")
                    secondCardOpen = true
                    if(`${firstId}` === firstValueId) {
                        firstCardOpen = false
                        secondCardOpen = false
                        if(player1) {
                            document.getElementById(`${firstId}-${secondPart}`).style.border =  player1Styling
                            document.getElementById(e.target.id).style.border =  player1Styling
                            incrementScore1()
                        } else {
                            document.getElementById(`${firstId}-${secondPart}`).style.border =  player2Styling
                            document.getElementById(e.target.id).style.border =  player2Styling
                            incrementScore2()
                        }
                        firstId = "none"
                        
                    } else {
                        document.getElementById(`${firstId}-${secondPart}`).classList.add("invisible");
                        e.target.className = "invisible"
                        
                        firstCardOpen = false
                        setTimeout(function() {
                            document.getElementById(`${firstId}-${secondPart}`).src = reactLogo
                            e.target.src = reactLogo
                            firstId = "random"
                            secondCardOpen = false
                                if(player1) {
                                    setPlayer1(false)
                                    setPlayerTurn("Spieler 2")
                                } else {
                                    setPlayer1(true)
                                    setPlayerTurn("Spieler 1")
                                }
                        }, 2000)
                        
                    }
                }
            }
        }   
    
    function randomNumber() {
        return Math.ceil(Math.random() * 251)
    }
    function reset() {
        if(amount > 0) setDisableSelect(true)
        setRunningGame(true)
        resetScore()
        setAllCards([])
        setPlayerTurn("Spieler 1")
        setPlayer1(true)
        setTimeout(function() {
            setAllCards(randomNumbersArray())
        }, 500)
        
    }
    return (
        <div className="cards-container">
            <button className="resetButton" onClick={reset}>Runde starten</button>
            
            {allCards.map((data, index) => (
            <img 
                key={index}
                id={`${data}-${index}`}
                src={reactLogo} 
                alt="" 
                style={{margin: "10px", backgroundColor: "#88998d", borderRadius: "8px"}}
                onClick={handleClick}
                className={`${extraClass} invisible`}
                />
                
            ))
            }
            <br />
        </div>
    )
}

export default Cards
