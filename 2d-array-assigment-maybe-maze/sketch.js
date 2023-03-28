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
let theMaze ;
let newMaze;
let inMaze;
let neibours = [];
let current;
let oldSpot;

let firstX;
let firstY;
let maze = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  

  if(width < height){
    cellSize = width/ROWS;
  }
  else{
    cellSize = height/ROWS;
  }
  grid = createRandom2darray();
  randomizeMaze(grid);
  displayGrid();
  createRandomMaze();
}

function draw() {
  
  
}


function createRandom2darray(){
  let newGrid = [];
  for (let y =0; y< ROWS; y++){
    newGrid.push([]);
    for(let x = 0; x< COLS; x++){
      let square = {
        side1: 1,
        side2: 1,
        side3: 1,
        side4: 1,
        playerHere: 0,
        inmaze: false,

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

  if(random(100) < 25){
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

  if(random(100) < 25){
    asquare.side4 = 1;
  }
  else{
    asquare.side4 = 0;
  }
}

function displayGrid(){
  fill("black");
  for(let y =0; y<ROWS; y++){
    for(let x=0; x<COLS; x++){
      if(grid[y][x].side1 === 1){
        line(x*cellSize , y*cellSize , x*cellSize +cellSize, y*cellSize );
      }
      if (grid[y][x].side2 === 1){
        line(x*cellSize + cellSize, y*cellSize , x*cellSize + cellSize, y*cellSize + cellSize);  
      }
      if (grid[y][x].side3 === 1){
        line(x*cellSize, y*cellSize + cellSize, x*cellSize + cellSize, y*cellSize + cellSize);  
      }
      if (grid[y][x].side4 === 1){
        line(x*cellSize, y*cellSize + cellSize, x*cellSize , y*cellSize);  
      }
      
    }
  }
}



function createRandomMaze(){
  
  firstX = round(random(ROWS));
  firstY = round(random(COLS));
  current =[firstX, firstY];
  addNeighbours(firstX, firstY);
  while(neibours.length > 0){
    pickNeibour(current[0], current[1]);
    addNeighbours(firstX, firstY);
  }
}

function addNeighbours(x,y){
  addToNeibours(x-1, y);
  addToNeibours(x+1, y);
  addToNeibours(x, y-1);
  addToNeibours(x, y+1);
}

function addToNeibours(x,y){
  if (x >= 0 && x < COLS && y >=0 && y < ROWS && grid[y][x].inmaze === false){
    let currentPlace = [y,x];
    neibours.push(currentPlace);
    
  }
}


function pickNeibour(x,y){
  let neibourPicked = 0;
  let ranNum = random(100);
  while (neibourPicked === 0){
    if (x+1 <= 0 && x+1 > COLS && y <= 0 && y >  ROWS && x-1 <= 0 && x-1 > COLS && x >= 0 && x > COLS && y+1 <= 0 && y+1 > ROWS && y-1 <= 0 && y-1 > ROWS ){
      current = maze[maze.length-2];
      neibourPicked = 1;
    }
    else if (ranNum >= 75 && x+1 >= 0 && x+1 < COLS && y >=0 && y < ROWS && !grid[y][x+1].inmaze){
      oldSpot = current;
      current[0] = current[0] +1;
      removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
      neibourPicked =1;
    }
    else if (ranNum >= 50 && x-1 >= 0 && x-1 < COLS && y >=0 && y < ROWS && !grid[y][x-1].inmaze){
      oldSpot = current;
      current[0] = current[0] -1;
      removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
      neibourPicked =1;
    }
    else if (ranNum >= 25 && x >= 0 && x < COLS && y+1 >=0 && y+1 < ROWS && !grid[y+1][x]){
      oldSpot = current;
      current[1] = current[1] +1;
      removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
      neibourPicked =1;
    }
    else if (ranNum >= 0 && x >= 0 && x < COLS && y-1 >=0 && y-1 < ROWS && !grid[y-1][x].inmaze){
      oldSpot = current;
      current[1] = current[1] -1;
      removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
      neibourPicked =1;
    }
    else if (grid[y-1][x].inmaze &&  grid[y+1][x].inmaze && grid[y][x-1].inmaze && grid[y][x+1].inmaze ){
      current = maze[maze.length-2];
      neibourPicked =1;
    }
    else{
      ranNum = random(100);
    }
  }
  
  
  maze.push(oldSpot);
  grid[oldSpot[0]][oldSpot[1]].inmaze = true;
  
}


function removeWalls(x1, y1, x2, y2){
  if (x1 !== x2){
    if (y1 -1 === y2){
      grid[y1][x1].side3 =0;
      grid[y2][x2].side1 = 0;
    }
    if (y1 +1 === y2){
      grid[y1][x1].side1 =0;
      grid[y2][x2].side3 = 0;
    }
  }
  if (y1 !== y2){
    if (x1 -1 === x2){
      grid[y1][x1].side4 =0;
      grid[y2][x2].side2 = 0;
    }
    if (x1 +1 === x2){
      grid[y1][x1].side2 =0;
      grid[y2][x2].side4 = 0;
    }
  }
}