console.log("test");

// * MY CANVAS SETUP

const canvas = document.querySelector("#my-canvas");
canvas.style.backgroundColor = "lightgray";
canvas.width = 600;
canvas.height = 800;

const ctx = canvas.getContext("2d");

// * GLOBAL VARIABLES
let ballX = 50;
let ballY = 50;
let ballXDirection = 1;
let ballYDirection = 1;
let ballSpeed = 5;
let ballRadious = 15;
let paddleX = canvas.width / 3;
let paddleY = canvas.height - 40;
let paddleWidth = 120;
let paddleHeight = 30;
let isGameRunning = true;

// * FUNCTIONS

paddleBallCollision = () => {
  if (ballY + ballRadious > paddleY && ballX > paddleX && ballX < paddleX + paddleWidth) {
    ballYDirection = -1 
  }
}

paddleMovement = (event) => {
  // console.log("clicking things")
  // here I will need to check which event am I triggering
  // let buttonBeingClicked = event.code;
  // if it is the one I want, move the paddle
  if (event.code === "ArrowRight") {
    paddleX = paddleX + 20;
  } else if (event.code === "ArrowLeft") {
    paddleX = paddleX - 20;
  }
};

const paddleDraw = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
};

const ballWallCollision = () => {
  // if x of the ball is higher than width of canvas

  // collision right right wall
  if (ballX > canvas.width - ballRadious) {
    ballXDirection = -1;
  }

  // collision with bottom wall
  if (ballY > canvas.height - ballRadious) {
    // ballYDirection = -1;
    isGameRunning = false;
  }

  // colision for left wall
  if (ballX < 0 + ballRadious) {
    ballXDirection = 1;
  }

  // collision for top wall
  if (ballY < 0 + ballRadious) {
    ballYDirection = 1;
  }
};

const ballMovement = () => {
  ballX = ballX + ballSpeed * ballXDirection; // => 1 or -1
  ballY = ballY + ballSpeed * ballYDirection;
};

const ballDraw = () => {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(ballX, ballY, ballRadious, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

const gameLoop = () => {
  // console.log("yay, loop running!")
  // 1. clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. elements moving or changing
  ballMovement();
  ballWallCollision();
  paddleBallCollision();

  // 3. draw elements
  ballDraw();
  paddleDraw();

  // 4. animation frame and game logic

  if (isGameRunning) {
    requestAnimationFrame(gameLoop);
  };
};


// * ADDEVENTLISTENERS
window.addEventListener("keydown", paddleMovement);

gameLoop();

// ! BONUSES :D
// PREVENTING PADDLES FROM HITTING THE WALL.
// INCREASING THE SPEED OF THE BALLE AFTER EACH HIT
  // NOT ON EACH HIT, BUT EVERY 5 HITS.
// SCORE INCREASES ON EACH PADDLE HIT