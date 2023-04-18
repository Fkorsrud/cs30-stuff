// fireworks OOP demo

class Spark {
  constructor(x, y, dx, dy, r, g, b, ra, angle, speed){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.size = 5;
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = 255;
    this.ra = ra;
    this.angle = angle;
    this.speed = speed;
  }
  display(){
    noStroke();
    fill(this.r, this.b, this.g, this.alpha);
    let x = sin(this.angle) * this.ra;
    let y = cos(this.angle) * this.ra;
    circle(this.x + x, this.y + y, this.size );
  }
  update(){
    // this.x += this.dx;
    // this.y += this.dy;
    this.alpha -= 3;
    this.ra += this.speed;
  }
  isdead(){
    return this.alpha <= 0;
  }
}

let sparkarray = [];
let amount = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background("black");
  for (let i = sparkarray.length - 1; i>= 0; i--){
    sparkarray[i].update();
    sparkarray[i].display();

    if (sparkarray[i].isdead()){
      sparkarray.splice(i, 1);
    }
  }
}


function mousePressed(){
  let r = random(255);
  let g = random(255); 
  let b = random(255);
  let ra = random(5);
  let angle = 0;
  for (let i = 0; i < amount; i++){
    let theSpark = new Spark(mouseX, mouseY, random(-5,5), random(-5,5), r, g, b, random(25), angle, random(10));
    sparkarray.push(theSpark);
    angle += 360/ amount;
  }
}


