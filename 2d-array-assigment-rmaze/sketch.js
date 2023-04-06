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


// let neibours = [];
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

  createRandomMaze();
  displayGrid(grid);

  
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
        inmaze: false,
      };
      newGrid[y].push(square);
    }
    
  }
  return newGrid;

}




function displayGrid(grid){
  fill("black");
  for(let y = 0; y<ROWS; y++){
    for(let x= 0; x<COLS; x++){
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
  let firstX = round(random(COLS -1));
  let firstY = round(random(COLS -1));
  let firstplace = [];
  visited.push(firstplace);
  visited[0].push(firstY);
  visited[0].push(firstX);
  current = visited.pop();

  //
  pickNeibours(current);
  let stop = 0;
  while (stop === 0){
    let count = 0;
    for (let y = 0; y < COLS; y++){
      for (let x = 0; x<COLS; x++){
        if (grid[y][x].inmaze === false){
          count = count + 1;
        }
      }
    }
    if (count === 0 ){
      stop = 1;
    }
    current = visited.pop();
    pickNeibour(current);


  }
 
}

function pickNeibours(place){
  let chosen = 0;

  let x = place[1];
  let y = place[0];

  while (chosen ===0){
    let choice = random(100);
    if (choice > 75){
      choice = 1;
    }
    else if (choice > 50 ){
      choice = 2;
    }
    else if (choice > 25){
      choice = 3;
    }
    else {
      choice = 4;
    }
    // top cell
    if (choice === 1 && y-1 >= 0 && y-1 < ROWS && grid[y-1][x].inmaze === false ){
      pickNeibour(y-1, x);
      chosen = 1;
    }
    // right
    else if (choice === 2 && x+1 >= 0 && x+1 < COLS && grid[y][x+1].inmaze === false){
      pickNeibours(y,x+1);
      chosen = 1;
    }
    // below
    else if (choice === 3 && y+1 >= 0 && y+1 < COLS && grid[y+1][x].inmaze === false){
      pickNeibour(y+1,x);
      chosen = 1;
    }
    // left
    else if (choice === 4 && x-1 >= 0 && x-1 < COLS && grid[y][x-1].inmaze === false){
      pickNeibour(y, x-1);
      chosen = 2;
    }
    else if (grid[y+1][x].inmaze === true && grid[y-1][x].inmaze === true && grid[y][x+1].inmaze === true && grid[y][x-1].inmaze === true){
      current = visited.pop;
    }
    else{
      console.log("uhhh");

    }


  }
}



function pickNeibour(y,x){
  let place = [];
  grid[y][x].inmaze = true;
  visited.push(place);
  visited[visited.length-1].push(y);
  visited[visited.length-1].push(x);
  removeWalls(current[1], current[2], x, y);

  
}

function checkNeighbors(place){
  
}

// function removeWalls(x1, y1, x2, y2){
//   if (x1 !== x2){
//     if (y1 -1 === y2){
//       grid[y1][x1].side3 = 0;
//       grid[y2][x2].side1 = 0;
//     }
//     if (y1+1 === y2){
//       grid[y1][x1].side1 = 0;
//       grid[y2][x2].side3 = 0;
//     }
//   }
//   if (y1 !== y2){
//     if (x1-1 === x2){
//       grid[y1][x1].side4 = 0;
//       grid[y2][x2].side2 = 0;
//     }
//     if (x1 +1 === x2){
//       grid[y1][x1].side2 = 0;
//       grid[y2][x2].side4 = 0;
//     }
//   }
// }

function removeWalls(y,x, direction){
  if (direction === "up"){
    grid[y][x].side3 = 0;
    grid[y-1][x].side1 =0;
  }
  else if (direction === "left"){
    grid[y][x].side2 = 0;
    grid[y][x+1].side3 = 0;
  }
  else if (direction === "botton"){
    grid[y][x].side1= 0;
  }
  //////////////////////////
}