import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import "../../index.css";
import Square from "../Square/square";
import Restart from "../Restart/restart";

let gameScore = { playerXScore :0, playerOScore :0 };

function Game() {
    const [ squares, setSquares ] = useState(Array(9).fill(null));
    const [ isXNext, setIsXNext ] = useState(true);
    const nextPlayer = isXNext ? "X" : "O";
    const winner = getWinner(squares);
    const scoreBoard = prepareScoreBoard();

  
    function getGameStatus() {
      if (winner) {
        return "Kazanan: " + winner;
      } else if (isGameBoardFull(squares)) {
        return "Berabere";
      } else {
        return "Sıradaki: " + nextPlayer;
      }
    } 

    function prepareScoreBoard(){
        if(winner){
            let isX = winner == "X";
            let currentXScore = gameScore.playerXScore;
            let currentOScore = gameScore.playerOScore;

            if(isX){
                currentXScore += 1;
            }else{
                currentOScore += 1;
            }

            let lastScoreObject = {playerXScore : currentXScore,playerOScore:currentOScore};
            gameScore = lastScoreObject;

            //setGameScore(lastScoreObject);
            return lastScoreObject;
        }

        return gameScore;
    }
  
    function renderSquare(i) {
      return (
        <Square
          value={squares[i]}
          onClick={() => {
            if (squares[i] != null || winner != null) {
              return;
            }
            const nextSquares = squares.slice();
            nextSquares[i] = nextPlayer;
            setSquares(nextSquares);
            setIsXNext(!isXNext);
          }}
        />
      );
    }
  
    function renderRestartButton(isGameRefresh) {
        return (
            <Restart
              onClick={() => {

                if(isGameRefresh){
                    gameScore = { playerXScore :0 ,playerOScore :0};
                }

                setSquares(Array(9).fill(null));
                setIsXNext(true);
              }
            } gameRefresh = {isGameRefresh}
            />
          );
    }

    return (
      <div className="container">
        <div className="game">
        <div className="score-board"> X : {scoreBoard != null ? scoreBoard.playerXScore : 0} vs O : {scoreBoard != null ?  scoreBoard.playerOScore : 0} </div>
          <div className="game-board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <div className="game-live">{getGameStatus()}</div>
          <div className="restart-button">{renderRestartButton(false)}</div>
          <div className="restart-button">{renderRestartButton(true)}</div>
        </div>
      </div>
    );

    function getWinner(squares) {
        //Tüm galibiyet ihtimalleri
        const winConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < winConditions.length; i++) {
          const [a, b, c] = winConditions[i];
          // üç karede de o var mı? üçünde de X var mı diye kontrol
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
      
      function isGameBoardFull(squares) {
        for (let i = 0; i < squares.length; i++) {
          if (squares[i] == null) {
            return false;
          }
        }
        return true;
      }
  }

  export default Game;