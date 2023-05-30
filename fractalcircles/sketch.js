// Fractial circles -- first recursion visualization

let thecolors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "black", "white", "brown", "grey"];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  let thedepth = Math.floor(map(mouseX, 0, width, 0, 10));
  fractialcircle(width/2, width, thedepth);
}

function fractialcircle(x, diameter, depth){
  // base case
  fill(thecolors[depth]);
  circle(x, height/2, diameter);
  if (depth > 0){
    depth --;
    //left side circle
    fractialcircle(x- diameter/4, diameter/2, depth);
    // right side circle
    fractialcircle(x + diameter/4, diameter/2, depth);
  }
}