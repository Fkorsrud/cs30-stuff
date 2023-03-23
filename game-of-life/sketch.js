// game of life
// march 22, 2023

const  ROWS = 10;
const COLS = 10;
let grid;
let cellSize;
let autoUpdate = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandom2darray(ROWS,COLS);

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
  if (autoUpdate && frameCount % 10 === 0){
    grid= updateGrid();
  }
}

function keyTyped(){
  if(key === "r"){
    grid = createRandom2darray(ROWS, COLS);
  }
  else if (key === "e"){
    grid = createEmpty2dArray(ROWS, COLS);
  }
  else if (key === " "){
    grid = updateGrid();
  }
  else if (key === "a"){
    autoUpdate = !autoUpdate;
  }
}


function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x,y);

} 

function updateGrid(){
  let nextTurn = createEmpty2dArray(ROWS,COLS);
  for (let y= 0; y < ROWS; y++){
    for (let x =0; x< COLS; x++){
      //count the neighboors
      let neighbours = 0;

      for(let i = -1; i<= 1; i++){
        for (let j = -1; j <=1; j++){
          //detect edge cases
          if (y+i >= 0 && y+i < ROWS && x+j >=0 && x+j < COLS){
            neighbours += grid[y+i][x+j];
          }
        }
      }

      // be careful about counting self...
      neighbours -= grid[y][x];

      // apply rules
      if (grid[y][x] === 1){
        if (neighbours === 3 || neighbours ===2){
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
      
      if (grid[y][x] ===0){
        if(neighbours === 3){
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

    }
  }

  return nextTurn;
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

function createRandom2darray(ROWS, COLS){
  let newGrid = [];
  for (let y =0; y< ROWS; y++){
    newGrid.push([]);
    for(let x = 0; x< COLS; x++){
      if (random(100) < 50){
        newGrid[y].push(1);
      }
      else{
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
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
