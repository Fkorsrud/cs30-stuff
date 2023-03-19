// Arrays and object notation
// Faith
// Date
//
// Extra for Experts:
// I made custom shapes.


let circles = [];
let maxDiameter;
let sizeChange = 150;
let points = 5;
let difference = 5;

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  background(random(255), random(255), random(255));
  
  addCircles();
  displayAllcircles();
  
}

function draw() {
  translate(width/2, height/2);
}

function spawnCircle(diaMeter){
  let someCirle = {
    d: diaMeter,
    r: diaMeter/2,
    red: random(255),
    green: random(255),
    blue: random(255),
  };
  circles.push(someCirle);
}

function addCircles() {
  if (width >= height){
    maxDiameter = width;
  }
  else{
    maxDiameter = height;
  }
  for (let i = maxDiameter; i > 5; i-= sizeChange){
    spawnCircle(i);
    if (i > 100){
      sizeChange = i*2/10;
    }
  }
}

function displayCircles(theCircle){
  let numberofPoints = theCircle.d/points;
  let angle = 360/numberofPoints;
  
  noStroke();
  fill(theCircle.red, theCircle.green, theCircle.blue);
  beginShape();
  let starty = random(theCircle.r/difference);
  curveVertex(0, theCircle.r+ starty);
  curveVertex(0, theCircle.r + starty);
  for (let i = numberofPoints; i > 0; i--){
    let r = theCircle.r + random(theCircle.r/difference);
    let xValue = sin(angle*i) * r;
    let yValue = cos(angle*i) * r;
    curveVertex(xValue, yValue);
  }
  curveVertex(0, theCircle.r + starty);
  curveVertex(0, theCircle.r + starty);
  endShape();
}


function keyPressed(){
  
  if (keyCode === UP_ARROW){
    if (points >= 3){
      points --;
      displayAllcircles();
    }
    if(points < 3 && points > 0.1){
      points = points - 0.1;
      displayAllcircles();
    }
  }
  if (keyCode === DOWN_ARROW){
    if (points < 15){
      points ++;
      displayAllcircles();
    }
    if (points < 3){
      points = points + 0.1;
      displayAllcircles();
    }
  }
  if (keyCode === RIGHT_ARROW){
    if (difference > 0){
      difference --;
      displayAllcircles();
    }
  }
  if (keyCode === LEFT_ARROW){
    if (difference < 15){
      difference ++;
      displayAllcircles();
    }
  }
}

function displayAllcircles(){
  for (let i =0; i < circles.length; i++){
     displayCircles(circles[i]);
  }
}
