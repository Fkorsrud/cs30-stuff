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
let neibours;
let current;
let oldSpot;

let firstX;
let firstY;
let maze;


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

// function createRandomMaze(){
  
//   newMaze = createRandom2darray();
//   firstX = random(COLS);
//   firstY = random(ROWS);
//   maze = [];
//   // let place = [firstX,firstY];
//   // maze.push(place);
//   addFrontiers(firstX+1, firstY);
//   addFrontiers(firstX - 1, firstY);
//   addneibours(firstX, firstY +1);
//   addneibours(firstX, firstY -1);
  
//   while(neibours.length > 0){
//     let ranNum = random(100);
//     if (ranNum > 75){
//       current = neibours[0];
//     }
//     else if (ranNum > 50){
//       current = neibours[1];
//     }
//     else if (ranNum > 25){
//       current = neibours[2];
//     }
//     else{
//       current = neibours[3];
//     }
//   }
  

// }

// function addneibours(x,y){
//   if (x >= 0 && x < COLS && y >=0 && y < ROWS){
//     let place = [x,y];
//     neibours.push(place);
//   }
  
  
// }


function createRandomMaze(){
  
  firstX =random(ROWS);
  firstY = random(COLS);
  current =[firstX, firstY];
  addNeighbours(firstX, firstY);
  while(neibours.length > 0){
    pickNeibour(current[0], current[1]);
  }
}

function addNeighbours(x,y){
  addToNeibours(x-1, y);
  addToNeibours(x+1, y);
  addToNeibours(x, y-1);
  addToNeibours(x, y+1);
}

function addToNeibours(x,y){
  if (x >= 0 && x < COLS && y >=0 && y < ROWS && grid[y][x].inMaze === false){
    let currentPlace = [y,x];
    neibours.push(currentPlace);
  }
}

function pickNeibour(x,y){
  let ranNum = random(100);
  
  if (ranNum > 75 && grid[y][x+1].inmaze === false){
    oldSpot = current;

    current[0] = current[0] +1;
    removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
  }
  else if (ranNum > 50 && grid[y][x-1].inmaze === false){
    oldSpot = current;
    current[0] = current[0] -1;
    removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
  }
  else if (ranNum > 25 && grid[y+1][x].inmaze === false){
    oldSpot = current;
    current[1] = current[1] +1;
    removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
  }
  else if (ranNum > 0 && grid[y-1][x].inmaze === false){
    oldSpot = current;
    current[1] = current[1] -1;
    removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
  }
  else if (grid[y-1][x].inmaze === true &&  grid[y+1][x].inmaze === true && grid[y][x-1].inmaze === true && grid[y][x+1].inmaze === true){
    current = maze[maze.length-1];
  }
  maze.push(oldSpot);
  
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