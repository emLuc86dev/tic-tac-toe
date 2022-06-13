import React, { useState } from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

function Square({ num, data, onClick }) {
  return (
    <div className="square" style={squareStyle} onClick={() => onClick(num)}>
      {data}
    </div>
  );
}

function Board() {
  const [isXo, setIsXo] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();

  //logica del onClick
  const handleClick = (num) => {
    if (winner) return;

    if (cells[num] !== "") {
      return;
    }

    let squares = [...cells];
    if (isXo === "X") {
      squares[num] = "X";

      setIsXo("O");
    } else {
      squares[num] = "O";

      setIsXo("X");
    }

    handleWinner(squares);
    setCells(squares);
    // console.log(squares);
    console.log(cells.map((item) => item));
  };

  //definir si hay ganador
  const handleWinner = (squares) => {
    let posibleWinners = {
      horz: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      vert: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diag: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let pWinner in posibleWinners) {
      posibleWinners[pWinner].forEach((item) => {
        if (
          squares[item[0]] === "" ||
          squares[item[1]] === "" ||
          squares[item[2]] === ""
        ) {
          // nothing to do
        } else if (
          squares[item[0]] === squares[item[1]] &&
          squares[item[1]] === squares[item[2]]
        ) {
          setWinner(squares[item[0]]);
        }
      });
    }
  };

  //Resetear el juego
  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{isXo}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner ? winner : "None"}</span>
      </div>
      <button style={buttonStyle} onClick={handleRestart}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {[0, 1, 2].map((item) => {
            return (
              <Square key={item} num={item} data={cells[item]} onClick={handleClick} />
            );
          })}
          {/* <Square num={0} data={cells[0]} onClick={handleClick} />
          <Square num={1} data={cells[1]} onClick={handleClick} />
          <Square num={2} data={cells[2]} onClick={handleClick} /> */}
        </div>
        <div className="board-row" style={rowStyle}>
		{[3, 4, 5].map((item) => {
            return (
              <Square key={item} num={item} data={cells[item]} onClick={handleClick} />
            );
          })}
          {/* <Square num={3} data={cells[3]} onClick={handleClick} />
          <Square num={4} data={cells[4]} onClick={handleClick} />
          <Square num={5} data={cells[5]} onClick={handleClick} /> */}
        </div>
        <div className="board-row" style={rowStyle}>
		{[6, 7, 8].map((item) => {
            return (
              <Square key={item} num={item} data={cells[item]} onClick={handleClick} />
            );
          })}
          {/* <Square num={6} data={cells[6]} onClick={handleClick} />
          <Square num={7} data={cells[7]} onClick={handleClick} />
          <Square num={8} data={cells[8]} onClick={handleClick} /> */}
        </div>
      </div>
    </div>
  );
}

export function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
