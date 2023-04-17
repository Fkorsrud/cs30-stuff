// 2d-array assignment
// Faith
// april 16th, 2023
//
//i made a maze game where you can race two characters to the middle of the race, 
//but the maze switches every couple of seconds. the red character is controled with wasd, and
//the green character is controled with the arrows
//
// Extra for Experts:
// i made a maze generater using the Aldous-Broder algorithm
//
////////////////////////////////////////////////////////////////////////////////////////////////


// varibles for the grid/diplay
const ROWS = 11;
const COLS = 11;
let grid;
let cellSize;
let border;
let finish;

// variables for the maze generation
let visited = [];
let neibours = [];
let current;
let oldSpot;

// variables for the character display and movement
let speedd = 4;
let diameter = 40;
let redcharacterX;
let redcharacterY;
let greencharacterX;
let greencharacterY;

// other variables
let switchtime = 2500;
let timeSinceSwitch = 0;

function preload(){
  finish = loadImage("mazestar.png");
}

function setup() {
  // set up the canvas, cellsize, and character starting positions
  createCanvas(windowWidth, windowHeight);
  background(220);

  if(width < height){
    cellSize = width/ROWS;
    border = 0;
  }
  else{
    cellSize = height/ROWS;
    border = (width-height)/2;
  }

  redcharacterX = cellSize/2;
  redcharacterY = cellSize/2;
  greencharacterX = cellSize* COLS - cellSize/2;
  greencharacterY = cellSize*COLS - cellSize/2;
  
  // create a maze 
  grid = createRandom2darray();
  createRandomMaze();
}

function draw() {
  // check if the maze needs to be changed
  if (millis() > timeSinceSwitch + switchtime ){
    changeMaze();
    timeSinceSwitch = millis();
  }
  // draw the grid
  background(255);
  displayGrid(grid);

  // move and display each character
  moveRedCharacter();
  displayRedCharacter();

  moveGreenCharacter();
  displayGreenCharacter();
}


function createRandom2darray(){
  // make a 2d array of objects, with all sides being there and none in the maze
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
      };
      newGrid[x].push(square);
    }
    
  }
  return newGrid;

}

function displayGrid(grid){
  // display the finish in the middle
  image(finish, cellSize * 5 + border, cellSize*5, cellSize, cellSize);

  // for each object in the grid, draw a line for each side of the square that has a line on that side
  fill("black");
  for(let y = 0; y<ROWS; y++){
    for(let x= 0; x<COLS; x++){
      strokeWeight(5);

      // top side
      if(grid[x][y].side1 === 1){
        line(x*cellSize + border , y*cellSize , x*cellSize +cellSize + border, y*cellSize );
      }

      //right side
      if (grid[x][y].side2 === 1){
        line(x*cellSize  + border+ cellSize , y*cellSize , x*cellSize + border + cellSize, y*cellSize + cellSize);  
      }

      // bottom side
      if (grid[x][y].side3 === 1){
        line(x*cellSize + border , y*cellSize + cellSize, x*cellSize + border + cellSize, y*cellSize + cellSize);  
      }

      // left side
      if (grid[x][y].side4 === 1){
        line(x*cellSize + border , y*cellSize + cellSize, x*cellSize +border , y*cellSize);  
      } 

    }
  }
}

function createRandomMaze(){
// pick a random cell in the grid, and set it as current
  let firstX = round(random(COLS-1));
  let firstY = round(random(COLS-1));

  current = [];
  current.push(firstX);
  current.push(firstY);

  // mark that cell as part of the maze, and push it to the visited array
  visited.push(current);
  grid[firstX][firstY].inmaze = true;
  
  // until all the cells are part of the maze, pick a neibour and if its not in the maze, 
  //destroy the walls between them. if there are no available neighbours, make the current cell the 
  // last visited cell
  let stop = 0;
  while (stop === 0){

    // count of many cells are not in the maze
    let count = 0;
    for (let x = 0; x < COLS; x++){
      for (let y = 0; y < COLS; y++){
        if (grid[x][y].inmaze === false){
          count ++;
        }
      }
    }

    // if all the cells are in the maze, stop
    if (count === 0){
      stop = 1;
    }
    
    checkNeighbors(current[0], current[1]);
    pickNeibour();

  }

  // Once the maze is done, put a border around it
  for (let x = 0; x< COLS; x++){
    grid[x][0].side1 = 1;
    grid[x][COLS-1].side3 = 1;
  }
  for (let y = 0; y<COLS; y++){
    grid[0][y].side4 = 1;
    grid[COLS-1][y].side2 = 1;
  }

}

function checkNeighbors(x,y){
  // empty the neighbors array
  neibours = [];

  // check every neibour and add it to available neighbors if its availible
  if (x-1 >=0 && grid[x-1][y].inmaze === false){
    let place = [];
    place.push(x-1);
    place.push(y);
    neibours.push(place);
  }

  if (x + 1 < COLS   && grid[x+1][y].inmaze === false){
    let place = [];
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
  // this function picks a random neighbor from the neighbors array
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
  // if there are no available neighbours, set the current cell to be the last cell added to the visited array
  else{
    current = visited.pop();
  }
}

// this function picks the neighbour chosen
function thisNeibour(x,y){
  // push the current cell to the visted array, and destroy the walls between the old and new cell
  visited.push(current);
  removeWalls(current[0], current[1], x, y);

  // set the current cell to be the new cell, and mark it as visited
  let newPlace = [];
  newPlace.push(x);
  newPlace.push(y);
  current = newPlace;

  grid[current[0]][current[1]].inmaze = true;
}

function removeWalls(currentX, currentY, newX, newY){
  // this function removes the walls between the old and new current cells

  // figure out where the new cell is 
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
      direction = "down";
    }
  }

  // remove the walls from both cells
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




function displayRedCharacter(){
  // this function displays the red character
  push();

  fill("red");
  noStroke();
  circle(redcharacterX + border, redcharacterY, diameter);

  pop();
}

function moveRedCharacter(){
  // figure out what cell the character is in
  let x = Math.floor(redcharacterX /cellSize);
  let y = Math.floor(redcharacterY/cellSize);
  //if the character wont go through a wall, move it acording to the key pressed

  // w
  if(keyIsDown(87)){
    if (redcharacterY - diameter/2 < y*cellSize +5/2 ){
      if (grid[x][y].side1 !== 1){
        redcharacterY = redcharacterY - speedd;
      }
    }
    else {
      redcharacterY = redcharacterY - speedd;
    }
  }

  //s
  else if (keyIsDown(83)){
    if (redcharacterY > y*cellSize + cellSize  - diameter/2){
      if (grid[x][y].side3 !== 1){
        redcharacterY += speedd;
      }
    }
    else{
      redcharacterY += speedd;
    }
  }

  //a
  else if (keyIsDown(65)){
    if (redcharacterX  < x*cellSize + diameter/2){
      if (grid[x][y].side4 !== 1){
        redcharacterX -= speedd;
      }
    }
    else{
      redcharacterX -= speedd;
    }
  }

  //d
  else  if (keyIsDown(68)){
    if (redcharacterX + diameter/2 > x*cellSize + cellSize){
      if (grid[x][y].side2 !== 1){
        redcharacterX += speedd;
      }
      
    }
    else{
      redcharacterX += speedd;
    }
  }
}

function displayGreenCharacter(){
  // this function displays the green character
  push();

  fill("green");
  noStroke();
  circle(greencharacterX + border, greencharacterY, diameter);

  pop();
}

function moveGreenCharacter(){
  // this functioon moves the green character
  // figure out what cell the character is in
  let x = Math.floor(greencharacterX /cellSize);
  let y = Math.floor(greencharacterY/cellSize);

  // if the character wont run into a wall, move it acording to the arrow pressed

  // up
  if(keyIsDown(UP_ARROW)){
    if (greencharacterY - diameter/2 < y*cellSize  ){
      if (grid[x][y].side1 !== 1){
        greencharacterY = greencharacterY - speedd;
      }
    }
    else {
      greencharacterY = greencharacterY - speedd;
    }
  }

  // down
  else if (keyIsDown(DOWN_ARROW)){
    if (greencharacterY > y*cellSize + cellSize  - diameter/2){
      if (grid[x][y].side3 !== 1){
        greencharacterY += speedd;
      }
    }
    else{
      greencharacterY += speedd;
    }
  }
  
  // left
  else if (keyIsDown(LEFT_ARROW)){
    if (greencharacterX  < x*cellSize + diameter/2){
      if (grid[x][y].side4 !== 1){
        greencharacterX -= speedd;
      }
    }
    else{
      greencharacterX -= speedd;
    }
  }
  
  // right
  else  if (keyIsDown(RIGHT_ARROW)){
    if (greencharacterX + diameter/2 > x*cellSize + cellSize){
      if (grid[x][y].side2 !== 1){
        greencharacterX += speedd;
      }
      
    }
    else{
      greencharacterX += speedd;
    }
  }
}

function changeMaze(){
  // this function changes the maze, and checks if the characters are going through the new maze

  // make the new maze
  grid = createRandom2darray();
  createRandomMaze();

  // check the red character

  // figure out where it is
  let redx = Math.floor(redcharacterX/cellSize);
  let redy = Math.floor(redcharacterY/cellSize);

  // check that its not in the wall, if it is, center it in the cell its in
  if (redcharacterY - diameter/2 < redy*cellSize +5 && grid[redx][redy].side1 === 1 ||redcharacterY > redy*cellSize + cellSize  - diameter/2 && grid[redx][redy].side3 === 1 || redcharacterX  < redx*cellSize + diameter/2 && grid[redx][redy].side4 === 1 || redcharacterX + diameter/2 > redx*cellSize + cellSize && grid[redx][redy].side2 === 1){
    redcharacterX = redx*cellSize + cellSize/2;
    redcharacterY = redy*cellSize + cellSize/2;
  }
  
  // now check green

  // figure out where it is
  let greenx = Math.floor(greencharacterX /cellSize);
  let greeny = Math.floor(greencharacterY/cellSize);

  //check that its not in the wall. if it is, move it to the center of the cell its in
  if (greencharacterY - diameter/2 < greeny*cellSize +5 && grid[greenx][greeny].side1 === 1 ||greencharacterY > greeny*cellSize + cellSize  - diameter/2 && grid[greenx][greeny].side3 === 1 || greencharacterX  < greenx*cellSize + diameter/2 && grid[greenx][greeny].side4 === 1 || greencharacterX + diameter/2 > greenx*cellSize + cellSize && grid[greenx][greeny].side2 === 1){
    greencharacterX = greenx*cellSize + cellSize/2;
    greencharacterY = greeny*cellSize + cellSize/2;
  }
 
  // display maze and characters
  displayGrid(grid);
  displayGreenCharacter();
  displayRedCharacter();
  
}
