// {"P5LIVE":{"name":"DNAWave","mod":1732527799013}} 

let elementsX = 10
let elementsY = 11

function setup() {
	createCanvas(windowWidth, windowHeight)
	
}

function draw() {
	background(0)
	fill(255)
	noStroke()
	
	var elements = 10
	
	for (let x = 0; x < elementsX; x++){
		for (let y = 0; y < elementsY +1 ; y++){
			let posY = map(y, 0, elementsY, 0, height)
			let posX = sin(radians(frameCount + x*10 + y*10 )) * 300
		
		push()
		translate(windowWidth/2 + posX,posY)

	circle(0,0,50)
	pop()
	}
	}
}
