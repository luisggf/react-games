import React, { useRef, useState } from "react";
import "./TicTacToe.css";

let data = ["", "", "", "", "", "", "", "", ""];
let isDraw = false;

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let winner_title = useRef<HTMLHeadingElement>(null);
  let box1 = useRef<HTMLHeadingElement>(null);
  let box2 = useRef<HTMLHeadingElement>(null);
  let box3 = useRef<HTMLHeadingElement>(null);
  let box4 = useRef<HTMLHeadingElement>(null);
  let box5 = useRef<HTMLHeadingElement>(null);
  let box6 = useRef<HTMLHeadingElement>(null);
  let box7 = useRef<HTMLHeadingElement>(null);
  let box8 = useRef<HTMLHeadingElement>(null);
  let box9 = useRef<HTMLHeadingElement>(null);

  let box_list = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e: React.MouseEvent, num: number) => {
    if (lock) {
      return 0;
    }
    if (count % 2 === 0) {
      e.currentTarget.innerHTML =
        '<img src="./src/components/Assets/cross.png">`)';
      data[num] = "x";
      setCount(++count);
    } else {
      e.currentTarget.innerHTML =
        '<img src="./src/components/Assets/circle.png">';
      data[num] = "o";
      setCount(++count);
    }
    check_win();
  };

  const won = (winner: string) => {
    setLock(true);
    if (winner === "x") {
      return (winner_title.current!.innerHTML =
        "Congratulations Player 1. You Won!");
    } else if (winner === "o") {
      return (winner_title.current!.innerHTML =
        "Congratulations Player 2. You Won!");
    } else {
      return (winner_title.current!.innerHTML = "It's a tie!");
    }
  };

  const check_win = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[1]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[4]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[7]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[3]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[4]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[5]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[4]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[4]);
    } else if (!data.includes("")) {
      isDraw = true;
      setLock(true);
      winner_title.current!.innerHTML = "It's a Draw!";
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    winner_title.current!.innerHTML = "Tic Tac Toe in <span>React</span>";
    box_list.map((e) => {
      e.current!.innerHTML = "";
    });
  };
  return (
    <div className="container">
      <h1 className="tictactoe-game-title" ref={winner_title}>
        Tic Tac Toe Game in <span>React</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" ref={box1} onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" ref={box2} onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" ref={box3} onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" ref={box4} onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" ref={box5} onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" ref={box6} onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" ref={box7} onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" ref={box8} onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" ref={box9} onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <div>
        <button
          className="reset-tictactoe"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
