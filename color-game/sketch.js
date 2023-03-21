// Color game
// march 21, 2023

const  ROWS = 8;
const COLS = 8;
let grid;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2dArray();

  if (width < height){
    cellSize = width/ROWS;
  }
  else{
    cellSize = height/COLS;
  }
}

function draw() {
  background(220);
  displayGrid(grid);
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x,y);
  toggleCell(x+1, y);
  toggleCell(x-1,y);
  toggleCell(x,y+1);
  toggleCell(x,y-1);
} 

function toggleCell(x,y){
  // sanity check
  if (x >= 0 && x < COLS && y >=0 && y < ROWS){
    if (grid[y][x] === 0){
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1){
      grid[y][x] = 0;
    }
  }

}




function displayGrid(grid){
  for (let y = 0; y < ROWS; y++){
    for (let x = 0; x < COLS; x++){
      if (grid[y][x] === 0) {
        fill("orange");
      }
      if (grid[y][x] === 1) {
        fill("blue");
      }
      rect(x*cellSize, y* cellSize, cellSize, cellSize);
    }
  }
}


function createEmpty2dArray(){
  let newGrid = [];

  for(let y = 0; y < ROWS; y++){
    newGrid.push([]);
    for (let x = 0; x < COLS; x++){
      newGrid[y].push(0);

    }

  }
  return newGrid;
}
