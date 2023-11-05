let num = 200; // 圆的数量
let vecLocation = []; // 圆的中心的位置向量
let vecVelocity = []; // 圆的速度向量


// 初始化为橙色/黄色
let R = [];
let G = [];
let B = [];
let t;
let mountainHeights = [];
let c1, c2;
let noiseDetailVal = 1; // 增加噪音细节水平
var a = 0.0, x, y, n, step = 3;

//individual: user input
let isDay = true;
let shines = [];
let mountainDrag = false;
let mountainXOffset = 0;

function setup() {
 // 设置画布的尺寸为屏幕宽度和屏幕高度的一半，并将其放置在屏幕的下半部分
 createCanvas(windowWidth, windowHeight);
 let canvas = document.querySelector("canvas");
 canvas.style.position = "absolute";
 canvas.style.bottom = "0px";


 background(23, 108, 177); // 您指定的背景颜色
 frameRate(30);
 for (let i = 0; i < num; i++) {
   vecLocation[i] = createVector(random(0, width), random(height/2, height));
   vecVelocity[i] = createVector(20, 1);
   R[i] = 255; // 初始颜色，橙色
   G[i] = 165;
   B[i] = 0;
 }
   init();
   noStroke();
   noiseDetail(8, 0.5); // 调整噪音细节
}


function draw() {
 noStroke(); // 无边框
 drawShines();//individual: user input


 for (let i = 0; i < num; i++) {
   fill(R[i], G[i], B[i]); // 使用当前RGB值填充
   vecLocation[i].add(vecVelocity[i]); // 更新圆的坐标
   ellipse(vecLocation[i].x, vecLocation[i].y, 30, 2); // 在指定位置画圆


       if (vecLocation[i].x < 0 || vecLocation[i].x > width) {
           vecVelocity[i].x *= -1; // X方向的速度反转 // 在这里添加新的颜色变换逻辑
          if (vecLocation[i].x < 0) {
          
             if (
               abs(vecLocation[i].y) < height/2+height/2 / 4
             ) {
               // 新颜色，例如浅黄
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
               //深蓝
               R[i] = 86;
               G[i] = 107;
               B[i] = 155;
             }
           } else {
             if (
               abs(vecLocation[i].y) < height/2+height/2 / 4
             ) {
               // 新颜色，例如棕秀色
               R[i] = 177;
               G[i] = 121;
               B[i] = 64;
             } else if (
               abs(vecLocation[i].y) < height/2+height/2*2 / 4
             ){
               //卡蒂萨克
               R[i] = 83;
               G[i] = 106;
               B[i] = 155;
             } else if (
               abs(vecLocation[i].y) < height/2+height/2*3 / 4
             ){
               //下方量橘红
               R[i] = 225;
               G[i] = 82;
               B[i] = 47;
             }else{
               //下方紫色较亮
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
    
   moon();
   mountain();
   deppMountain();
  
   // Sky gradient with evolving clouds
   for (y = 0; y < height / 2; y += step) {
     let interpColor = getColorForHeight(y);
     for (x = 0; x < width; x += step) {
         n = noise(x / 100., y / 25., t);
         if (n > 0.99) {
             fill('#c96902');
         } else {
             fill(interpColor.levels[0], interpColor.levels[1], interpColor.levels[2], n * map(y, 0, height / 2, 255, 50));  // 调整了透明度范围
         }
         rect(x, y, step, step);
     }
 }


 a += 0.01;
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
 let rand = random(0.2, 0.4);
 for (let i = width; i > 0; i--) {
  line(width / 3 + i + mountainXOffset, height / 2 + 10, width / 2 + i + mountainXOffset, height / 2 - (mountainHeights[i] * rand));
}
 pop();
}


function deppMountain() {
   push();
   stroke(92,61,43,random(100, 150)/3);
   strokeWeight(10);
   let rand = random(2.5, 3);
   for (let x = width; x > 0; x--) {
    line(width / 2 - x + mountainXOffset, height / 2 + 10, width / 3 - x + mountainXOffset, height / 2 - (mountainHeights[x] * rand));
  }
   pop();
}


function moon() {
   let diamater = random(20, 80);
   push();
   for (t = 0; t<400; t+=2){
     let wl = t/12 + diamater / 3 + random(t/10, t/5);
     stroke(97,66,54, t/40 + random(150, 200)/3);
     strokeWeight(1 + t/60);
     line(180 - wl, t+height/2, 100 + wl, t+height/2);
   }
   pop()
}

function mouseClicked() {
  init();
  //redraw();
  //setup();
}


//individual: user input

function mousePressed() {
  // Check if the mouse is within the mountain area
  if (mouseY > height / 2 && mouseY < height) {
    mountainDrag = true;
    // Calculate the offset from the current mountain position
    mountainXOffset = mouseX - mountainXOffset;
  }
}

function mouseDragged() {
  // Update the mountain's position while dragging
  if (mountainDrag) {
    // Apply the offset to the mountain position
    mountainXOffset = mouseX - mountainXOffset;
  }
}


function drawShines() {
  for (let i = 0; i < shines.length; i++) {
    fill(255); // Shine color (white)
    noStroke();
    ellipse(shines[i].x, shines[i].y, shines[i].size, shines[i].size);
  }
}

// Function to add a shine (star)
function addShine() {
  // Add a new shine with random position and size
  shines.push({
    x: random(width),
    y: random(height / 2), // Assuming the sky is the top half of the canvas
    size: random(1, 3)
  });
}

// Function to change the sky from day to night and vice versa
function toggleDayNight() {
  isDay = !isDay;
  if (isDay) {
    // Daytime sky
    background(135, 206, 235); // Light blue sky
  } else {
    // Nighttime sky
    background(25, 25, 112); // Dark blue sky
    }
  }
  
  // Function to handle key presses
  function keyPressed() {
    if (key === 't' || key === 'T') {
      addShine(); // Add a shine when 't' is pressed
    } else if (key === 'd' || key === 'D') {
      toggleDayNight(); // Toggle day/night when 'd' is pressed
    }
  }
  

