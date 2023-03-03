// generative art
// mar 3, 2023



function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  
  lostsOfLines(50,50);

}

function draw() {

}

function lostsOfLines(cols, rows){
  for (let x = 0; x < cols; x++){
    for (let y = 0; y < rows; y++){
      let spaceAmount = width/cols;
      diagonalline(x*spaceAmount,y*spaceAmount, spaceAmount);
    }
  }

}


function diagonalline(x,y,spacing){
  if (random(100) > 50){
    //positive slope
    line(x-spacing/2, y + spacing/2, x + spacing/2, y - spacing/2);

  }
  else{
    // negatice slope
    line(x - spacing/2, y - spacing/2, x + spacing/2, y + spacing/2);
  }
}
