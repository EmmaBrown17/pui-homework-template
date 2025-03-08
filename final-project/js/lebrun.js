let img;
let cssWidth, cssHeight;
let hoveredSquare = null;
let level4GridState = null;
let level5GridState = null;
let level6GridState = null;
let gridSize = 5;

function preload() {
    img = loadImage('images/SiteImages/paintings/lebrun.jpg');

    const isLevel4Completed = localStorage.getItem('level4Completed') === 'true';
    const isLevel5Completed = localStorage.getItem('level5Completed') === 'true';
    const isLevel6Completed = localStorage.getItem('level6Completed') === 'true';
    if (isLevel4Completed) {
        const savedGrid4 = localStorage.getItem('level4GridState');
        if (savedGrid4) {
            level4GridState = JSON.parse(savedGrid4);
        }
    }
    if (isLevel5Completed) {
        const savedGrid5 = localStorage.getItem('level5GridState');
        if (savedGrid5) {
            level5GridState = JSON.parse(savedGrid5);
        }
    }
    if (isLevel6Completed) {
        const savedGrid6 = localStorage.getItem('level6GridState');
        if (savedGrid6) {
            level6GridState = JSON.parse(savedGrid6);
        }
    }
}

function setup() {
    const imgElement = document.querySelector('.lebrun-level');
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

    //update square locations once works
    drawSquare(170, 120, "Level 4", 110, 110, hoveredSquare === "Level 4", level4GridState); 
    drawSquare(450, 425, "Level 5", 110, 110, hoveredSquare === "Level 5", level5GridState);
    drawSquare(720, 240, "Level 6", 110, 110, hoveredSquare === "Level 6", level6GridState);

    if (level4GridState && level5GridState && level6GridState) {
        displayCompletionMessage();
    }
}

function displayCompletionMessage() {
    const completionMessageDiv = document.getElementById("completion-message");
    const infoMessageDiv = document.getElementById("information");

    completionMessageDiv.innerHTML = `Congratulations, all Elisabeth Vigee Le Brun levels complete!<br>
    Self-Portrait with Her Daughter Julie has been added to your gallery.`;

    infoMessageDiv.innerHTML = `Created: 1789 <br><br>
    Period: Neoclassicism <br><br>
    During the late 18th century, clothing such as green silk and red ribbon draped loosely was a <br>
    sign of timeless beauty and virtue. By depicting herself in this drapery while embracing her daughter, <br>
    Elisabeth Vigee Le Brun is challenging the viewer to acknowledge the multifaceted power of mothers. <br>
    Painting was seen as primarily a male dominated craft and mothers were expected to spend all of their time <br>
    caring for their children. Le Brun is showing the viewer that women can be both great mothers and painters.`

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
    const isLevel4Completed = localStorage.getItem("level4Completed") === "true";
    const isLevel5Completed = localStorage.getItem("level5Completed") === "true";
    const isLevel6Completed = localStorage.getItem("level6Completed") === "true";

    if (isLevel4Completed && isLevel5Completed && isLevel6Completed) {
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

//update once works
function mouseMoved() {
    if (isInsideSquare(mouseX, mouseY, 170, 120, 110, 110)) {
        hoveredSquare = "Level 4";
        cursor('pointer');
    } else if (isInsideSquare(mouseX, mouseY, 450, 425, 110, 110)) {
        hoveredSquare = "Level 5";
        cursor('pointer');
    } else if (isInsideSquare(mouseX, mouseY, 720, 240, 110, 110)) {
        hoveredSquare = "Level 6";
        cursor('pointer');
    } else {
        hoveredSquare = null;
        cursor('default');
    }

    redraw();
}

function mousePressed() {
    if (isInsideSquare(mouseX, mouseY, 170, 120, 110, 110)) {
        window.location.href = "level4.html";
    }
    else if (isInsideSquare(mouseX, mouseY, 450, 425, 110, 110)) {
        window.location.href = "level5.html";
    }
    else if (isInsideSquare(mouseX, mouseY, 720, 240, 110, 110)) {
        window.location.href = "level6.html";
    }
}

function isInsideSquare(px, py, x, y, width, height) {
    return px > x && px < x + width && py > y && py < y + height;
}