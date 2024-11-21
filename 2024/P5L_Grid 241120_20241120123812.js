// {"P5LIVE":{"name":"Grid 241120","mod":"1732106292888"}} 

let gridSize = 20;
let cols = ["#D96C75", "firebrick", 'powderblue', 'lemonchiffon'];
let colg = ['teal', 'sienna'];
let patterns = [pattern1, pattern2, pattern3, pattern4];

//raffle method
// let patterns = [
// 		[pattern1,   10],
// 		[pattern2,   5],
// 		[pattern3,   1],
// 		[pattern4,   1]
// ];


function setup() {
	createCanvas(windowWidth, windowHeight);

}

function draw() {
	// background(random(colg));
	background(0);
	for(let x = 0; x < width; x += gridSize) {
		for(let y = 0; y < height; y += gridSize) {
			push();
			translate(x, y);
			drawPattern();
			pop();
		}
	}
	frameRate(4)
	// noLoop();
}

function drawPattern() {
	strokeWeight(gridSize * .2);
	stroke(random(cols));
	// or one color
	// stroke('lightgray');

	// method1
	// let selectedPattern = random(patterns);
	// selectedPattern();

	// method2	
	let r = random(1);
	if(r < 0.25) pattern1();
	else if(r < 0.5) pattern2();
	else if(r < 0.75) pattern3();
	else pattern4();


	// raffle method
	// let raffle = [];
	// for (let pattern of patterns ){
	// 	// pattern[0] --> function
	// 	// pattern[1] --> number of tickets (or probability)
	// 	for (let i = 0; i < pattern[1]; i++){
	// 		raffle.push(pattern[0]);
	// 	}
	// }
	// let selectedPattern = random(raffle);
	// selectedPattern();

}


function pattern1() {
	line(0, 0, gridSize, gridSize);
}

function pattern2() {
	line(0, gridSize, gridSize, 0);
}

function pattern3() {
	line(0, 0, gridSize / 2, gridSize / 2);
}

function pattern4() {
	line(0, gridSize, gridSize / 2, gridSize / 2);
}

// function mouseClicked(){
// 	if (mouseButton === LEFT) draw();
// }