let gridSize = 5; 
let cellSize = 80; 
let gridState = []; 
let rowClues  = [[1, 1], [0], [2], [0], [4]];
let colClues = [[0], [1, 1], [1, 1], [1, 1], [1, 1]];
let solution = [
  [0, 1, 0, 0, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1],
];
let lives = 3;
let flashState = [];

function setup() {
  createCanvas(gridSize * cellSize + 150, gridSize * cellSize + 150);

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

      stroke('black');
      rect(x, y, cellSize, cellSize);

      if (gridState[row][col] === -1) {
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('X', x + cellSize / 2, y + cellSize / 2);
      }
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
    if (mouseButton === LEFT) {
        if (solution[row][col] === 1) {
            gridState[row][col] = 1;
            console.log("Correct guess!");
        } else if (gridState[row][col] === 0) {
            lives--;
            flashState[row][col] = true;
            console.log("Wrong guess! Lives left: " + lives);
            setTimeout(() => {
                flashState[row][col] = false;
            }, 300);
        }
    } else if (mouseButton === RIGHT) {
        if (gridState[row][col] === 0) {
            gridState[row][col] = -1;
        } else if (gridState[row][col] === -1){
            gridState[row][col] = 0;
        }
    }

    checkSolution();
  }
}

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

function checkSolution() {
  let result = document.getElementById('result');

  let isCorrect = true;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        if (gridState[row][col] !== -1 && gridState[row][col] !== solution[row][col]) {
            isCorrect = false;
            break;
        }
    }
    if (!isCorrect) break;
  }

  if (isCorrect) {
    result.textContent = 'You solved it!';
    result.style.color = 'green';

    localStorage.setItem('level1GridState', JSON.stringify(gridState));
    window.location.href = "sofonisba.html";
    
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
    textAlign(LEFT, CENTER);
    text('Lives: ' + lives, 0, 70);
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