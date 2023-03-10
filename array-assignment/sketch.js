// Arrays and object notation
// Faith
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circles = [];
let maxDiameter;
let sizeChange = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  addBoxes();
  translate(width/2, height/2);
}

function draw() {
  background(220);
  displayCircles(circles[4]);
  // for (let i =0; i < circles.length; i++){
  //   displayCircles(circles[i]);
  // }
}


function spawnCircle(diaMeter){
  let someCirle = {
    d: diaMeter,
    r: diaMeter/2,
  };
  circles.push(someCirle);
}

function addBoxes() {
  if (width >= height){
    maxDiameter = width;
  }
  else{
    maxDiameter = height;
  }
  for (let i = maxDiameter; i > 5; i-= sizeChange){
    spawnCircle(i);
  }
}

function displayCircles(theCircle){
  let numberofPoints = theCircle.d /5;
  beginShape();
  fill(random(255), random(255), random(255));
  for (let i = numberofPoints; i > 0; i--){
    push();
    rotate(i *(360/numberofPoints));
    curveVertex(0, 0 + theCircle.r);
    pop();
  }
  endShape();
}