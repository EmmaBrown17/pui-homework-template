let img;
let cssWidth, cssHeight;
let hoveredSquare = null;
let level1GridState = null;
let level2GridState = null;
let level3GridState = null;
let gridSize = 5;

function preload() {
    img = loadImage('images/SiteImages/paintings/sofonisba-anguissola.jpg');

    const isLevel1Completed = localStorage.getItem('level1Completed') === 'true';
    const isLevel2Completed = localStorage.getItem('level2Completed') === 'true';
    const isLevel3Completed = localStorage.getItem('level3Completed') === 'true';
    if (isLevel1Completed) {
        const savedGrid = localStorage.getItem('level1GridState');
        if (savedGrid) {
            level1GridState = JSON.parse(savedGrid);
        }
    }
    if (isLevel2Completed) {
        const savedGrid2 = localStorage.getItem('level2GridState');
        if (savedGrid2) {
            level2GridState = JSON.parse(savedGrid2);
        }
    }
    if (isLevel3Completed) {
        const savedGrid3 = localStorage.getItem('level3GridState');
        if (savedGrid3) {
            level3GridState = JSON.parse(savedGrid3);
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
    drawSquare(450, 425, "Level 2", 110, 110, hoveredSquare === "Level 2", level2GridState);
    drawSquare(720, 240, "Level 3", 110, 110, hoveredSquare === "Level 3", level3GridState);

    if (level1GridState && level2GridState && level3GridState) {
        displayCompletionMessage();
    }
}

function displayCompletionMessage() {
    const completionMessageDiv = document.getElementById("completion-message");
    const infoMessageDiv = document.getElementById("information");

    completionMessageDiv.innerHTML = `Congratulations, all Sofonisba Anguissola levels complete!<br>
    The Chess Game has been added to your gallery.`;

    infoMessageDiv.innerHTML = `Created: 1555 <br><br>
    Period: Renaissance <br><br>
    During the Italian Renaissance, Chess, along with painting, was seen as too complex for women <br>
    to partake in. By depicting her three young sisters playing Chess, Anguissola was challenging <br>
    the viewer to see women on the same intellectual level as men. Moreover, the winner of the game <br>
    can be seen holding the Queen, the most powerful piece. She looks back at the viewer with a self-assured <br>
    glance, forcing the audience to see women as more than just pawns.`

    completionMessageDiv.style.display = "block";
    completionMessageDiv.classList.add("visible");

    clearGridAndSquares();
}

function clearGridAndSquares() {
    const canvas = document.querySelector("canvas");
    if (canvas) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const isLevel1Completed = localStorage.getItem("level1Completed") === "true";
    const isLevel2Completed = localStorage.getItem("level2Completed") === "true";
    const isLevel3Completed = localStorage.getItem("level3Completed") === "true";

    if (isLevel1Completed && isLevel2Completed && isLevel3Completed) {
        displayCompletionMessage();
    }
});

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
            let color = gridState[row][col] === 1 ? 'black' : gridState[row][col] === 0 ? 'white' : 'white';
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