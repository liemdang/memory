import React, { useState } from 'react'
import reactLogo from '../images/logo512.png'
import "./Cards.css";

const Cards = ({amount, setPlayerTurn, incrementScore1, incrementScore2, resetScore, setDisableSelect, setRunningGame}) => {
    const [player1, setPlayer1] = useState(true)
    let secondCardOpen = false
    let firstCardNumber 
    let firstCardId
    let firstCardOpen = false
    const playerClass = player1 ? "player1" : "player2"
    
    const player1Styling  = "3px solid lightgreen"
    const player2Styling  = "3px solid orange"

    const randomNumbersArray = () => {
        let randomArray = []
        let completeArray = []
        
        for( let i = 0; i < amount; i++ ) {
            let randomCardNumber =  randomNumber()
            if(!randomArray.includes(randomCardNumber)) {
                randomArray.push(randomCardNumber)
            } else {
                i--
            }
        }
    completeArray = [...randomArray.concat(randomArray)]
    completeArray.sort(() => Math.random() - 0.5)
    return completeArray
    }

    const [allCards, setAllCards] = useState(randomNumbersArray())

    function randomNumber() {
        return Math.ceil(Math.random() * 50)
    }
    

    function handleClick(e) {
        e.preventDefault();
        if(!secondCardOpen) {
            let cardNumber = e.target.id.split("-")[0]
            let cardId = e.target.id.split("-")[1]
            let imageUrl = `https://pngimg.com/uploads/robot/small/robot_PNG${cardNumber}.png`
        
            if(e.target.className.includes("back") && !firstCardOpen) {
                openFirstCard(e, cardNumber, cardId, imageUrl)

            } else if(e.target.className.includes("back") && firstCardOpen) {
                e.target.src = imageUrl
                e.target.classList.add("front")
                e.target.classList.remove("back")
                secondCardOpen = true
                if(`${firstCardNumber}` === cardNumber) {
                    setCardWinner(e, firstCardNumber, firstCardId)
                } else {
                    showBackSide(e, firstCardNumber, firstCardId)
                }
            }
        }
    }  
    
    function setCardWinner(e, firstCardNumber, firstCardId) {
        firstCardOpen = false
        secondCardOpen = false
        if(player1) {
            document.getElementById(`${firstCardNumber}-${firstCardId}`).style.border =  player1Styling
            document.getElementById(e.target.id).style.border =  player1Styling
            incrementScore1()
        } else {
            document.getElementById(`${firstCardNumber}-${firstCardId}`).style.border =  player2Styling
            document.getElementById(e.target.id).style.border =  player2Styling
            incrementScore2()
        }
        firstCardNumber = ""
    }

    function showBackSide(e, firstCardNumber, firstCardId) {
        document.getElementById(`${firstCardNumber}-${firstCardId}`).classList.add("back");
            e.target.className = "back"
            firstCardOpen = false
            setTimeout(function() {
                document.getElementById(`${firstCardNumber}-${firstCardId}`).src = reactLogo
                e.target.src = reactLogo
                firstCardNumber = ""
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
    
    function openFirstCard(e, cardNumber, cardId, imageUrl) {
        e.target.src = imageUrl
        e.target.classList.add("front")
        e.target.classList.remove("back")
        firstCardNumber = cardNumber
        firstCardId = cardId
        firstCardOpen = true
    }
    
    
    function handleReset() {
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
            <button disabled={amount > 0 ? false : true} className="resetButton" onClick={handleReset}>Runde starten</button>
            
            {allCards.map((data, index) => (
            <img 
                key={index}
                id={`${data}-${index}`}
                src={reactLogo} 
                alt="" 
                style={{margin: "10px", backgroundColor: "#88998d", borderRadius: "8px"}}
                onClick={handleClick}
                className={`${playerClass} back`}
                />
            ))
            }
            <br />
        </div>
    )
}

export default Cards
