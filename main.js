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

for (let i = 0; i < 32; i++) {
    insertRowToContainer(insertColToRow(createRow(), 32));
}

const paintRow = document.getElementsByClassName("col");

for (col of paintRow) {
    col.addEventListener("mousedown", (col) => col.target.style.background = "black");
}




