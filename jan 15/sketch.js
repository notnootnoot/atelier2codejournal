let zRotation = 0;
let zEaseRate = 0.9; //decay faster with smaller number

let dingdong;
let boing;
let sound, amplitude, cnv;

let torRadius = 25;

//bounce code copied from https://editor.p5js.org/Tiri/sketches/Sk2da7ua
var positionX;
var xSpeed;
var positionY;
var ySpeed;


function preload() {
  soundFormats('mp3', 'ogg');
  dingdong = loadSound('assets/doorbell.mp3');
  boing = loadSound('assets/boing.mp3');
}


function setup() {
  createCanvas(400, 400, WEBGL); //added WEBGL in order to not use html5 drawing
  stroke(0, 100, 200);
  strokeWeight(5);
  fill(15,150,250);
  
  dingdong.setVolume(0.1);
  dingdong.play();
  boing.setVolume(0.1);
  boing.play();
    amplitude = new p5.Amplitude();

  //bounce
  positionX = 0;
  positionY = 0;
  xSpeed = width/100;
  ySpeed = height/200;
}

function draw() {
  background(220);
  //let level = amplitude.getLevel();
  
  //start of bounce code
  // When the ball passes either side of the canvas, TURNAROUND
  if(positionX > width/2+torRadius || positionX < 0-(width/2) - torRadius) { 
    xSpeed = xSpeed * -1; 
    boing.play();
  }
    
  if(positionY > height/2+torRadius || positionY < 0-(height/2) - torRadius) { 
    ySpeed = ySpeed * -1;
      boing.play(); 
  }
  // We always need to be moving
 positionX = positionX + xSpeed;  
 positionY = positionY - ySpeed;
  //end of bounce code
  
  
    push();// begin motion - have rotation done INSIDE of push/pull not outside

  rotateX(frameCount/PI); //rotation is in radians, not degrees. framecount/10 ishould be approx 1 rotation per second because going from 0 to 60 10 times a frame
  //rotateY(map(mouseY, 0, width, PI, 0));
  rotateZ(zRotation);
  
  translate(positionX,positionY);
  torus(torRadius*2, torRadius*1.5, 4, 5); //cube, if one number that gives equal width height and depth
  pop();//end motion
  
  
  zRotation *= zEaseRate;
  zEaseRate = map(mouseX, 0, 400, 0, 1);
  
  

  
  //once a second, do something
  if(frameCount % 60 === 0){ //if remainder of frame count divided by 60 is equal to zero then this evaluation is equal to true
    zRotation = random(0, TWO_PI);
  }
}

/* function mousePressed(){

  zRotation = random(0, TWO_PI);
  console.log(zRotation);

} */