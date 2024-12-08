let img;
let cssWidth, cssHeight;
let hoveredSquare = null;
let level1GridState = null;
let gridSize = 5;

function preload() {
    img = loadImage('images/SiteImages/paintings/sofonisba-anguissola.jpg');

    const isLevel1Completed = localStorage.getItem('level1Completed') === 'true';
    if (isLevel1Completed) {
        const savedGrid = localStorage.getItem('level1GridState');
        if (savedGrid) {
            level1GridState = JSON.parse(savedGrid);
        }
    }
}

function setup() {
    const imgElement = document.querySelector('.sofonisba-level');
    cssWidth = imgElement.offsetWidth;
    cssHeight = imgElement.offsetHeight;

    const canvas = createCanvas(cssWidth, cssHeight);
    canvas.parent(document.querySelector('.paintings'));
    canvas.style('z-index', '2');
    canvas.style('position', 'absolute');

    noLoop();
}

function draw() {
    image(img, 0, 0, cssWidth, cssHeight);

    drawSquare(170, 120, "Level 1", 110, 110, hoveredSquare === "Level 1", level1GridState); 
    drawSquare(450, 425, "Level 2", 110, 110, hoveredSquare === "Level 2");
    drawSquare(720, 240, "Level 3", 110, 110, hoveredSquare === "Level 3");
}

function drawSquare(x, y, label, width, height, isHovered, gridState) {
    noStroke();
    fill(isHovered ? 'lightblue' : 'white');
    rect(x, y, width, height);

    if (gridState) {
        drawGridOnSquare(x, y, width, gridState);
    } else {
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(14);
        text(label, x + width / 2, y + height / 2);
    }
}

function drawGridOnSquare(x, y, width, gridState) {
    const cellSize = width / gridSize;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let color = gridState[row][col] === 1 ? 'black' : gridState[row][col] === 0 ? 'white' : 'gray';
            fill(color);
            noStroke();
            rect(x + col * cellSize, y + row * cellSize, cellSize, cellSize);
        }
    }
}

function mouseMoved() {
    if (isInsideSquare(mouseX, mouseY, 170, 120, 110, 110)) {
        hoveredSquare = "Level 1";
        cursor('pointer');
    } else if (isInsideSquare(mouseX, mouseY, 450, 425, 110, 110)) {
        hoveredSquare = "Level 2";
        cursor('pointer');
    } else if (isInsideSquare(mouseX, mouseY, 720, 240, 110, 110)) {
        hoveredSquare = "Level 3";
        cursor('pointer');
    } else {
        hoveredSquare = null;
        cursor('default');
    }

    redraw();
}

function mousePressed() {
    if (isInsideSquare(mouseX, mouseY, 170, 120, 110, 110)) {
        window.location.href = "level1.html";
    }
    else if (isInsideSquare(mouseX, mouseY, 450, 425, 110, 110)) {
        window.location.href = "level2.html";
    }
    else if (isInsideSquare(mouseX, mouseY, 720, 240, 110, 110)) {
        window.location.href = "level3.html";
    }
}

function isInsideSquare(px, py, x, y, width, height) {
    return px > x && px < x + width && py > y && py < y + height;
}