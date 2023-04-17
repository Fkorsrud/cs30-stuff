// 2d-array assignment
// Faith
// april 6th
//
// Extra for Experts:
//
/////////////////////////////////////////////////////////

const ROWS = 11;
const COLS = 11;
let grid;
let cellSize;

let visited = [];
let neibours = [];


let current;
let oldSpot;





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

  // createRandomMaze();
  

  let firstX = round(random(COLS-1));
  let firstY = round(random(COLS-1));
  current = []
  
  current.push(firstX);
  current.push(firstY);
  visited.push(current);
  grid[firstX][firstY].inmaze = true;
  grid[firstX][firstY].here = true;
  displayGrid(grid);
}

function draw() {
  
  
}

function keyTyped(){
  if (key === " "){
    nextTurn()
  }
}

function nextTurn(){
  background(255);
  grid[current[0]][current[1]].here = false;
  checkNeighbors(current[0], current[1]);
  pickNeibour();
  grid[current[0]][current[1]].here = true;
  displayGrid(grid);

}
function createRandom2darray(){
  let newGrid = [];
  for (let x =0; x< ROWS; x++){
    newGrid.push([]);
    for(let y = 0; y< COLS; y++){
      let square = {
        side1: 1,
        side2: 1,
        side3: 1,
        side4: 1,
        inmaze: false,
        here: false,
      };
      newGrid[x].push(square);
    }
    
  }
  return newGrid;

}




function displayGrid(grid){
  fill("black");
  for(let y = 0; y<ROWS; y++){
    for(let x= 0; x<COLS; x++){
      if(grid[x][y].side1 === 1){
        line(x*cellSize , y*cellSize , x*cellSize +cellSize, y*cellSize );
      }
      if (grid[x][y].side2 === 1){
        line(x*cellSize + cellSize, y*cellSize , x*cellSize + cellSize, y*cellSize + cellSize);  
      }
      if (grid[x][y].side3 === 1){
        line(x*cellSize, y*cellSize + cellSize, x*cellSize + cellSize, y*cellSize + cellSize);  
      }
      if (grid[x][y].side4 === 1){
        line(x*cellSize, y*cellSize + cellSize, x*cellSize , y*cellSize);  
      }
      
      
    }
  }
}

function createRandomMaze(){
// pick a random place
  let firstX = round(random(COLS-1));
  let firstY = round(random(COLS-1));
  current = []
  
  current.push(firstX);
  current.push(firstY);
  visited.push(current);
  grid[firstX][firstY].inmaze = true;
  

  

  let stop = 0;
  while (stop === 0){
    let count = 0;
    for (let x = 0; x < COLS; x++){
      for (let y = 0; y < COLS; y++){
        if (grid[x][y].inmaze === false){
          count ++
        }
      }
    }
    if (count === 0){
      stop = 1;
    }
    checkNeighbors(current[0], current[1]);
    pickNeibour();

  }
}

function checkNeighbors(x,y){
  neibours = [];
  if (x-1 >=0 && grid[x-1][y].inmaze === false){
    let place = [];
    place.push(x-1);
    place.push(y);
    neibours.push(place);
  }
  if (x + 1 < COLS   && grid[x+1][y].inmaze === false){
    let place = []
    place.push(x+1);
    place.push(y);
    neibours.push(place);
  }
  if (y-1 >= 0 && grid[x][y-1].inmaze === false){
    let place = [];
    place.push(x);
    place.push(y-1);
    neibours.push(place);
  }
  if (y+1 < ROWS  && grid[x][y+1].inmaze === false){
    let place = [];
    place.push(x);
    place.push(y+1);
    neibours.push(place);
  }
}

function pickNeibour(){
  let rannum = random(100);
  if (neibours.length === 4){
    if (rannum > 75){
      thisNeibour(neibours[0][0], neibours[0][1]);
      
    }
    else if (rannum > 50){
      thisNeibour(neibours[1][0], neibours[1][1]);
      
    }
    else if (rannum > 25){
      thisNeibour(neibours[2][0], neibours[2][1]);
      
    }
    else {
      thisNeibour(neibours[3][0], neibours[3][1]);
      
    }
  }
  else if (neibours.length === 3){
    if (rannum > 66){
      thisNeibour(neibours[0][0], neibours[0][1]);
      
    }
    else if (rannum > 33){
      thisNeibour(neibours[1][0], neibours[1][1]);
      
    }
    else{
      thisNeibour(neibours[2][0], neibours[2][1]);
      
    }
  }
  else if (neibours.length === 2){
    if ( rannum > 50){
      thisNeibour(neibours[0][0], neibours[0][1]);
      
    }
    else{
      thisNeibour(neibours[1][0], neibours[1][1]);
      
    }
  }
  else if (neibours.length === 1){
    thisNeibour(neibours[0][0], neibours[0][1]);
    
  }
  else{
    current = visited.pop();
  }
}

function thisNeibour(x,y){
  visited.push(current);
  let newPlace = [];
  newPlace.push(x);
  newPlace.push(y);
  removeWalls(current[0], current[1], x, y);
  current = newPlace;
  grid[current[0]][current[1]].inmaze = true;
}

function removeWalls(currentX, currentY, newX, newY){
  let direction = "";
  if (currentX !== newX){
    if (currentX - 1 === newX){
      direction = "left";
    }
    if (currentX + 1 === newX){
      direction = "right";
    }
  }
  if (currentY !== newY){
    if (currentY -1 === newY){
      direction = "up";
    }
    if (currentY +1 === newY){
      direction = "down"
    }
  }

  if (direction === "up"){
    grid[currentX][currentY].side1 = 0;
    grid[currentX][currentY -1].side3 = 0;
  }
  else if (direction === "right"){
    grid[currentX][currentY].side2 = 0;
    grid[currentX + 1][currentY].side4 = 0;
    
  }
  else if (direction === "down"){
    grid[currentX][currentY].side3 = 0;
    grid[currentX][currentY+1].side1 = 0;
  }
  else if (direction === "left"){
    grid[currentX][currentY].side4 = 0;
    grid[currentX-1][currentY].side2 = 0;
  }
}