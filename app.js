const container = document.querySelector(".container");
const editBtn = document.querySelector("#edit-button");
const rainbowBtn = document.querySelector("#rainbow-button");
const resetBtn = document.querySelector("#reset-button");
let rainbow = false;
let pixelQty = "16";
let hue = "0";


function getRainbowColor() {
    hue = parseInt(hue) + 5;
    if (hue === 360) {hue = 0;}
    return hue + " 100 50";
}

function fillPixel() {
    this.classList.add("filled-pixels");
    let currentOpacity = this.style.opacity;
    // currentOpacity value turns into float with this.style.opacity i.e. 0.1
    currentOpacity *= 100;
    currentOpacity += 10;
    this.style.opacity = currentOpacity + "%";
    if (rainbow === true) {
        this.style.background = "hsl(" + getRainbowColor()+ ")";
        this.style.opacity = "100%";
    }
}


function resetCanvas() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    if (this.id === "reset-button") {createCanvas(pixelQty);}
}

function createCanvas(quantity) {
    for (let x = 0; x < quantity; x++) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        container.appendChild(row);
        for (let i = 0; i < quantity; i++) {
            let pixel = document.createElement("div");
            pixel.setAttribute("class", "pixels");
            row.appendChild(pixel);
            pixel.addEventListener("mouseover", fillPixel);
        }
    }
}

function customizeCanvas() {
    pixelQty = prompt("How many pixels do you want [1 - 100]", "16");
    if (pixelQty > 100 || pixelQty <= 0) {
        alert("Invalid pixel amount");
    } else {
        resetCanvas();
        createCanvas(pixelQty);
    }
}

function toggleRainbow() {
    alert("toggled rainbow");
    rainbow = !rainbow;
}

createCanvas(16);
editBtn.addEventListener("click", customizeCanvas);
rainbowBtn.addEventListener("click", toggleRainbow);
resetBtn.addEventListener("click", resetCanvas);