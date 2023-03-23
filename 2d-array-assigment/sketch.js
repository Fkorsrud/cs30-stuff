// 2d-array assignment
// Faith
// april 6th?
//
// Extra for Experts:
// 

const ROWS = 11;
const COLS = 11;
let grid;
let cellSize;


function setup() {
  createCanvas(windowWidth, windowHeight);

  if(width > height){
    cellSize = width/ROWS;
  }
  else{
    cellSize = height/ROWS;
  }
  grid = createRandom2darray();
}

function draw() {
  background(220);
}


function createRandom2darray(){
  let newGrid = [];
  for (let y =0; y< ROWS; y++){
    newGrid.push([]);
    for(let x = 0; x< COLS; x++){
      let square = {
        side1: 0,
        side2: 0,
        side3: 0,
        side4: 0,
        playerHere: 0,
      };
      newGrid[y].push(square);
    }
    
  }
  return newGrid;

}

function randomizeMaze(grid){
  for(let y = 0; y < ROWS; y++){
    for(let x=0; x < COLS; x++){
      randomizeSides(grid[y][x]);
    }
  }

}

function randomizeSides(asquare){
  
  if(random(100) < 50){
    asquare.side1 = 1;
  }
  else{
    asquare.side1 = 0;
  }

  if(random(100) < 50){
    asquare.side2 = 1;
  }
  else{
    asquare.side2 = 0;
  }

  if(random(100) < 50){
    asquare.side3 = 1;
  }
  else{
    asquare.side3 = 0;
  }

  if(random(100) < 50){
    asquare.side4 = 1;
  }
  else{
    asquare.side4 = 0;
  }
}

function displayGrid(){
  for(let y =0; y<ROWS; y++){
    for(let x=0; x<COLS; x++){
      if(grid[y][x].side1 === 1){
        line(x*cellSize - cellSize/2, y*cellSize - cellSize/2, x*cellSize +cellSize/2, y+cellSize - cellSize/2);
      }
      
    }
  }
}

