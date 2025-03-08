let img;
let cssWidth, cssHeight;
let hoveredSquare = null;
let level7GridState = null;
let level8GridState = null;
let level9GridState = null;
let gridSize = 5;

function preload() {
    img = loadImage('images/SiteImages/paintings/mary-cassatt.jpeg');

    const isLevel7Completed = localStorage.getItem('level7Completed') === 'true';
    const isLevel8Completed = localStorage.getItem('level8Completed') === 'true';
    const isLevel9Completed = localStorage.getItem('level9Completed') === 'true';
    if (isLevel7Completed) {
        const savedGrid7 = localStorage.getItem('level7GridState');
        if (savedGrid7) {
            level7GridState = JSON.parse(savedGrid7);
        }
    }
    if (isLevel8Completed) {
        const savedGrid8 = localStorage.getItem('level8GridState');
        if (savedGrid8) {
            level8GridState = JSON.parse(savedGrid8);
        }
    }
    if (isLevel9Completed) {
        const savedGrid9 = localStorage.getItem('level9GridState');
        if (savedGrid9) {
            level9GridState = JSON.parse(savedGrid9);
        }
    }
}

function setup() {
    const imgElement = document.querySelector('.cassatt-level');
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
    drawSquare(170, 120, "Level 7", 110, 110, hoveredSquare === "Level 7", level7GridState); 
    drawSquare(450, 425, "Level 8", 110, 110, hoveredSquare === "Level 8", level8GridState);
    drawSquare(720, 240, "Level 9", 110, 110, hoveredSquare === "Level 9", level9GridState);

    if (level7GridState && level8GridState && level9GridState) {
        displayCompletionMessage();
    }
}

function displayCompletionMessage() {
    const completionMessageDiv = document.getElementById("completion-message");
    const infoMessageDiv = document.getElementById("information");

    completionMessageDiv.innerHTML = `Congratulations, all Mary Cassatt levels complete!<br>
    In the Loge has been added to your gallery.`;

    infoMessageDiv.innerHTML = `Created: 1878 <br><br>
    Period: Impressionism <br><br>
    During a period in which women had little freedom to explore public spaces without being accompanied by <br>
    a man, the opera house was one of the few places freely accessible to women, although still discouraged. Here, <br>
    Cassatt depicts a confident woman dominantly taking her rightful space, ignoring the man watching her on the other <br>
    side of the theatre. While many paintings of women attending the opera house were being made at the time, most <br>
    depicted women as part of the performance. Cassatt rejects this while acknowledging its reality.`

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
    const isLevel4Completed = localStorage.getItem("level7Completed") === "true";
    const isLevel5Completed = localStorage.getItem("level8Completed") === "true";
    const isLevel6Completed = localStorage.getItem("level9Completed") === "true";

    if (isLevel7Completed && isLevel8Completed && isLevel9Completed) {
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
        hoveredSquare = "Level 7";
        cursor('pointer');
    } else if (isInsideSquare(mouseX, mouseY, 450, 425, 110, 110)) {
        hoveredSquare = "Level 8";
        cursor('pointer');
    } else if (isInsideSquare(mouseX, mouseY, 720, 240, 110, 110)) {
        hoveredSquare = "Level 9";
        cursor('pointer');
    } else {
        hoveredSquare = null;
        cursor('default');
    }

    redraw();
}

function mousePressed() {
    if (isInsideSquare(mouseX, mouseY, 170, 120, 110, 110)) {
        window.location.href = "level7.html";
    }
    else if (isInsideSquare(mouseX, mouseY, 450, 425, 110, 110)) {
        window.location.href = "level8.html";
    }
    else if (isInsideSquare(mouseX, mouseY, 720, 240, 110, 110)) {
        window.location.href = "level9.html";
    }
}

function isInsideSquare(px, py, x, y, width, height) {
    return px > x && px < x + width && py > y && py < y + height;
}