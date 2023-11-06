let num = 200; // Number of circles
let vecLocation = []; // Vector for the center location of the circles
let vecVelocity = []; // Vector for the velocity of the circles
let R = [];
let G = [];
let B = [];
let t;
let mountainHeights = [];
let c1, c2;
let noiseDetailVal = 1; // Increase noise detail level
var a = 0.0, x, y, n, step = 3;

//individual: user input
let isDay = true;
let castleDrag = false;// Whether the castle is being dragged
let castleXOffset = 0; // X offset for the castle when dragging

function setup() {
  createCanvas(900, 630);
  background(23, 108, 177);
  frameRate(60);
  for (let i = 0; i < num; i++) {
  vecLocation[i] = createVector(random(0, width), random(height/2, height));
  vecVelocity[i] = createVector(20, 1);
  R[i] = 255;
  G[i] = 165;
  B[i] = 0;
  }
  init();
  noStroke();
  }
  
  
function draw() {
  river();
  shade();
  mountain();
  deepMountain();
  castle();  

// Sky gradient with evolving clouds
for (y = 0; y < height / 2; y += step) {
  let interpColor = getColorForHeight(y);
  for (x = 0; x < width; x += step) {
  n = noise(x / 100., y / 25., t);
  if (n > 0.99) {
  fill('#c96902');// Color of the clouds
  } else {
// Adjust the transparency range
  fill(interpColor.levels[0], interpColor.levels[1], interpColor.levels[2], n * map(y, 0, height / 2, 255, 50)); // 调整了透明度范围
  }
  rect(x, y, step, step);
  }
}
a += 0.1;
}


function castle(){
//castle bottom
fill(92,61,43); //if change or delete this line, the color will change with the refresh.
// Adjust the x-coordinate of each part of the castle by adding castleXOffset
triangle(40 + castleXOffset, 320, 80 + castleXOffset, 320, 60 + castleXOffset, 260); // Left tower
triangle(180 + castleXOffset, 300, 180 + castleXOffset, 320, 200 + castleXOffset, 320); // Right small tower
triangle(350 + castleXOffset, 320, 200 + castleXOffset, 220, 220 + castleXOffset, 320); // Right large tower
// Castle middle
rect(100 + castleXOffset, 200, 140, 100); // Main building
rect(80 + castleXOffset, 220, 160, 100); // Front wall
triangle(80 + castleXOffset, 220, 100 + castleXOffset, 220, 100 + castleXOffset, 200); // Left wall notch
triangle(160 + castleXOffset, 200, 240 + castleXOffset, 200, 200 + castleXOffset, 140); // Main building roof
rect(100 + castleXOffset, 160, 60, 40); // Main building door
quad(110 + castleXOffset, 130, 120 + castleXOffset, 140, 120 + castleXOffset, 160, 110 + castleXOffset, 160); // Door window
rect(120 + castleXOffset, 80, 40, 80); // Tower above door
triangle(140 + castleXOffset, 20, 160 + castleXOffset, 80, 120 + castleXOffset, 80); // Tower roof
pop();
}


function river(){
  for (let i = 0; i < num; i++) {
      fill(R[i], G[i], B[i]);
      vecLocation[i].add(vecVelocity[i]); // Update the coordinates of the circle
      ellipse(vecLocation[i].x, vecLocation[i].y, 30, 2); // Draw a circle at the specified location
     
      if (vecLocation[i].x < 0 || vecLocation[i].x > width) {
      vecVelocity[i].x *= -1; // Reverse the velocity in the X direction // add new color transformation logic
      if (vecLocation[i].x < 0) {
      if (
      abs(vecLocation[i].y) < height/2+height/2 / 4
      ) {
      // light yellow
      R[i] = 224;
      G[i] = 210;
      B[i] = 201;
      } else if (
      abs(vecLocation[i].y) < height/2+height/2*2 / 4
      ){
      //fuel yellow
      R[i] = 234;
      G[i] = 170;
      B[i] = 48;
      } else if (
      abs(vecLocation[i].y) < height/2+height/2*3 / 4
      ){
      R[i] = 173;
      G[i] = 99;
      B[i] = 17;
      }else{
      //dark blue
      R[i] = 86;
      G[i] = 107;
      B[i] = 155;
      }
      } else {
      if (
      abs(vecLocation[i].y) < height/2+height/2 / 4
      ) {
      // brownish tan
      R[i] = 177;
      G[i] = 121;
      B[i] = 64;
      } else if (
      abs(vecLocation[i].y) < height/2+height/2*2 / 4
      ){
      R[i] = 83;
      G[i] = 106;
      B[i] = 155;
      } else if (
      abs(vecLocation[i].y) < height/2+height/2*3 / 4
      ){
      R[i] = 225;
      G[i] = 82;
      B[i] = 47;
      }else{
      R[i] = 99;
      G[i] = 44;
      B[i] = 159;
      }
      }
      } // 检测上边界或下边界的碰撞
      if (vecLocation[i].y < 0 || vecLocation[i].y > height) {
      vecVelocity[i].y *= -1; // Y方向的速度反转 // 根据条件选择颜色
      if (vecLocation[i].y < 0) {
      // 某种颜色，例如顶部棕红
      R[i] = 182;
      G[i] = 75;
      B[i] = 26;
      } else {
      // 另一种颜色，底部 雾霾蓝
      R[i] = 130;
      G[i] = 159;
      B[i] = 196;
      }
      }
      }
}


function getColorForHeight(y) {
let h = height / 2;
if (y < h * (1/8)) {
return lerpColor(color('#0a21f0'), color('#0a66f0'), y / (h * (1/8)));
} else if (y < h * (2/8)) {
return lerpColor(color('#0a66f0'), color('#0aaff0'), (y - h * (1/8)) / (h * (1/8)));
} else if (y < h * (3/8)) {
return lerpColor(color('#0aaff0'), color('#f0cd0a'), (y - h * (2/8)) / (h * (1/8)));
} else if (y < h * (4/8)) {
return lerpColor(color('#f0cd0a'), color('#f0970a'), (y - h * (3/8)) / (h * (1/8)));
} else if (y < h * (5/8)) {
return lerpColor(color('#f0970a'), color('#f0660a'), (y - h * (4/8)) / (h * (1/8)));
} else if (y < h * (6/8)) {
return lerpColor(color('#f0660a'), color('#d44b02'), (y - h * (5/8)) / (h * (1/8)));
} else if (y < h * (7/8)) {
return lerpColor(color('#d44b02'), color('#d43602'), (y - h * (6/8)) / (h * (1/8)));
} else {
return lerpColor(color('#d43602'), color('#d41e02'), (y - h * (7/8)) / (h * (1/8)));
}
}






function init() {
t = 0;
noiseSeed(int(random(5)));
for (let x = 0; x < width; x++) {
let n = noise(t);
t += 0.01;
mountainHeights[x] = n * 100;
}
c1 = color(0);
c2 = color(0, 102, int(random(100, 255)));
}


function mountain() {
push();
stroke(105,105,105,random(0, 50)/3);
strokeWeight(10);
let rand = (0.1, 0.3)
for (let i = width ; i > 0; i--) {
line(width/3 +i , height / 2 , width /2 +i, height / 2 - (mountainHeights[i] * rand));
}
pop();
}



function deepMountain() {
push();
let rand = random(1.5,2)
stroke(92,61,43,random(100, 150)/3);
strokeWeight(10);
for (let x = width; x > 0; x--) {
line(width/ 2 - x, height / 2 , width/3 - x, height / 2 - (mountainHeights[x] * rand));
}
pop();
}


function shade() {
let lenth = random(20, 80);
push();
for (t = 0; t<400; t+=2){
let s = t/12 + lenth / 3 + random(t/10, t/5);
stroke(97,66,54, t/40 + random(150, 200)/3);
strokeWeight(1 + t/60);
line(180 - s, t+height/2, 100 + s, t+height/2);
}
pop()
}



//individual: user input

function mousePressed() {
  // Check if the mouse is within the castle area
  // This is a simple check, you might want to check against the actual castle boundaries
  if (mouseY > height / 2 && mouseY < height) {
    castleDrag = true;
    // Set the initial offset from the current mouse position
    castleXOffset = mouseX - castleXOffset;
  }
}

function mouseDragged() {
  // Update the castle's position while dragging
  if (castleDrag) {
    // Calculate the new offset based on the mouse movement
    castleXOffset = mouseX - castleXOffset;
  }
}

function mouseReleased() {
  // Stop dragging the castle
  castleDrag = false;
}



  

