// {"P5LIVE":{"name":"take off","mod":"1732879206939"}} 

function setup() {
	createCanvas(windowWidth, windowHeight)
	
}

function draw() {
	background(0,30);
	stroke(255);
	
	// frameRate(8);
	let a = 0;
	let lc = 100;
	let inc = TWO_PI / parseFloat(lc/30);
	for (i = 0; i < lc; i = i + 2){
		let x = map(i , 0 , 100, 0 , width);
		strokeWeight(sin(frameCount*.5)*8);
		line(x, height*.9 , x, height/2 + (tan(a+frameCount* -.03) * width/20));
		a = a + inc;
	}
}
