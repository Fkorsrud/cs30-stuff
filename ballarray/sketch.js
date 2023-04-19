// Ball Array OOP

class Ball {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dy = random(-5,5);
    this.dx = random(-5,5);
    this.radius = random(30,75);
    this.r = random(255);
    this.g = random(225);
    this.b = random(255);
    this.alpha = random(150, 255);
  }

  display(){
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.radius*2);
  }
  update(){
    this.x += this.dx;
    this.y += this.dy;
    
    if (this.x - this.radius <=0 ||this.x + this.radius >= width){
      this.dx *= -1;
    }
    
    if (this.y - this.radius <= 0 || this.y +this.radius >= height ){
      this.dy *= -1;
    }
    
  }
  collisionCheck(otherBall){
    let distanceapart = dist(this.x, this.y, otherBall.x, otherBall.y);
    let radiSum = this.radius + otherBall.radius;
    if (distanceapart <= radiSum ){
      let dy = this.dy;
      let dx = this.dx;
      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      otherBall.dx = dx;
      otherBall.dy = dy;
      // this.dx *= -1;
      // this.dy *= -1;
      // otherBall.dy *= -1;
      // otherBall.dx *=-1;
      // this.update();
      // otherBall.update();
      // this.r =255;
      // this.b =0;
      // this.g = 0;
      // this.alpha = 255;


    }
  }
  
}

let ballarray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("white");
  for (let someball of ballarray){
    someball.update();
    
    for (let otherball of ballarray){
      if (someball !== otherball){
        someball.collisionCheck(otherball);
      }
    }
    someball.display();
  }
}

function mousePressed(){
  let theball = new Ball(mouseX, mouseY);
  ballarray.push(theball);
}
