// {"P5LIVE":{"name":"250102_001","mod":1735046997291}} 

let particles = [];
let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // lets define a color-palette from which
  // each particle in the following will 
  // get to select its own color randomly
  colors.push(color(0));
  colors.push(color(255));
  //colors.push(color(255,150,0));
  //colors.push(color(150,255,0));
  //colors.push(color(0,150,255));
  
  // lets generate some particles using a
  // loop and the new operator.
  for(let i=0;i<200;i++) {
    particles.push(new Particle());
  }
  
  
  background(0);
}

function draw() {
  background(0,20);
  // iterate the particles using forEach
  particles.forEach(particle => {
    particle.draw();
  });
}

class Particle {
  
  // like setup is the first thing that is called
  // when a sketch is played, the constructor of an
  // Object is the first thing that is being called.
  // in the following we initialise a set of particle
  // properties which will be different for each 
  // new instance of the Particle class.
  constructor() {
    // a particle's own properties will
    // be assigned randomly here.
    this.x = random(0,width);
    this.y = random(0,height);
    this.speedX = random(-1,1)*4;
    this.speedY = random(-1,1)*4;
    this.col = random(colors);
    this.size = random(5, 50);
  }
  
  draw() {
    // draw the particle based on its
    // on properties
    for(let i=0;i<40;i++) {
      
    push();
    translate(this.x, this.y);
    stroke(this.col);
    //noStroke();
    //fill(this.col);
    noFill();
      
    rect(i*10,100,this.size,200);
    pop();
    }
    
    // update a particle's location
    // based on its speed
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    
    // (un-)comment next 2 lines for wavy movement
    this.x += cos(frameCount*0.011) * 4.4;
    this.y += tan(frameCount*0.04) * 1.4;
    
    
    // check the location of the particle
    // against the boundaries of the canvas.
    // once travelled too far, the particle will
    // re-enter at the opposite side of the canvas.
    if(this.x<0) {
      this.x += width;
    }else if(this.x>width) {
      this.x -= width;
    }
    if(this.y<0) {
      this.y += height;
    }else if(this.y > height) {
      this.y -= height;
    }
  }
}