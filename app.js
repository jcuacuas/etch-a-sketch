const canvas = document.querySelector(".canvas");
const penBtn = document.querySelector("#pen-button");
const pencilBtn = document.querySelector("#pencil-button");
const rainbowBtn = document.querySelector("#rainbow-button");
const resetBtn = document.querySelector("#reset-button");
const slider = document.querySelector("#canvas-slider");
let rainbow = false;
let draw = false;
let pen = false;
let pencil = false;
let pixelQty = "100";
let hue = "0";
let drawSize = 2;


function getRainbowColor() {
    hue = parseInt(hue) + 5;
    if (hue === 360) {hue = 0}
    return hue + " 100 50";
}

function fillPixel() {
    let parent = this.parentNode;
    // y coordinate begins with 0 from top
    let yCoordinate = Array.prototype.indexOf.call(canvas.children, parent);
    yCoordinate -= drawSize;
    // x coordinate begins with 0 from the left
    let xCoordinate = Array.prototype.indexOf.call(parent.children, this);
    xCoordinate -= drawSize;
    let currentBackgroundColor = "hsl(" + getRainbowColor() + ")";
    for (let x = 0; x <= (drawSize * 2); x++, yCoordinate++) {
        let currentRow = canvas.children[yCoordinate];
        if (currentRow === undefined) {continue}
        let pixelCoordinate = xCoordinate;
        for (let i = 0; i <= (drawSize * 2); i++, pixelCoordinate++) {
            let currentPixel = currentRow.children[pixelCoordinate];
            if (currentPixel === undefined) {continue}
            if (rainbow === true) {
                currentPixel.style.background = currentBackgroundColor;
                currentPixel.style.opacity = "100%";
                continue;
            }
            currentPixel.classList.add("filled-pixels");
            if (pen === true) {
                currentPixel.style.opacity = "100%";
                continue;
            }
            let currentOpacity = currentPixel.style.opacity;
            currentOpacity *= 100;
            currentOpacity += 10;
            currentPixel.style.opacity = currentOpacity + "%";
        }
    }
}

function resetCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    if (this.id === "reset-button") {createCanvas(pixelQty);}
}

function createCanvas(quantity) {
    for (let x = 0; x < quantity; x++) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        canvas.appendChild(row);
        for (let i = 0; i < quantity; i++) {
            let pixel = document.createElement("div");
            pixel.setAttribute("class", "pixels");
            row.appendChild(pixel);
            pixel.addEventListener("mouseover", fillPixel);
        }
    }
    if (draw === true) {toggleDraw();}
}

function toggleRainbow() {
    console.log("rainbow")
    if (pencil === true) {togglePencil();}
    if (pen === true) {togglePen();}
    rainbow = !rainbow;
    rainbowBtn.classList.toggle("pressed");
    if (draw === true) {toggleDraw();}
}

function togglePen() {
    console.log("pen")
    if (pencil === true) {togglePencil();}
    if (rainbow === true) {toggleRainbow();}
    pen = !pen;
    penBtn.classList.toggle("pressed");
    if (draw === true) {toggleDraw();}
}

function togglePencil() {
    console.log("pencil")
    if (pen === true) {togglePen();}
    if (rainbow === true) {toggleRainbow();}
    pencil = !pencil;
    pencilBtn.classList.toggle("pressed");
    if (draw === true) {toggleDraw();}
}

function toggleDraw() {
    if (draw === true) {
        canvas.style.pointerEvents = "auto";
        document.querySelector("body").style.cursor = "crosshair";
    } else {
        canvas.style.pointerEvents = "none";
        document.querySelector("body").style.cursor = "auto";
    }
    draw = !draw;
}

function sliderFunction() {
    drawSize = this.value;
    if (draw === true) {toggleDraw();}
}

createCanvas(pixelQty);
togglePencil();
toggleDraw();

penBtn.addEventListener("click", togglePen);
pencilBtn.addEventListener("click", togglePencil);
rainbowBtn.addEventListener("click", toggleRainbow);
resetBtn.addEventListener("click", resetCanvas);
window.addEventListener("click", toggleDraw);
slider.addEventListener("change", sliderFunction);