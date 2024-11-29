// {"P5LIVE":{"name":"Furin gengo_symbol3","mod":"1732556077062"}} 

let elementsX = 11
let elementsY = 15
let font = googleFont('IBM Plex Mono')
let charset = ['¯|(o_°)/¯','¯|(°_o)/¯'] // (~_~メ) ¯\_(ツ)_/¯ ¯(°_o)/¯

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
		frameRate(15)
	var elements = 10
	
	for (let x = 0; x < elementsX; x++){
		for (let y = 0; y < elementsY +1 ; y++){
			let posY = map(y, 0, elementsY, 0, height)
			let magX = map(sin(radians(posY*0 + frameCount)),-1,1,width/2,width/2) // try posY * 50 ,30 ,60
			let posX = map(x, 0, elementsX, -magX, magX) 
		
	
	// let selector = int(random(5)) // try number 1 -5

	push()
	translate(windowWidth/2 + posX,posY)
	textSize(25)
	text(random(charset),0,0)
	pop()
	}
	}
}
