let pen = true;
let eraser = false;

const container = document.getElementById("container-row-col");
const slider = document.getElementById("myRange");
let outputSizeGrid = document.getElementById("grid-size-show");

function createRow() {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
}

let holdState = false;
function createCol() {
    const col = document.createElement("div");
    col.classList.add("col")
    col.addEventListener("mousedown", (event) => {
        holdState = true;
        if (pen) {
            event.target.style.background = "black";
        }
        if (eraser) {
            col.removeAttribute("style");
        }
    });
    col.addEventListener("mouseup", () => {holdState = false;}); 
    col.addEventListener("mouseover", (event) => {
        if(holdState) {
            if (pen) {
                event.target.style.background = "black";
            }
            if (eraser) {
                col.removeAttribute("style");
            }
        }
    });
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

function selectBrush() {

}

function penBrush() {

}

function eraserBrush() {

}

function rainbowBrush() {

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
    pen = false;
    eraser = true;
});

const penButton = document.getElementById("pen");
penButton.addEventListener("click", () => {
    pen = true;
    eraser= false;
});

const color = document.getElementById("current-color");

outputSizeGrid.textContent = `${slider.value} x ${slider.value}`;
slider.addEventListener("input", (event) => {
    outputSizeGrid.textContent = `${event.target.value} x ${event.target.value}`;
    changeSizeGrid(event.target.value);
});

for (let i = 0; i < 32; i++) {
    insertRowToContainer(insertColToRow(createRow(), 32));
}