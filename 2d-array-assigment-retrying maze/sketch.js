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



// let neibours = [];
let current;
let oldSpot;

let firstX;
let firstY;



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
        side1: 0,
        side2: 0,
        side3: 0,
        side4: 0,
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
  let stop = 0;
  //divide the maze
  splitMazeVertically(grid);
  splitMazeHorizontally(grid);
  while (stop === 0){
    stop === 1;
  }
  // open a spot

  //
}

function splitMazeVertically(array){
  let xline = random(array.length);
  
  let newSection = [];
  for (let y = 0; y< array.length; y++){
    array[y][xline].side2 = 1;
  }
  

  for (let y = 0; y < array.length; y++){
    newSection.push([]);
    for (let x = 0; x <= xline; x++){
      let place = [y, x];
      newSection[y].push(place);
    }
  }
  return newSection;
}
function splitMazeHorizontally(array){
  let yline = random(array.length);
  let newSection = [];
  for (let x = 0; x < array[yline].length; x++){
    array[yline][x].side1 === 1;
  }

  for (let y =0; y <= yline; y++){
    newSection.push([]);
    for (let x = 0; x < array[y].length; x++){
      let place = [y,x];
      newSection[y].push(place);
    }
  }

}




/////////////////////////////

// const ROWS = 11;
// const COLS = 11;
// let grid;
// let cellSize;



// let neibours = [];
// let current;
// let oldSpot;

// let firstX;
// let firstY;



// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   background(220);

//   if(width < height){
//     cellSize = width/ROWS;
//   }
//   else{
//     cellSize = height/ROWS;
//   }

//   grid = createRandom2darray();
//   createRandomMaze();
//   displayGrid(grid);

  
// }

// function draw() {
  
  
// }


// function createRandom2darray(){
//   let newGrid = [];
//   for (let y =0; y< ROWS; y++){
//     newGrid.push([]);
//     for(let x = 0; x< COLS; x++){
//       let square = {
//         side1: 1,
//         side2: 1,
//         side3: 1,
//         side4: 1,
//         playerHere: 0,
//         inmaze: false,
//         isneibour: false,
//       };
//       newGrid[y].push(square);
//     }
    
//   }
//   return newGrid;

// }




// function displayGrid(grid){
//   fill("black");
//   for(let y = 0; y<ROWS; y++){
//     for(let x= 0; x<COLS; x++){
//       if(grid[y][x].side1 === 1){
//         line(x*cellSize , y*cellSize , x*cellSize +cellSize, y*cellSize );
//       }
//       if (grid[y][x].side2 === 1){
//         line(x*cellSize + cellSize, y*cellSize , x*cellSize + cellSize, y*cellSize + cellSize);  
//       }
//       if (grid[y][x].side3 === 1){
//         line(x*cellSize, y*cellSize + cellSize, x*cellSize + cellSize, y*cellSize + cellSize);  
//       }
//       if (grid[y][x].side4 === 1){
//         line(x*cellSize, y*cellSize + cellSize, x*cellSize , y*cellSize);  
//       }
      
//     }
//   }
// }



// function createRandomMaze(){

//   firstX = round(random(ROWS-1));
//   firstY = round(random(COLS-1));
//   current =[firstX, firstY];
//   let mazecount;
//   let stop = 0;
//   // addNeighbours(firstX, firstY);
//   grid[firstY][firstX].inmaze = true;
  
//   for (let i= 0; i<10; i++){
//     mazecount = 0;
//     for (let y= 0; y < ROWS; y++){
//       for(let x = 0; x < COLS; x++){
//         if (grid[y][x].inmaze === false){
//           mazecount += 1;
//         }
//       }
//     }
//     if (mazecount === 0){
//       stop = 1;
//     }
//     else{
//       // addNeighbours(current[0], current[1]);
//       pickNeibour(current[0], current[1]);
//     }
//   }
// }

// function addNeighbours(x,y){
//   addToNeibours(x-1, y);
//   addToNeibours(x+1, y);
//   addToNeibours(x, y-1);
//   addToNeibours(x, y+1);
// }

// function addToNeibours(x,y){
//   if (x >= 0 && x < COLS && y >=0 && y < ROWS && grid[y][x].inmaze === false){
//     grid[y][x].isneibour = true;
    
//   }
// }



// function pickNeibour(x,y){
//   let neibourPicked = 0;
//   let ranNum = random(100);
//   let neibour;


//   // while (neibourPicked === 0){ 
//   for(let i = 0; i<5; i++){   
//     if(ranNum >= 75){
//       neibour = 1;
//     }
//     else if (ranNum > 50){
//       neibour = 2;
//     }
//     else if (ranNum > 25){
//       neibour = 3;
//     }
//     else {
//       neibour = 4;
//     }

//     if (neibour === 1 && x+1 >= 0 && x+1 < COLS && y >=0 && y < ROWS ){
//       if (grid[y][x+1].inmaze === false){
//         oldSpot = current;
//         current[0] = current[0] +1;
//         grid[oldSpot[0]][oldSpot[1]].inmaze = true;
//         grid[oldSpot[0]][oldSpot[1]].isneibour = false;
//         removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
//         neibourPicked = 1;
//       }
//       else{
//         ranNum = random(100);
//       }
//     }

//     else if (neibour === 2 && x-1 >= 0 && x-1 < COLS && y >=0 && y < ROWS ){
//       if (grid[y][x-1].inmaze === false){
//         oldSpot = current;
//         current[0] = current[0] -1;
//         grid[oldSpot[0]][oldSpot[1]].inmaze = true;
//         grid[oldSpot[0]][oldSpot[1]].isneibour = false;
//         removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
//         neibourPicked = 1;
//       }
//       else{
//         ranNum = random(100);
//       }
//     }

//     else if (neibour === 3 && x >= 0 && x < COLS && y+1 >=0 && y+1 < ROWS ){
//       if (grid[y+1][x].inmaze === false){
//         oldSpot = current;
//         current[1] = current[1] +1;
//         grid[oldSpot[0]][oldSpot[1]].inmaze = true;
//         grid[oldSpot[0]][oldSpot[1]].isneibour = false;
//         removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
//         neibourPicked = 1;
//       }
//       else{
//         ranNum = random(100);
//       }
//     }

//     else if (neibour === 4 && x >= 0 && x < COLS && y-1 >=0 && y-1 < ROWS){
//       if (grid[y-1][x].inmaze === false){
//         oldSpot = current;
//         grid[oldSpot[0]][oldSpot[1]].inmaze = true;
//         grid[oldSpot[0]][oldSpot[1]].isneibour = false;
//         current[1] = current[1] -1;
//         removeWalls(oldSpot[0], oldSpot[1], current[0], current[1]);
//         neibourPicked = 1;
       
//       }
//       else{
//         ranNum = random(100);
//       }
//     }
//     else if (grid[y-1][x].inmaze &&  grid[y+1][x].inmaze && grid[y][x-1].inmaze && grid[y][x+1].inmaze ){
//       current = oldSpot;
      
//       neibourPicked = 1;
//     }
    
//   }
  
//   // maze.push(oldSpot);
  
  
// }


// function removeWalls(x1, y1, x2, y2){
//   if (x1 !== x2){
//     if (y1 -1 === y2){
//       grid[y1][x1].side3 = 0;
//       grid[y2][x2].side1 = 0;
//     }
//     if (y1 +1 === y2){
//       grid[y1][x1].side1 = 0;
//       grid[y2][x2].side3 = 0;
//     }
//   }
//   if (y1 !== y2){
//     if (x1 -1 === x2){
//       grid[y1][x1].side4 = 0;
//       grid[y2][x2].side2 = 0;
//     }
//     if (x1 +1 === x2){
//       grid[y1][x1].side2 = 0;
//       grid[y2][x2].side4 = 0;
//     }
//   }
// }