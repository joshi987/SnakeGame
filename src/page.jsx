import { useEffect, useState } from "react";
import "./index.css";

export default function Home() {
  let cellArray = [];
  let totalGridside = 20;

  let intialSnakePosition = [
    { x: totalGridside / 2, y: totalGridside / 2 },
    { x: totalGridside / 2 + 1, y: totalGridside / 2 },
  ];

  const [food, setFood] = useState({ x: 5, y: 5 });
  const [snake, setSnake] = useState(intialSnakePosition);
  const [direction, setDirection] = useState("LEFT");
  const [score,setScore]=useState(0)

  function renderBoard() {
    for (let row = 0; row < totalGridside; row++) {
      for (let col = 0; col < totalGridside; col++) {
        //cell is classNmae that is present in the css file
        let className = "cell";

        let isFood = food.x === row && food.y === col;

        let isSnake = snake.some((ele) => ele.x === row && ele.y === col);

        let isSnkaeHead = snake[0].x === row && snake[0].y === col;
        //the color of food
        if (isFood) {
          className = className + " food";
        }
        // the collor of snake
        if (isSnake) {
          className = className + " snake";
        }
        //the collor of snakeHead
        if (isSnkaeHead) {
          className = className + " snakeHead";
        }

        let cell = <div className={className} key={`${row}-${col}`}></div>;
        cellArray.push(cell);
      }
    }
    return cellArray;
  }
  function gameOver(){
    setSnake(intialSnakePosition)
    setScore(0);
   }

  function updateGame() {

if(snake[0].x<0 || snake[0].x>20||snake[0].y<0||snake[0].y>20){
    gameOver()
    return;
 
}
let isBit=snake.slice(1).some(ele=>ele.x===snake[0].x && ele.y===snake[0].y);
if(isBit){
    gameOver()
    return;

}

    let newSnake = [...snake];

    switch (direction) {
      case "LEFT":
        newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y - 1 });
        break;
      case "RIGHT":
        newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + 1 });
        break;
      case "UP":
        newSnake.unshift({ x: newSnake[0].x - 1, y: newSnake[0].y });
        break;
      case "DOWN":
        newSnake.unshift({ x: newSnake[0].x + 1, y: newSnake[0].y });
        break;
    }

    let isAteFood=newSnake[0].x===food.x && newSnake[0].y===food.y;

if(isAteFood){
    setScore((prev)=>prev+1)
    renderFood();

}else{
    newSnake.pop();
}

   
    setSnake(newSnake);
}

function updateDirection(e){
    let code=e.code;
    switch(code){
        case "ArrowUp":
            if(direction!=="Down") setDirection("UP");
            break;
            case "ArrowDown":
            if(direction!=="UP") setDirection("DOWN");
            break;
            case "ArrowLeft":
            if(direction!=="RIGHT") setDirection("LEFT");
            break;
            case "ArrowRight":
            if(direction!=="LEFT") setDirection("RIGHT");
            break;
    }
}
function renderFood(){
    let xPosition=Math.floor(Math.random()*totalGridside);
    let yPosition=Math.floor(Math.random()*totalGridside);

    setFood({x:xPosition,y:yPosition});
}
  useEffect(() => {
    let interval = setInterval(updateGame, 500);
    return () => clearInterval(interval, updateGame);
  });

  useEffect(()=>{
    document.addEventListener("keydown", updateDirection);
    return () => clearInterval("keydown", updateDirection);
  })

  return (
    <div className="container">
      <div className="score">
        Score: <span>{score}</span>
      </div>
      <div className="board">{renderBoard()}</div>
    </div>
  );
}
