// {"P5LIVE":{"name":"250121","mod":1737381117239}} 

/*	
	_hydra_only // cc teddavis.org 2024
	incase you only want to play with ~[HYDRA]LIVE
	edit hydra code within '// sandbox start/stop' for smooth (eval) changes
	cheatsheets: https://hydra.ojack.xyz/api/ + https://hydra.ojack.xyz/docs
*/

// no p5
let libs = ['https://unpkg.com/hydra-synth', 'includes/libs/hydra-synth.js']
let hydra = new Hydra()
hydra.setResolution(window.innerWidth, window.innerHeight) // retina res

// sandbox - start
bpm = 180
osc(48,-.01).thresh([.2,.8].fast(.125),() => Math.sin(time/2)).color(1).posterize(8)
    .repeat(3, 2, () => Math.cos(time*.8), () => Math.sin(time/2))
    .add(voronoi(50,6,20).color(255))
    .modulateScrollY(osc(2,0.5,0),.3)
	.out()

// sandbox - stop