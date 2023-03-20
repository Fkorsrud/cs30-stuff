// Arrays and object notation
// Faith
// march 20th, 2023
//
// Extra for Experts:
// I made custom shapes.


let circles = [];
let maxDiameter;
let sizeChange = 150;
let points = 5;
let difference = 5;

function setup() {
  // setup the things we need to setup
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  background(random(255), random(255), random(255));
  
  // add all the circles, then displays them
  addCircles();
  displayAllcircles();
  
}

function draw() {
  
}

function spawnCircle(diaMeter){
  // make the circle object
  let someCirle = {
    d: diaMeter,
    r: diaMeter/2,
    red: random(255),
    green: random(255),
    blue: random(255),
  };

  // push it to the list
  circles.push(someCirle);
}

function addCircles() {
  // set the max diameter to be the highest of width and height
  if (width >= height){
    maxDiameter = width;
  }
  else{
    maxDiameter = height;
  }
  // add a circles starting with the biggest one
  for (let i = maxDiameter; i > 5; i-= sizeChange){
    spawnCircle(i);

    // once the diameter is small then 100, make the difference in size smaller
    if (i > 100){
      sizeChange = i*2/10;
    }
  }
}

function displayCircles(theCircle){
// declare variables and set up the fill and stroke
  let numberofPoints = theCircle.d/points;
  let angle = 360/numberofPoints;
  noStroke();
  fill(theCircle.red, theCircle.green, theCircle.blue);
  
  // begin the shape
  beginShape();

  // to start the curves, the first two and last two need to be the same. 
  let starty = random(theCircle.r/difference);
  curveVertex(0, theCircle.r+ starty);
  curveVertex(0, theCircle.r + starty);

  // use trig to put a curve vertex for every point on the 
  for (let i = numberofPoints -1; i > 0; i--){
    let r = theCircle.r + random(theCircle.r/difference);
    let xValue = sin(angle*i) * r;
    let yValue = cos(angle*i) * r;
    curveVertex(xValue, yValue);
  }

  // put the last two points and end the shape
  curveVertex(0, theCircle.r + starty);
  curveVertex(0, theCircle.r + starty);
  endShape();
}


function keyPressed(){

  // detect what key is pressed
  if (keyCode === UP_ARROW){

    if(points < 3 && points > 0.1){
      points = points - 0.1;
      displayAllcircles();
    }

    if (points >= 3){
      points --;
      displayAllcircles();
    }
  }


  else if (keyCode === DOWN_ARROW){

    if (points < 3){
      points = points + 0.1;
      displayAllcircles();
    }

    if (points < 15 && points >3){
      points ++;
      displayAllcircles();
    }
  }


  else if (keyCode === RIGHT_ARROW){

    if (difference > 0){
      difference --;
      displayAllcircles();
    }
  }


  else if (keyCode === LEFT_ARROW){

    if (difference < 15){
      difference ++;
      displayAllcircles();
    }
  }
}

function displayAllcircles(){
  // translate the middle of the circle to the middle of the canvas
  push();
  translate(width/2, height/2);
  // display every circle
  for (let i =0; i < circles.length; i++){
    displayCircles(circles[i]);
  }
  pop();
}
