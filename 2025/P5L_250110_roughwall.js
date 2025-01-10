// {"P5LIVE":{"name":"250110_roughwall","mod":"1736082814166"}} 

let libs = ['https://unpkg.com/hydra-synth', 'includes/libs/hydra-synth.js', 'https://cdn.jsdelivr.net/gh/ffd8/hy5@main/hy5.js', 'includes/libs/hy5.js']

// sandbox - start
s0.initP5()
P5.toggle(0)
H.toggle(0)

noize().out()

var H2 = HY5.hydra('hydra2', 'synth') // 2nd hydra
synth.s0.initP5()
H2.z(2) // double check on top

H2.pixelDensity(2) // 2x = retina, set <= 1 if laggy

synth.src(synth.s0)
	.modulateScale(synth.src(synth.o0).scale(.25))
	.out()
// sandbox - end

let objs = [];
let colors = ['#f71735', '#067bc2', '#FFC247', '#3BD89F', '#81cfe5', '#f654a9'];
let centerX, centerY;

function setup() {
	createCanvas(windowWidth,windowHeight);
	shuffle(colors, true);
	centerX = width / 2;
	centerY = height / 2;
	for (let i = 0; i < 5000; i++) {
		let x = random(-0.5, 1) * width;
		let y = random(-0.5, 1) * height;
		let d = width * random(0.02, 0.3);
		let newShape = { x: x, y: y, d: d };
		let overlap = false;
		for (let o of objs) {
			if (checkCircleCollision(newShape, o)) {
				overlap = true;
				break;
			}
		}
		if (!overlap) {
			objs.push(new Circle(x, y, d));
		}
	}
}

function draw() {
	background('black');
	for (let o of objs) {
		o.show();
		o.move();
	}
	for (let i = 0; i < objs.length; i++) {
		if (objs[i].isDead) {
			objs.splice(i, 1);
		}
	}
	addObjs();
}

function addObjs() {
	for (let i = 0; i < 50; i++) {
		let x = random(0, 1) * width;
		let y = random(1, 2) * height;
		let d = width * random(0.02, 0.3);
		let newShape = { x: x, y: y, d: d };
		let overlap = false;
		for (let o of objs) {
			if (checkCircleCollision(newShape, o)) {
				overlap = true;
				break;
			}
		}
		if (!overlap) {
			objs.push(new Circle(x, y, d));
		}
	}
}

function checkCircleCollision(a, b) {
	let distSq = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
	let radiusSum = (a.d / 2) + (b.d / 2);
	return distSq < radiusSum ** 2;
}

function easeInOutQuad(x) {
	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

class Circle {
	constructor(x, y, d) {
		this.x = x;
		this.y = y;
		this.minD = width * 0.00;
		this.maxD = d;
		this.d = d;
		this.currentD = this.minD;
		this.col = random(colors);
		this.isDead = false
		this.Xstep = 0;
		this.Ystep = -width / 300;
		this.radius = width * 0.4;
	}
	show() {
		push();
		fill(this.col);
		noStroke();
		circle(this.x, this.y, this.currentD);
		pop();
	}
	move() {
		let dst = dist(centerX, centerY, this.x, this.y);
		if (dst < this.radius) {
			let n = norm(dst, 0, this.radius);
			this.currentD = lerp(this.maxD, this.minD, n * 5);//try **
		}else{
			this.currentD = this.minD;
		}
		this.x += this.Xstep;
		this.y += this.Ystep;

		if (this.x > width * 1.2 && this.y > height * 1.2) {
			this.isDead = true;
		}
	}
}