let flowers = []; 
let petalMin, petalMax; 

function setup() {
  createCanvas(1440, 815);
  
  colorMode(HSB); 
  angleMode(DEGREES); 
  
  petalMin = 0.1; 
  petalMax = 0.3; // 0.5 for bigger ones
}

function draw() {
  background(0, 0, 0, 10 / 255);
  
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].update(); 
    flowers[i].display(); 
  }
  
  push(); 
  textFont('courier new'); 
  textSize(18); 
  fill(0, 0, 255); 
  text('[click] to grow flowers for your garden', 20, height - 40); 
  text('[space] to clear your garden', 20, height - 20); 
  pop(); 
}

function mouseClicked() {
  flowers.push(new Flower(mouseX, mouseY)); 
}

function keyPressed() {
  if (keyCode === 32) {
    flowers = []; 
    background(0, 0, 0); 
  }
}

class Flower {
  constructor(x, y) {
    this.x = x; 
    this.y = y; 
    this.c = int(random(0, 255)); 
    this.cs = random(0.1, 0.3);
    this.rotation = random(0, 360); 
    this.rotateSpeed = random(0.1, 0.5); 
    this.clockwise = random(0, 1) >= 0.5; 
    this.increase = random(0, 1) >= 0.5; 
    this.petalSize = random(petalMin, petalMax); 
    this.growing = random(0, 1) >= 0.5; 
    this.growSpeed = random(0.0005, 0.0015); 
  }
  
  update() {
    // update color
    if (this.c > 255) {
      this.increase = false; 
    }
    if (this.c < 0) {
      this.increase = true; 
    }
    if (this.increase) {
      this.c += this.cs; 
    }
    else {
      this.c -= this.cs; 
    }
    
    // update petal size 
    if (this.petalSize > petalMax) {
      this.growing = false; 
      this.clockwise = !this.clockwise; 
    }
    if (this.petalSize < petalMin) {
      this.growing = true; 
      this.clockwise = !this.clockwise; 
    }
    if (this.growing) {
      this.petalSize += this.growSpeed; 
    }
    else {
      this.petalSize -= this.growSpeed; 
    }
    
    // update rotation
    if (this.clockwise) {
      this.rotation += this.rotateSpeed; 
    }
    else {
      this.rotation -= this.rotateSpeed; 
    }
  }
  
  display() {
    push();
    fill(this.c, 255, 255, 10 / 255); 
    translate(this.x, this.y); 
    rotate(this.rotation);
    noStroke();
    for (var r1 = 0; r1 < 10; r1++) {
      ellipse(0, this.petalSize * 400, 10 + this.petalSize * 300, 20 + this.petalSize * 600); 
      rotate(36);
    }
    pop();
  }
}