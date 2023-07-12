let state = {
    pen: true,
    eraser: false,
    rainbow: false,
    darken: false,
    lighten: false,
    hold: false
};

let indexRainbow = 0;

const RAINBOW_PALLETE = ["#33A8C7", "#52E3E1", "#A0E426", 
                         "#FDF148", "#FFAB00", "#F77976", 
                         "#F050AE", "#D883FF", "#9336FD"];


const container = document.getElementById("container-row-col");
const slider = document.getElementById("myRange");
let outputSizeGrid = document.getElementById("grid-size-show");
let colorPicker = document.getElementById("currentColor");

const audio1 = document.querySelector(`audio[data-sound="${1}"]`);
const audio2 = document.querySelector(`audio[data-sound="${2}"]`);
audio1.volume = 0.2;
audio2.volume = 0.2;

function createRow() {
    const row = document.createElement("div");
    row.classList.add("row");
    return row;
}

function createCol() {
    const col = document.createElement("div");
    col.classList.add("col")
    addEventToCol(col);
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
    if (state.pen) {
        event.target.style.background = colorPicker.value;}
    else if (state.eraser) { event.target.style.background = "rgb(255,255,255)" }
    else if (state.rainbow) {
        if (indexRainbow < 9) {
            event.target.style.background = RAINBOW_PALLETE[indexRainbow++];
        } else {
            indexRainbow = 0;
            event.target.style.background = RAINBOW_PALLETE[indexRainbow++]; } }
    else if (state.darken) {
        event.target.style.background = setShade(returnSplitRgb(event.target.style.background), -10);}
    else if (state.lighten) {
        event.target.style.background = setShade(returnSplitRgb(event.target.style.background),  10);}
}

function addEventToCol(col) {
    col.addEventListener("mousedown", (event) => {
        state.hold = true;
        stateBrush(event);
    });
    col.addEventListener("mouseup", () => {state.hold = false;}); 
    col.addEventListener("mouseover", (event) => {
        if(state.hold) {
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
    // calculate by percent
    if (R > 0 && G >= 0 && B >=  0) {
        R = R * ((100 + percent) / 100);
        G = G * ((100 + percent) / 100);
        B = B * ((100 + percent) / 100);
    } else {
        R = G = B = 60;
    }

    R = Math.floor(R);
    G = Math.floor(G);
    B = Math.floor(B);

    return `rgb(${R},${G},${B})`
}

function reset() {
    const gridPaints = document.querySelectorAll(".col[style]");
    for (gridPaint of gridPaints) {
        gridPaint.style.background = "rgb(255,255,255)";
    }
}

function playSound(sound) {
    if (!sound) return; // stop the function from running all together
        sound.currentTime = 0; // rewind to the start
        sound.play();
    if (!sound) return; // stop the function from running all together
        sound.currentTime = 0; // rewind to the start
        sound.play();
}

const cells = document.getElementsByClassName("col");
const containerWrap = document.getElementsByClassName("container-wrap");
containerWrap[0].addEventListener("mouseup", () => {holdState = false;})

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
    playSound(audio1);
    reset();
});

const eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", () => {
    state.pen = false;
    state.rainbow = false;
    state.darken = false;
    state.lighten = false;
    state.eraser = true;
    audio1.volume = 0.2;
    playSound(audio1);
});

const penButton = document.getElementById("pen");
penButton.addEventListener("click", () => {
    state.rainbow = false;
    state.eraser = false;
    state.darken = false;
    state.lighten = false;
    state.pen = true;
    audio1.volume = 0.2;
    playSound(audio1);
});

const rainbowButton = document.getElementById("rainbow");
rainbowButton.addEventListener("click", () => {
    state.pen = false;
    state.eraser = false;
    state.darken = false;
    state.lighten = false;
    state.rainbow = true;
    audio2.volume = 0.2;
    playSound(audio2);
});

const darkenButton = document.getElementById("darken");
darkenButton.addEventListener("click", () => {
    state.pen = false;
    state.eraser = false;
    state.rainbow = false;
    state.lighten = false;
    state.darken = true;
    audio2.volume = 0.2;
    playSound(audio2);
});

const lightenButton = document.getElementById("lighten");
lightenButton.addEventListener("click", () => {
    state.pen = false;
    state.eraser = false;
    state.rainbow = false;
    state.darken = false;
    state.lighten = true;
    audio2.volume = 0.2;
    playSound(audio2);
});

colorPicker.addEventListener("change", (event) => {
    const cols = document.getElementsByClassName("col");
    for (col of cols) {
        addEventToCol(col);
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
