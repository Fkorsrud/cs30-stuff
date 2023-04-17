// OOP walker demo

class Walker {
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = 10;
    this.size = 10;
  }
  
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.size);
  }

  move(){
    let choice = random(100);
    if (choice < 25){
      //up
      this.y -= this.speed;
    }
    else if (choice < 50){
      //down
      this.y += this.speed;
    }
    else if (choice < 75){
      //down
      this.x -= this.speed;
    }
    else {
      // right
      this.x += this.speed;
    }
  }
}

let kevin;
let wasi;
let w1;
let w2;
let w3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kevin = new Walker(400, 200,  "red");
  wasi = new Walker(600,400, "red");
  w1 = new Walker(800,400, "red");
}

function draw() {
  wasi.move();
  kevin.move();
  w1.move();

  kevin.display();
  wasi.display();
  w1.display();
  
}
