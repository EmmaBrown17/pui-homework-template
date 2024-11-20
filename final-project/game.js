let gridSize = 5; 
let cellSize = 80; 
let gridState = []; 
let rowClues  = [[3], [1, 1], [5], [1, 1], [3]];
let colClues = [[1], [5], [1, 1, 1], [5], [1]];
let solution = [
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
];
let lives = 3;
let flashState = [];

function setup() {
  createCanvas(gridSize * cellSize + 100, gridSize * cellSize + 100);

  for (let i = 0; i < gridSize; i++) {
    gridState[i] = Array(gridSize).fill(0);
    flashState[i] = Array(gridSize).fill(false);
  }
}

function draw() {
  background(255);
  drawGrid();
  drawClues();
  displayLives();
  checkGameOver();
}

function drawGrid() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let x = col * cellSize + 100;
      let y = row * cellSize + 100;

      if (flashState[row][col]) {
        fill('red');
      }
      else if (gridState[row][col] === 1) {
        fill('black');
      }
      else {
        fill('white');
      }

      // fill(gridState[row][col] === 1 ? 'black' : 'white');
      stroke('black');
      rect(x, y, cellSize, cellSize);
    }
  }
}

function drawClues() {
    for (let i = 0; i < gridSize; i++) {
      let clueText = rowClues[i].join(' ');
      fill(0);
      textSize(18);
      textAlign(RIGHT, CENTER);
      text(clueText, 90, 100 + i * cellSize + cellSize / 2);

      // push();
      // translate(90, 100 + i * cellSize + cellSize / 2);
      // rotate(-HALF_PI);
      // text(clueText, 0, 0);
      // pop();
    }

    for (let i = 0; i < gridSize; i++) {
      let clueText = colClues[i].join(' ');
      fill(0);
      textSize(18);
      textAlign(CENTER, BOTTOM);
      text(clueText, 100 + i * cellSize + cellSize / 2, 90);
    }
}

function mousePressed() {
  let col = floor((mouseX - 100) / cellSize);
  let row = floor((mouseY - 100) / cellSize);

  if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
    if (solution[row][col] === 1) {
      gridState[row][col] = 1;
      console.log("Correct guess!");
    } else {
      lives--;
      flashState[row][col] = true;
      console.log("Wrong guess! Lives left: " + lives);
      setTimeout(() => {
        flashState[row][col] = false;
      }, 300);
    }

    checkSolution();
  }
}

function checkSolution() {
  let result = document.getElementById('result');
  if (arraysEqual(gridState, solution)) {
    result.textContent = 'You solved it!';
    result.style.color = 'green';
  } else if (lives <= 0) {
    result.textContent = 'Game over! You ran out of lives.';
    result.style.color = 'red';
    noLoop();
  } 
}

function arraysEqual(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function displayLives() {
    fill(0);
    textSize(20);
    text('Lives: ' + lives, 10, height - 10);
}

function checkGameOver() {
    if (lives <= 0) {
        let result = document.getElementById('result');
        result.textContent = 'Game Over! You ran out of lives.';
        result.style.color = 'red';
        noLoop();
    } else if (arraysEqual(gridState, solution)) {
        let result = document.getElementById('result');
        result.textContent = 'You solved it!';
        result.style.color = 'green';
        noLoop();
    }
}