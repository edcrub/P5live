// {"P5LIVE":{"name":"Furin gengo_symbol","mod":1732542742444}} 

let elementsX = 11
let elementsY = 15
let font = googleFont('Noto Sans Symbols 2')
var charset = '⬒⬓▤▣'

function googleFont(fontName) {
	let link = document.createElement("link")
	link.href = "https://fonts.googleapis.com/css?family=" + encodeURI(fontName) + '&display=swap'
	link.rel = "stylesheet"
	document.head.appendChild(link)
	return fontName
}



function setup() {
	createCanvas(windowWidth, windowHeight)
	textFont(font)
	textAlign(CENTER, CENTER)
}

function draw() {
	background(0)
		fill(255)
	// noStroke()
		frameRate(20)
	var elements = 10
	
	for (let x = 0; x < elementsX; x++){
		for (let y = 0; y < elementsY +1 ; y++){
			let posY = map(y, 0, elementsY, 0, height)
			let magX = map(sin(radians(posY*50 + frameCount)),-1,1,-width/2,width/2) // try posY * 50 ,30 ,60
			let posX = map(x, 0, elementsX, -magX, magX) 
		
	
	let selector = int(random(5))

	push()
	translate(windowWidth/2 + posX,posY)
	textSize(70)
	text(charset[selector],0,0)
	pop()
	}
	}
}
