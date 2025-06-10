let referenceImg;
let imgSize = 500;
let padding = 50; 

let basicCircles = [];
let ringFills = [];    
let pinkCurveSet;
let dotRings = []; 
let spokeRings = []; 

const dotRingColorMap = {
  "71,64"   : "#FF6B6B",
  "366,-3"  : "#FF9F1A",
  "19,204"  : "#FFD93D", 

  "169,177" : "#1E90FF", 
  "319,137" : "#2ED573", 
  "475,101" : "#3742FA",

  "-10,353" : "#A55EEA", 
  "280,278" : "#FF6F91",
  "428,242" : "#F368E0",

  "80,458"  : "#00B894",
  "243,423" : "#E15F41",
  "381,385" : "#6C5CE7",

  "335,530" : "#4B6584",
  "480,510" : "#B53471"
};

function preload() {
  referenceImg = loadImage('image/Group_Pic.jpg');
}

function setup() {
  createCanvas(imgSize * 2 + padding, imgSize);
  referenceImg.resize(imgSize, imgSize); // make both 500
  noLoop();

  
  setupCircle();
  setupRingFill()
  setupPinkCurveSet();
  setupDotRings();
  setupSpokeRings();
}

function setupCircle(){

  basicCircles.push(new BasicCircle(71, 64, 0));
  basicCircles.push(new BasicCircle(217, 27, 0));
  basicCircles.push(new BasicCircle(366, -3, 0));

  basicCircles.push(new BasicCircle(19, 204, 1));
  basicCircles.push(new BasicCircle(169, 177, 0));
  basicCircles.push(new BasicCircle(319, 137, 1));
  basicCircles.push(new BasicCircle(475, 101, 1));

  basicCircles.push(new BasicCircle(-10, 353, 0));
  basicCircles.push(new BasicCircle(120, 318, 1));
  basicCircles.push(new BasicCircle(280, 278, 0));
  basicCircles.push(new BasicCircle(428, 242, 0));

  basicCircles.push(new BasicCircle(80, 458, 0));
  basicCircles.push(new BasicCircle(243, 423, 1));
  basicCircles.push(new BasicCircle(381, 385, 1));
  basicCircles.push(new BasicCircle(510, 367, 0));

  basicCircles.push(new BasicCircle(335, 530, 1));
  basicCircles.push(new BasicCircle(480, 510, 1));

}

function setupDotRings() {
  const skip = new Set(['217,27', '120,318', '510,367']);

  for (const bc of basicCircles) { 
    if (skip.has(bc.x + ',' + bc.y)) continue;

    const col = dotRingColorMap[bc.x + ',' + bc.y];
    dotRings.push(
      new DotRing(
        bc.x, bc.y,
        bc.innerRadius, bc.outerRadius,
        5, 6, col
      )
    );
  }
}

function setupSpokeRings() { 
  const specialCoords = [
    [217, 27],
    [120, 318],
    [510, 367]
  ];
  for (const [x, y] of specialCoords) {
    spokeRings.push(new SpokeRing(x, y, 35, 70)); // inner=35, outer=70
  }
}

function setupRingFill(){
  ringFills.push(new RingFill(71, 64, 'g'));
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

  // draw part
  noStroke();
  fill('#2D5574');
  rect(0, 0, imgSize, imgSize);

  for (let basicCircle of basicCircles) {
    basicCircle.display();
  }
  
  for (const dr of dotRings) dr.display();

  for (const sr of spokeRings)  sr.display();

  for (let rf of ringFills) rf.display();

  for (let pair of pinkCurveSet.curvePairs) {
    pinkCurveSet.drawPinkCurve(pair[0], pair[1]);
  }

  // blank area
  noStroke();
  fill(255);
  rect(imgSize, 0, padding, imgSize);  
  
  // Reference pic
  image(referenceImg, imgSize + padding, 0);
}



class BasicCircle {
  constructor(x, y, colorFlag = 0) {
    this.x = x;
    this.y = y;
    this.outerRadius = 70;
    this.innerRadius = 35;
    this.colorFlag = colorFlag; // 0 = green, 1 = red
  }

  display() {
    noStroke();

    // Outer circle
    fill('#f0e68c');
    circle(this.x, this.y, this.outerRadius * 2);

    // Inner circle
    fill('#A9639C');
    circle(this.x, this.y, this.innerRadius * 2);

    // Outer colored ring
    let ringFill = this.colorFlag === 0 ? '#00cc66' : '#cc3333';
    stroke(0);
    strokeWeight(6);
    fill(ringFill);
    circle(this.x, this.y, 20); // radius 10

    // Gray center dot (on top!)
    noStroke();
    fill(150);
    circle(this.x, this.y, 10); // radius 5
  }
}

class RingFill {
  constructor(x, y, colorFlag = 'r', innerRadius = 10, outerRadius = 35, count = 5) {
    this.x = x;
    this.y = y;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.count = count;

    if (colorFlag === 'g') {
      this.color = color(0, 204, 102); // green
    } else if (colorFlag === 'b') {
      this.color = color(0, 102, 255); // blue
    } else {
      this.color = color(255, 51, 51); // red as default
    }
  }

  display() {
    noFill();
    stroke(this.color);
    strokeWeight(3);

    for (let i = 0; i < this.count; i++) {
      let r = map(i, 0, this.count - 1, this.innerRadius, this.outerRadius);
      circle(this.x, this.y, r * 2);
    }
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
    stroke(255, 28, 90);
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

class DotRing {
  constructor(
    x,
    y,
    innerR,
    outerR,
    rows = 5,
    dotDiam = 6,
    col = '#05127E'
  ) {
    this.x = x;
    this.y = y;
    this.innerR = innerR;
    this.outerR = outerR;
    this.rows = rows;
    this.dotDiam = dotDiam;
    this.col = col;
  }

  display() {
    push();
    noStroke();
    fill(this.col);

    for (let i = 0; i < this.rows; i++) {
      // The radius of the current circle
      const r = lerp(
        this.innerR + this.dotDiam * 0.5,
        this.outerR - this.dotDiam * 0.5,
        i / (this.rows - 1)
      );

      // Calculate how many points are needed in this circle based on the circumference
      const numDots = floor((TWO_PI * r) / (this.dotDiam * 1.6));

      for (let j = 0; j < numDots; j++) {
        const ang = (TWO_PI * j) / numDots;
        const dx = this.x + r * cos(ang);
        const dy = this.y + r * sin(ang);
        circle(dx, dy, this.dotDiam);
      }
    }
    pop();
  }
}

class SpokeRing {
  constructor(
    x, y,
    innerR, outerR,
    nSpikes = 50,
    sw = 2,
    col = '#FF9933'
  ) {
    this.x = x;
    this.y = y;
    this.innerR = innerR;
    this.outerR = outerR;
    this.nSpikes = nSpikes;
    this.sw = sw;
    this.col = col;
  }

  display() {
    push();
    noFill();
    stroke(this.col);
    strokeWeight(this.sw);
    strokeCap(ROUND);
    strokeJoin(ROUND);

    const outerOffset = 1 * this.sw;
    const innerOffset = 1 * this.sw;

    const totalVerts = this.nSpikes * 2;
    const step = TWO_PI / totalVerts;

    beginShape();
    for (let i = 0; i < totalVerts; i++) {
      const ang = i * step;
      const radius =
        i % 2 === 0
          ? this.outerR - outerOffset
          : this.innerR + innerOffset;

      vertex(
        this.x + radius * cos(ang),
        this.y + radius * sin(ang)
      );
    }
    endShape(CLOSE);
    pop();
  }
}

