const container = document.getElementById("container-row-col");

function createRow() {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
}

function createCol() {
    const col = document.createElement("div");
    col.classList.add("col")
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

for (let i = 0; i < 16; i++) {
    insertRowToContainer(insertColToRow(createRow(), 16));
}

const cells = document.getElementsByClassName("col");
const containerWrap = document.getElementsByClassName("container-wrap");
containerWrap[0].addEventListener("mouseup", () => {holdState = false;})

let holdState = false;
for (cell of cells) {
    cell.addEventListener("mousedown", (event) => {
        holdState = true;
        event.target.style.background = "black";
    });
    cell.addEventListener("mouseup", () => {holdState = false;}); 
    cell.addEventListener("mouseover", (event) => {
        if(holdState) {
            event.target.style.background = "black";
        }
    });
}

// mousedown
// mouseover = hover
// (col) => col.target.style.background = "black"