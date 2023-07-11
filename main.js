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
        event.target.style.background = "black";
    });
    col.addEventListener("mouseup", () => {holdState = false;}); 
    col.addEventListener("mouseover", (event) => {
        if(holdState) {
            event.target.style.background = "black";
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

function changeGridSize() {

}

for (let i = 0; i < 32; i++) {
    insertRowToContainer(insertColToRow(createRow(), 32));
}

function changeSizeGrid(amount) {
    const difference = amount - container.childElementCount;
    let previousRow = document.getElementsByClassName("row");
    reset();
    if (container.childElementCount < amount) {
        for (row of previousRow) {
            for (let i = 0; i < difference; i++) {
            row.appendChild(createCol());
            }
        }
        for (let i = 0; i < difference; i++) {
            insertRowToContainer(insertColToRow(createRow(), amount));
        }
    }
    if (container.childElementCount > amount){
        for (row of previousRow) {
            for (let i = 0; i > difference; i--) {
            row.removeChild(row.firstChild);
            }
        }
        for (let i = 0; i > difference; i--) {
            container.removeChild(container.firstChild);
        }
    }
}

function reset() {
    const cellPaints = document.querySelectorAll(".col[style]");
    for (cell of cellPaints) {
            cell.removeAttribute("style");
    }
}

console.log(container.childElementCount);

const cells = document.getElementsByClassName("col");
const containerWrap = document.getElementsByClassName("container-wrap");
containerWrap[0].addEventListener("mouseup", () => {holdState = false;})

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);

outputSizeGrid.textContent = `${slider.value} x ${slider.value}`;
slider.addEventListener("input", (event) => {
    outputSizeGrid.textContent = `${event.target.value} x ${event.target.value}`;
    changeSizeGrid(event.target.value);
});