let referenceImg;
let imgSize  = 500;
let padding  = 50;

let basicCircles = [];
let pinkCurveSet;

function preload() {
  referenceImg = loadImage('image/Group_Pic.jpg');
}

function setup() {
  createCanvas(imgSize * 2 + padding, imgSize);
  referenceImg.resize(imgSize, imgSize);
  noLoop();

  setupCircle();        
  setupPinkCurveSet();  
}

function setupCircle() {   
  basicCircles.push(new BasicCircle(250, 250));
  basicCircles.push(new BasicCircle(70, 70));
}

function setupPinkCurveSet() {
  const curvePairs = [
    [[ 71,  64], [100, 146]],
    [[169, 177], [245, 119]],
    [[-10, 353], [ 52, 301]],
    [[370, 300], [280, 278]],
    [[366,  -3], [451,  28]],
    [[428, 242], [496, 180]],
    [[ 80, 458], [176, 481]]
  ];
  pinkCurveSet = new PinkCurveSet(curvePairs, 35);
}

function draw() {
  background(255);

  noStroke();
  fill('#2D5574');
  rect(0, 0, imgSize, imgSize);
  fill(255);
  rect(imgSize, 0, padding, imgSize);
  image(referenceImg, imgSize + padding, 0);

  for (let c of basicCircles) c.display();
  
  // Draw the pink curve
  stroke(255, 28, 90);
  strokeWeight(4);
  noFill();
  for (let pair of pinkCurveSet.curvePairs) {
    pinkCurveSet.drawPinkCurve(pair[0], pair[1]);
  }
}

class BasicCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.outerRadius = 70;
    this.innerRadius = 35;
    this.coreRadius  = 10;
  }

  display() {
    noStroke();  
    // Outer circle
    fill('#f0e68c'); 
    circle(this.x, this.y, this.outerRadius * 2);

    // Inner circle
    fill('#fa8072');
    circle(this.x, this.y, this.innerRadius * 2);

    // Core circle with black stroke
    stroke(0);
    strokeWeight(4);
    fill('#ffffff'); 
    circle(this.x, this.y, this.coreRadius * 2);
  }
}

class PinkCurveSet {
  constructor(curvePairs, offset = 40) {
    this.curvePairs = curvePairs;
    this.offset     = offset;
  }

    drawPinkCurve(start, end) {
    const [x1, y1] = start;
    const [x4, y4] = end;
    const midX = (x1 + x4) / 2;
    const midY = (y1 + y4) / 2;

    //3 curved lines arching downwards
    const downSet = new Set([
      '71,64,100,146',
      '80,458,176,481',
      '366,-3,451,28'
    ]);

    const key = `${x1},${y1},${x4},${y4}`;
    const dir = downSet.has(key) ? +this.offset : -this.offset;
    const ctrlY = midY + dir;
    const ctrlX = midX - Math.sign(x4 - x1) * this.offset;

    push();
    strokeWeight(5);
    strokeCap(ROUND);
    noFill();

    beginShape();
    vertex(x1, y1);
    quadraticVertex(ctrlX, ctrlY, x4, y4);
    endShape();

    pop();
  }
}






