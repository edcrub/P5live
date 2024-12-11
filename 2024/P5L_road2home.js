// {"P5LIVE":{"name":"road2home","mod":"1733237774570"}} 

let shapes = [];
let ctx;
let colors = ['#20B2AA', '#48D1CC', '#2F4F4F', '#008B8B', '#008080', '#5F9EA0'];

function setup() {
	createCanvas(windowWidth,windowHeight);
	rectMode(CENTER);
	ctx = drawingContext;
	let count = 9;
	let cellSize = width / count;
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < count; j++) {
			let x = i * cellSize + cellSize / 2;
			let y = j * cellSize + cellSize / 2;
			shapes.push(new Arcs(x, y, cellSize));
		}
	}
}

function draw() {
	background('white');
	for (let i of shapes) {
		i.run();
	}
}

function easeInOutCubic(x) {
	return x < 0.1 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

class Arcs {
	constructor(x, y, w) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.sw = w * 0.3;
		this.ang = int(random(4)) * PI / 2;
		this.shift = 0;
		this.t1 = 30;
		this.t2 = this.t1 + 50;
		this.init();
		this.clrs = [];
		for (let i = 0; i < colors.length; i++) {
			this.clrs.push(colors[i]);
		}
		shuffle(this.clrs, true);

	}

	show() {
		push();
		translate(this.x, this.y);
		noStroke();
		fill(this.clrs[0]);
		square(0, 0, this.w);
		ctx.clip();
		rotate(this.ang);
		noStroke();
		fill(this.clrs[1]);
		this.concentricCircles((this.w / 2) + this.shift * this.w / 2, (this.w / 2) + this.shift * this.w / 2, this.w);
		this.concentricCircles(-(this.w / 2) - this.shift * this.w / 2, -(this.w / 2) - this.shift * this.w / 2, this.w);
		this.concentricCircles(-(this.w / 2) - (1 - this.shift) * this.w / 2, (this.w / 2) + (1 - this.shift) * this.w / 2, this.w);
		this.concentricCircles((this.w / 2) + (1 - this.shift) * this.w / 2, -(this.w / 2) - (1 - this.shift) * this.w / 2, this.w);
		pop();
	}

	move() {
		this.t++;
		if (0 < this.t && this.t < this.t1) {
			let n = norm(this.t, 0, this.t1 - 1);
			if (this.motionType == 0) {
				this.ang = lerp(this.ang0, this.ang1, easeInOutCubic(n));
			} else if (this.motionType == 1) {
				this.shift = lerp(this.shift0, this.shift1, easeInOutCubic(n));
			}
		}
		else if (this.t2 <= this.t) {
			this.init();
		}
	}

	init() {
		this.t = -80 * int(random(4) + 1);
		this.ang0 = this.ang;
		this.ang1 = this.ang + random([-1, 1]) * PI / 2;
		this.shift0 = this.shift;
		this.shift1 = (this.shift + 1) % 2;
		this.motionType = int(random(2));
	}

	run() {
		this.show();
		this.move();
	}


	concentricCircles(x, y, d) {
		let n = 4;
		for (let i = 0; i < n; i++) {
			let dd = map(i, 0, n-1, d * 1.25, d * 0.75);
			fill(this.clrs[i + 1]);
			circle(x, y, dd);
		}
	}
}
