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
let frontiers;
let current;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220)

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
  fill("black")
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
  
  newMaze = createRandom2darray();
  firstX = random(COLS);
  firstY = random(ROWS);
  maze = [];
  // let place = [firstX,firstY];
  // maze.push(place);
  addFrontiers(firstX+1, fristY);
  addFrontiers(firstX - 1, firstY);
  addFrontiers(firstX, firstY +1);
  addFrontiers(firstX, firstY -1)
  
  while(frontiers.length > 0){
    let ranNum = random(100)
    if (ranNum > 75){
      current = frontiers[0];
    }
    else if (ranNum > 50){
      current = frontiers[1];
    }
    else if (ranNum > 25){
      current = frontiers[2];
    }
    else{
      current = frontiers[3];
    }
  }
  

}

function addFrontiers(x,y){
  if (x >= 0 && x < COLS && y >=0 && y < ROWS){
    let place = [x,y];
    frontiers.push(place);
  }
  
  
}

