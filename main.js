let statePen = true;
let stateEraser = false;
let stateRainbow = false;
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
    changeColor(col);
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
}


function changeColor(col) {
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

function reset() {
    const gridPaints = document.querySelectorAll(".col[style]");
    for (gridPaint of gridPaints) {
            gridPaint.removeAttribute("style");
    }
}

console.log(container.childElementCount);

const cells = document.getElementsByClassName("col");
const containerWrap = document.getElementsByClassName("container-wrap");
containerWrap[0].addEventListener("mouseup", () => {holdState = false;})

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);

const eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", () => {
    statePen = false;
    stateRainbow = false;
    stateEraser = true;
});

const penButton = document.getElementById("pen");
penButton.addEventListener("click", () => {
    stateRainbow = false;
    stateEraser= false;
    statePen = true;
});

const rainbowButton = document.getElementById("rainbow");
rainbowButton.addEventListener("click", () => {
    statePen = false;
    stateEraser= false;
    stateRainbow = true;
});

colorPicker.addEventListener("change", (event) => {
    const cols = document.getElementsByClassName("col");
    for (col of cols) {
        changeColor(col);
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
