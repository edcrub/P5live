// {"P5LIVE":{"name":"movement_newgen_turnhome","mod":"1732026282229"}} 

let font = googleFont('Mitr')
let txt = 'Movement'

function setup() {
	createCanvas(windowWidth, windowHeight)
	textFont(font)
	textAlign(CENTER, CENTER)

}

function draw() {
	background(0, 0, 0, 100)
	fill(random(100, 200), random(100, 200), random(100, 200))
	textSize(random(1, 150))
	text(txt, random(width), random(height))
	frameRate(4)
}

function keyPressed() {
	txt = key // overwrite on keypress
}

function googleFont(fontName) {
	let link = document.createElement("link")
	link.href = "https://fonts.googleapis.com/css?family=" + encodeURI(fontName) + '&display=swap'
	link.rel = "stylesheet"
	document.head.appendChild(link)
	return fontName
}
