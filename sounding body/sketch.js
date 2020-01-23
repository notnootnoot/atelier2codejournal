/* 
song: https://freemusicarchive.org/music/Meavy_Boy/EP_71_to_20/Flowery_Poses

sound effects:
http://freesoundeffect.net/sound/sparkle-flutter-zoom-sound-effect

background stars code yoink'd from https://editor.p5js.org/dcbriccetti/sketches/r1A5360em
*/

const starColorsHsb = [
  [223, 225, 245]
];

let fing;

let music;
let sparkle;
let woosh;
let sound, amplitude, cnv;

let stars;



function setup() {
  createCanvas(400, 400, WEBGL);
  fing = loadModel('assets/thumb.obj')
  
  //audio
  soundFormats('mp3', 'ogg');
  music = loadSound('assets/flowery-poses.mp3');
  sparkle = loadSound('assets/sparkle.mp3');
  woosh = loadSound('assets/droid-flyby.mp3');
  
  
  //stars
  function r() {
  	return random(-700, 700);
	}
   stars = Array.apply(null, Array(100)).map(() => [
  	createVector(r(), r(), r()),
  	int(random(starColorsHsb.length))
	]);
  //end stars
}

function draw() {
  
  //audio - play background music
  if(music.isLoaded()){
    music.setVolume(0.2);
    music.playMode('untilDone'); //loop, not layer audio
    music.play();
  }
  
  //lighting
  /*//stolen from https://p5js.org/examples/lights-directional.html
  const dirY = (mouseY / height - 0.5) * 4;
  const dirX = (mouseX / width - 0.5) * 4;*/
  
  background(34, 38, 66);
  
  //stars
  for (const star of stars) {
    push();
    const pos = star[0];
    const z = cos(frameCount / 50) * 500;
    translate(pos.x, pos.y, z + pos.z);
    stroke(...starColorsHsb[star[1]]);
    sphere(1);
    pop();
  }
  
  //lighting
  //ambientLight(50);
  directionalLight(183, 43, 214, width*0.25, height * 0.25, 1); //purple light
  pointLight(51, 143, 255, width * 0.75, height/2, 250); //blue light
  
  
  //fingers
  orbitControl();
  scale(4 + sin(frameCount * 0.6));
  fill(255,183,5);
  noStroke();
  
  rotateZ(frameCount * 0.01);
  //rotateX(HALF_PI * -1 + sin(frameCount * 0.1));
  rotateY(HALF_PI + sin(frameCount * 0.1));
  
  specularMaterial(224);
  model( fing );
}