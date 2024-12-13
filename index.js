let canvas;
let ctx;

let grid;
let rows;
let cols;

let init = () => {
    canvas = document.getElementById("backgroundCanvas");
    ctx = canvas.getContext("2d");

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = document.documentElement.scrollHeight;

    rows = Math.ceil(document.documentElement.scrollHeight / 10);
    cols = Math.ceil(canvas.width / 10);

    grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols).fill(0);
    }
}

let drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, document.documentElement.scrollHeight);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, document.documentElement.scrollHeight);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            ctx.fillStyle = grid[i][j] === 1 ? "#EEEEEE" : "#FFFFFF";
            ctx.fillRect(j * 10, i * 10, 10, 10);
        }
    }
}

let countNeighbors = (x , y) => {
    let count = 0;
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            if(i === 0 && j === 0) continue;
            let row = (x + i + rows) % rows;
            let col = (y + j + cols) % cols;
            count += grid[row][col];
        }
    }
    return count;
};

let updateGrid = () => {
    let newGrid = new Array(rows);
    for(let i = 0; i < rows; i++) {
        newGrid[i] = new Array(cols).fill(0);
    }

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            let aliveNeighbors = countNeighbors(i, j);

            if(grid[i][j] === 1 && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
                newGrid[i][j] = 1;
            } else if(grid[i][j] === 0 && aliveNeighbors === 3) {
                newGrid[i][j] = 1;
            } 
        }
    }
    grid = newGrid;
};

window.onresize = () => {
    init();
}

loop = () => {
    updateGrid();
    drawGrid();
    setTimeout(loop, 10);
}

window.onload = () => {
    init();
    window.onmousemove = (e) => {
        let x = Math.floor((e.clientX + window.scrollX) / 10);
        let y = Math.floor((e.clientY + window.scrollY) / 10);
        grid[y][x] = 1;
        grid[y][x + 1] = 1;
        grid[y][x - 1] = 1;
        grid[y + 1][x] = 1;
        grid[y - 1][x] = 1;
    };
    loop();
};
