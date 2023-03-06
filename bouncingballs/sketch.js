// bouncing ball demo
//using arrays and objects notation

let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(220);
  moveShapes();
  detectcollision();
  displayShapes();
  
}

function spawnBall(tempx,tempy){
  let newBall = {
    x: tempx,
    y: tempy,
    dx: random(-5, 5),
    dy: random(-5,5),
    diameter: random(25,100),
    theColor: color(random(255), random(255), random(255)),
  };
  shapes.push(newBall);
}

function moveShapes(){
  for (let i = 0; i < shapes.length; i++){
    if (shapes[i].x > width - shapes[i].diameter/2){
      shapes[i].dx = shapes[i].dx *-1;
    }
    if(shapes[i].x < 0 + shapes[i].diameter/2){
      shapes[i].dx = shapes[i].dx *-1;
    }
    if (shapes[i].y > height - shapes[i].diameter/2){
      shapes[i].dy = shapes[i].dy *-1;
    }
    if(shapes[i].y < 0 + shapes[i].diameter/2){
      shapes[i].dy = shapes[i].dy *-1;
    }
    shapes[i].x += shapes[i].dx;
    shapes[i].y += shapes[i].dy;
  }

}


function displayShapes(){
  for (let i = 0; i < shapes.length; i++){
    fill(shapes[i].theColor);
    circle(shapes[i].x, shapes[i].y, shapes[i].diameter);
  }

}

function mousePressed(){
  spawnBall(mouseX, mouseY);
}

function detectcollision(){
  for (let i=0; i < shapes.length; i++){
    for (let u=0; u < shapes.length; u++){
      if(i !== u){
        if (shapes[i].x  > shapes[u].x  && shapes[i].y === shapes[u].y){
          shapes[i].dx = shapes[i].dx *-1;
          shapes[i].dy = shapes[i].dy *-1;
          shapes[u].dx = shapes[i].dx *-1;
          shapes[u].dy = shapes[i].dy *-1;
        }
      }
    }
  }
}