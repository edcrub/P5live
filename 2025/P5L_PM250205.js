// {"P5LIVE":{"name":"PM250205","mod":"1738763370404"}} 

let libs = ['https://unpkg.com/hydra-synth', 'includes/libs/hydra-synth.js', 'https://cdn.jsdelivr.net/gh/ffd8/hy5@main/hy5.js', 'includes/libs/hy5.js']

// sandbox - start
H.pixelDensity(2) // 2x = retina, set <= 1 if laggy

s0.initP5() // send p5 to hydra
P5.toggle(0) // optionally hide p5

src(s0)
	.modulate(noise(200,0,0))
	.modulateRepeat(osc(10),1,2,0,-.5)
	.modulateRotate(osc(10))
	.out()
// sandbox - end


let colors = ['#FF4500', '#FF0000', '#FF1493', '#4B0082', '#FFD700'];
let ctx;
let motions = [];
let motionClasses = [];
let sceneTimer = 0;
let resetTime = 60 * 25;
let fadeOutTime = 30;

function setup() {
	createCanvas(windowWidth,windowHeight);
	rectMode(CENTER);
	ctx = drawingContext;
	INIT();
}

function draw() {
	background('#ffffff');
	for (let m of motions) {
		m.run();
	}

	let alph = 8;
	if ((resetTime - fadeOutTime) < sceneTimer && sceneTimer <= resetTime) {
		alph = map(sceneTimer, (resetTime - fadeOutTime), resetTime, 0, 255);
		background(0, alph);

	}

	if (frameCount % resetTime == 0) {
		INIT();
	}

	sceneTimer++;

}

function INIT() {
	sceneTimer = 0;
	motions = [];
	motionClasses = [Motion01, Motion02, Motion03, Motion04, Motion05];
	let drawingRegion = width * 0.75;
	let cellCount = 25;
	let cellSize = drawingRegion / cellCount;
	let clr = '#000000';
	for (let i = 0; i < cellCount; i++) {
		for (let j = 0; j < cellCount; j++) {
			let x = cellSize * j + (cellSize / 2) + (width - drawingRegion) / 2;
			let y = cellSize * i + (cellSize / 2) + (height - drawingRegion) / 2;
			let MotionClass = random(motionClasses);
			let t = -int(dist(x, y, width / 2, height / 2) * 0.7);
			motions.push(new MotionClass(x, y, cellSize, t, clr));
		}
	}
}

function easeInOutQuint(x) {
	return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

class Agent {
	constructor(x, y, w, t, clr) {
		this.x = x;
		this.y = y;
		this.w = w;

		this.t1 = int(random(30, 100));
		this.t2 = this.t1 + int(random(30, 100));
		this.t = t;
		this.clr2 = color(clr);
		this.clr1 = color(random(colors));
		this.currentColor = this.clr1;
	}

	show() {
	}

	move() {
		if (0 < this.t && this.t < this.t1) {
			let n = norm(this.t, 0, this.t1 - 1);
			this.updateMotion1(easeInOutQuint(n));
		} else if (this.t1 < this.t && this.t < this.t2) {
			let n = norm(this.t, this.t1, this.t2 - 1);
			this.updateMotion2(easeInOutQuint(n));
		}
		this.t++;
	}

	run() {
		this.show();
		this.move();
	}

	updateMotion1(n) {

	}
	updateMotion2(n) {

	}

}

class Motion01 extends Agent {
	constructor(x, y, w, t, clr) {
		super(x, y, w, t, clr);
		this.shift = this.w * 3;
		this.ang = int(random(4)) * (TAU / 4);
		this.size = 0;
	}

	show() {
		noStroke();
		fill(this.currentColor);
		square(this.x + this.shift * cos(this.ang), this.y + this.shift * sin(this.ang), this.size);
	}

	updateMotion1(n) {
		this.shift = lerp(this.w * 3, 0, n);
		this.size = lerp(0, this.w, n);
		this.currentColor = lerpColor(this.clr1, this.clr2, n);
	}
}

class Motion02 extends Agent {
	constructor(x, y, w, t, clr) {
		super(x, y, w, t, clr);
		this.shift = this.w * 2;
		this.ang = int(random(4)) * (TAU / 4);
		this.size = 0;
		this.corner = this.w / 2;
	}

	show() {
		noStroke();
		fill(this.currentColor);
		square(this.x + this.shift * cos(this.ang), this.y + this.shift * sin(this.ang), this.size, this.corner);
	}

	updateMotion1(n) {
		this.shift = lerp(0, this.w * 2, n);
		this.size = lerp(0, this.w / 2, n);
	}

	updateMotion2(n) {
		this.size = lerp(this.w / 2, this.w, n);
		this.shift = lerp(this.w * 2, 0, n);
		this.corner = lerp(this.w / 2, 0, n);
		this.currentColor = lerpColor(this.clr1, this.clr2, n);
	}
}

class Motion03 extends Agent {
	constructor(x, y, w, t, clr) {
		super(x, y, w, t, clr);
		this.shift = this.w * 2;
		this.ang = 0;
		this.size = 0
	}

	show() {
		push();
		translate(this.x, this.y);
		rotate(this.ang);
		noStroke();
		fill(this.currentColor);
		square(0, 0, this.size);
		pop();
	}

	updateMotion1(n) {
		this.ang = lerp(0, TAU, n);
		this.size = lerp(0, this.w, n);
		this.currentColor = lerpColor(this.clr1, this.clr2, n);

	}
}

class Motion04 extends Agent {
	constructor(x, y, w, t, clr) {
		super(x, y, w, t, clr);
		this.shift = this.w * 2;
		this.ang = int(random(4)) * (TAU / 4);
		this.rot = PI;
		this.side = 0;
	}

	show() {
		push();
		translate(this.x, this.y);
		rotate(this.ang);
		translate(-this.w / 2, -this.w / 2);
		rotate(this.rot);
		fill(this.currentColor);
		rect(this.w / 2, (this.w / 2) - (this.w - this.side) / 2, this.w, this.side);
		pop();
	}

	updateMotion1(n) {
		this.side = lerp(0, this.w, n);
	}

	updateMotion2(n) {
		this.currentColor = lerpColor(this.clr1, this.clr2, n);
		this.rot = lerp(PI, 0, n);
	}
}

class Motion05 extends Agent {
	constructor(x, y, w, t, clr) {
		super(x, y, w, t, clr);
		this.shift = this.w / 2;
		this.size = 0;
	}

	show() {
		push();
		translate(this.x, this.y);
		for (let i = 0; i < 4; i++) {
			fill(this.currentColor);
			square((this.w / 4) + this.shift, (this.w / 4) + this.shift, this.size);
			rotate(TAU / 4);
		}
		pop();
	}

	updateMotion1(n) {
		this.size = lerp(0, this.w / 4, n);
	}

	updateMotion2(n) {
		this.currentColor = lerpColor(this.clr1, this.clr2, n);
		this.shift = lerp(this.w / 2, 0, n);
		this.size = lerp(this.w / 4, this.w / 2, n);

	}
}