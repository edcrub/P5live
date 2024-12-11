// {"P5LIVE":{"name":"sin","mod":"1732874834186"}} 

function setup() {
	createCanvas(windowWidth, windowHeight)
	
}

function draw() {
	background(0,55);
	stroke(abs(cos(frameCount*.3)*500),random(0),0,200);
	
	// frameRate(15);
	let a = 0;
	let inc = TWO_PI /50;
	for (i = 0; i < 100; i = i + 2){
		let x = map(i , 0 , 100, 0 , width);
		strokeWeight(tan(a*frameCount*1)); // try FC = 0.3
		let t = (sin(a+i*13-frameCount*.5)) * width/1;
		line(x, height/2 + t , x , height/2 + (sin(a+frameCount*-.03) * width/5));
		a = a + inc;
	}
}
