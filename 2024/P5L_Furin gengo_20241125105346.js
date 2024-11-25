// {"P5LIVE":{"name":"Furin gengo","mod":1732532026247}} 

let elementsX = 10
let elementsY = 30 // try 20, 30 ,50

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
			let magX = map(sin(radians(posY*50 + frameCount)),-1,1,-300,300) // try posY * 50 ,30 ,60
			let posX = map(x, 0, elementsX, -magX, magX) 
		
		push()
		translate(windowWidth/2 + posX,posY)

	circle(0,0,22)
	pop()
	}
	}
}