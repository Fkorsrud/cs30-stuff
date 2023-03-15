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
  background(220);
  addBoxes();
  translate(width/2, height/2);
  for (let i =0; i < circles.length; i++){
    displayCircles(circles[i]);
  }
}

function draw() {
  

  
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
  let numberofPoints = 30;
  
  
  // for (let i = numberofPoints; i > 0; i--){
  //   push();
  //   rotate(i *(360/numberofPoints));
  //   point(0, theCircle.r + random(15));
  //   pop();
  // }
 
  fill(random(255), random(255), random(255));
  beginShape();
  curveVertex(0, theCircle.r);
  curveVertex(0, theCircle.r);
  for (let i = 0; i < numberofPoints; i++){
    let r = theCircle.r + random(theCircle.r / 5);
    let xValue = sin(360/numberofPoints*i) * r;
    let yValue = cos(360/numberofPoints*i) * r;
    curveVertex(xValue,yValue);

  }
  // for (let i = numberofPoints; i > 0; i--){
  //   push();
    
  //   rotate(i *(360/numberofPoints-1));
  //   point(0, theCircle.r);
  //   curveVertex(0, theCircle.r + theCircle.r * random());
  //   pop();
  // }
  curveVertex(0, theCircle.r);
  curveVertex(0, theCircle.r);
  endShape();
}