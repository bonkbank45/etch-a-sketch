let statePen = true;
let stateEraser = false;
let stateRainbow = false;
let stateDarken = false;
let stateLighten = false;
let holdState = false;
let indexRainbow = 0;
const RAINBOW_PALLETE = ["#33A8C7", "#52E3E1", "#A0E426", 
                         "#FDF148", "#FFAB00", "#F77976", 
                         "#F050AE", "#D883FF", "#9336FD"];


const container = document.getElementById("container-row-col");
const slider = document.getElementById("myRange");
let outputSizeGrid = document.getElementById("grid-size-show");
let colorPicker = document.getElementById("currentColor");

function createRow() {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
}

function createCol() {
    const col = document.createElement("div");
    col.classList.add("col")
    setColor(col);
    col.style.background = "rgb(255,255,255)";
    return col;
}

function insertColToRow(row, amount) {
    for (let i = 0; i < amount; i++) {
        row.appendChild(createCol());
    }
    return row;
}

function insertRowToContainer(row) {
    container.appendChild(row);
}

function changeSizeGrid(amount) {
    const difference = amount - container.childElementCount;
    let previousGrid = document.getElementsByClassName("row");
    reset();
    if (container.childElementCount < amount) {
        addGrid(previousGrid, difference, amount);
    }
    if (container.childElementCount > amount){
        removeGrid(previousGrid, difference);
    }
}

function addGrid(previousGrid, difference, amountCol) {
    for (row of previousGrid) {
        for (let i = 0; i < difference; i++) {
        row.appendChild(createCol());
        }
    }
    for (let i = 0; i < difference; i++) {
        insertRowToContainer(insertColToRow(createRow(), amountCol));
    }
}

function removeGrid(previousGrid, difference) {
    for (row of previousGrid) {
        for (let i = 0; i > difference; i--) {
        row.removeChild(row.firstChild);
        }
    }
    for (let i = 0; i > difference; i--) {
        container.removeChild(container.firstChild);
    }
}

function stateBrush(event) {
    if (statePen) {
        event.target.style.background = colorPicker.value;}
    else if (stateEraser) { col.removeAttribute("style"); }
    else if (stateRainbow) {
        if (indexRainbow < 9) {
            event.target.style.background = RAINBOW_PALLETE[indexRainbow++];
        } else {
            indexRainbow = 0;
            event.target.style.background = RAINBOW_PALLETE[indexRainbow++];
        }
    }
    else if (stateDarken) {
        event.target.style.background = setShade(returnSplitRgb(event.target.style.background), -10);
    }
    else if (stateLighten) {
        event.target.style.background = setShade(returnSplitRgb(event.target.style.background),  10);
    }
}

function setColor(col) {
    col.addEventListener("mousedown", (event) => {
        holdState = true;
        stateBrush(event);
    });
    col.addEventListener("mouseup", () => {holdState = false;}); 
    col.addEventListener("mouseover", (event) => {
        if(holdState) {
            stateBrush(event);
        }
    });
}

function returnSplitRgb(value) {
    return value.match(/\d{1,3}/g);
}

function setShade(rgbcolor,percent) { //#FF00AA

    // get value int hex color
    let R = rgbcolor[0];
    let G = rgbcolor[1];
    let B = rgbcolor[2];

    /* calculate by percent
       and check if pure black 0 - 55 jump to 60
       so it will light to gray instantly 
    */
    if (R > 55 && G > 55 && B >  55) {
        R = R * ((100 + percent) / 100);
        G = G * ((100 + percent) / 100);
        B = B * ((100 + percent) / 100);
    } else {
        R = G = B = 60;
    }

    /*

    // check value rgb is valid or not
    R = (R > 255) ? R : "0";
    G = (G > 255) ? G : "0";
    B = (B > 255) ? B : "0";

    // round number
    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    // valid 1 digit number and return to string
    let RR = (R.toString().length === 1) ? "0"+ R.toString(16) : R.toString(16);
    let GG = (G.toString().length === 1) ? "0"+ G.toString(16) : G.toString(16);
    let BB = (B.toString().length === 1) ? "0"+ B.toString(16) : B.toString(16);
    */

    // round number
    R = Math.floor(R);
    G = Math.floor(G);
    B = Math.floor(B);
    
    return `rgb(${R},${G},${B})`
}

function reset() {
    const gridPaints = document.querySelectorAll(".col[style]");
    for (gridPaint of gridPaints) {
        gridPaint.style.background = "rgb(255,255,255)";
        //gridPaint.removeAttribute("style");
    }
}

const cells = document.getElementsByClassName("col");
const containerWrap = document.getElementsByClassName("container-wrap");
containerWrap[0].addEventListener("mouseup", () => {holdState = false;})

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);

const eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", () => {
    statePen = false;
    stateRainbow = false;
    stateDarken = false;
    stateLighten = false;
    stateEraser = true;
});

const penButton = document.getElementById("pen");
penButton.addEventListener("click", () => {
    stateRainbow = false;
    stateEraser = false;
    stateDarken = false;
    stateLighten = false;
    statePen = true;
});

const rainbowButton = document.getElementById("rainbow");
rainbowButton.addEventListener("click", () => {
    statePen = false;
    stateEraser= false;
    stateDarken = false;
    stateLighten = false;
    stateRainbow = true;
});

const darkenButton = document.getElementById("darken");
darkenButton.addEventListener("click", () => {
    statePen = false;
    stateEraser= false;
    stateRainbow = false;
    stateLighten = false;
    stateDarken = true;
});

const lightenButton = document.getElementById("lighten");
lightenButton.addEventListener("click", () => {
    statePen = false;
    stateEraser= false;
    stateRainbow = false;
    stateDarken = false;
    stateLighten = true;
})

colorPicker.addEventListener("change", (event) => {
    const cols = document.getElementsByClassName("col");
    for (col of cols) {
        setColor(col);
    }
}, false);

outputSizeGrid.textContent = `${slider.value} x ${slider.value}`;
slider.addEventListener("input", (event) => {
    outputSizeGrid.textContent = `${event.target.value} x ${event.target.value}`;
    changeSizeGrid(event.target.value);
});

for (let i = 0; i < 32; i++) {
    insertRowToContainer(insertColToRow(createRow(), 32));
}
