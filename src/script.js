const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let speed = 500;

let currentTime = Date.now();
let pointA = { x: canvasWidth / 2, y: canvasHeight / 2 };
let target = { x: pointA.x, y: pointA.y };
let score = 0;

// Vị trí và kích thước của hình vuông vàng
let yellowSquare = { x: 100, y: 100, size: 50 };

// Vị trí và kích thước của hình vuông đen
let blackSquare = { x: 300, y: 300, size: 50 };

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  target.x = event.clientX - rect.left;
  target.y = event.clientY - rect.top;
});

function draw() {
  // calculate delta time
  const deltaT = (Date.now() - currentTime) / 1000;
  currentTime = Date.now();
  const fps = 1 / deltaT;

  // clear screen
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // move pointA towards target
  const dx = target.x - pointA.x;
  const dy = target.y - pointA.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance > 1) {
    pointA.x += (dx / distance) * speed * deltaT;
    pointA.y += (dy / distance) * speed * deltaT;
  }
  
  // fill circle
  ctx.beginPath();
  ctx.arc(pointA.x, pointA.y, 100, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
  
  // fill yellow square
  ctx.fillStyle = 'yellow';
  ctx.fillRect(yellowSquare.x, yellowSquare.y, yellowSquare.size, yellowSquare.size);
  
  // fill black square
  ctx.fillStyle = 'black';
  ctx.fillRect(blackSquare.x, blackSquare.y, blackSquare.size, blackSquare.size);
  
  // check collision with yellow square
  if (
    pointA.x + 100 > yellowSquare.x &&
    pointA.x - 100 < yellowSquare.x + yellowSquare.size &&
    pointA.y + 100 > yellowSquare.y &&
    pointA.y - 100 < yellowSquare.y + yellowSquare.size
  ) {
    score += 1;
    scoreElement.textContent = `Score: ${score}`;
    console.log("Score:", score);
    speed += 100;
    // Di chuyển hình vuông vàng đến vị trí ngẫu nhiên mới
    yellowSquare.x = Math.random() * (canvasWidth - yellowSquare.size);
    yellowSquare.y = Math.random() * (canvasHeight - yellowSquare.size);
    // Di chuyển hình vuông đen đến vị trí ngẫu nhiên mới mà không chùng với hình vuông vàng và đỏ
    do {
      blackSquare.x = Math.random() * (canvasWidth - blackSquare.size);
      blackSquare.y = Math.random() * (canvasHeight - blackSquare.size);
  } while (
      blackSquare.x < pointA.x + 100 &&
      blackSquare.x + blackSquare.size > pointA.x - 100 &&
      blackSquare.y < pointA.y + 100 &&
      blackSquare.y + blackSquare.size > pointA.y - 100
  );
  }
  
  // check collision with black square
  if (
    pointA.x + 100 > blackSquare.x &&
    pointA.x - 100 < blackSquare.x + blackSquare.size &&
    pointA.y + 100 > blackSquare.y &&
    pointA.y - 100 < blackSquare.y + blackSquare.size
  ) {
    alert("GAME OVER");
    // Reset game or stop the game loop
    clearInterval(gameLoop);
  }
}

const gameLoop = setInterval(draw, 1000 / 120);