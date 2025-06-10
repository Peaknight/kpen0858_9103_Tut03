let referenceImg;
let imgSize = 500;
let padding = 50; 

let basicCircles = [];
let ringFills = [];    
let pinkCurveSet;

let innerDotRings = [];
let dotRings = [];
let spokeRings = [];

let chains = [];

const dotRingColorMap = {
//line one
  "71,64"   : "#231775",
  "366,-3"  : "#F11006",
//line two
  "19,204"  : "#231775", 
  "169,177" : "#177822", 
  "319,137" : "#CC90DF", 
  "475,101" : "#073575",
//line three
  "-20,353" : "#0C9482", 
  "280,278" : "#D0363F",
  "428,242" : "#EC660F",
//line four
  "80,458"  : "#F31D14",
  "230,423" : "#D8196D",
  "370,390" : "#207AB9",
//line five
  "335,530" : "#F23C32",
  "480,510" : "#5CC272"
};

function preload() {
  referenceImg = loadImage('image/Group_Pic.jpg');
}

function setup() {
  createCanvas(imgSize * 2 + padding, imgSize);
  referenceImg.resize(imgSize, imgSize); // make both 500
  noLoop();

  
  setupCircle();

  setupDotRings();
  setupInnerDotRings()
  setupSpokeRings();

  setupRingFill()
  setupPinkCurveSet();
  setupChains();
  
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
  for (const idr of innerDotRings) idr.display();

  for (const dr of dotRings) dr.display();

  

  for (const sr of spokeRings) sr.display();

  for (let rf of ringFills) rf.display();
  
  for (let ch of chains) ch.display();

  for (let pair of pinkCurveSet.curvePairs) {
    pinkCurveSet.drawPinkCurve(pair[0], pair[1]);
  }

  

  // blank area
  noStroke();
  fill(255);
  rect(imgSize, 0, padding, imgSize);  
  
  // Refernce pic
  image(referenceImg, imgSize + padding, 0);

}

function setupCircle(){
//layout reference up to down, left to right
//line one 
  basicCircles.push(new BasicCircle(71, 64, 0, 'w'));
  basicCircles.push(new BasicCircle(217, 27, 0 ));
  basicCircles.push(new BasicCircle(366, -3, 0, 'w'));
//line two
  basicCircles.push(new BasicCircle(19, 204, 1));
  basicCircles.push(new BasicCircle(169, 177, 0, 'w'));
  basicCircles.push(new BasicCircle(319, 137, 1));
  basicCircles.push(new BasicCircle(475, 101, 1));
//line three
  basicCircles.push(new BasicCircle(-20, 353, 0, 'w'));
  basicCircles.push(new BasicCircle(125, 318, 1));
  basicCircles.push(new BasicCircle(280, 278, 0, 'w'));
  basicCircles.push(new BasicCircle(428, 242, 0, 'w'));
//line four
  basicCircles.push(new BasicCircle(80, 458, 0, 'w'));
  basicCircles.push(new BasicCircle(230, 423, 1));
  basicCircles.push(new BasicCircle(370, 390, 1));
  basicCircles.push(new BasicCircle(515, 367, 0));
//line five
  basicCircles.push(new BasicCircle(335, 530, 1, 'w'));
  basicCircles.push(new BasicCircle(480, 510, 1, 'w'));
}

function setupDotRings() {
  const skip = new Set(['217,27', '125,318', '515,367']);

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
  const rings = [
    { x: 217, y: 27, inner: 35, outer: 70, col: "#EE1D02" },  // 外圈 spoke
    { x: 125, y: 318, inner: 35, outer: 70, col: "#EE1D02" },
    { x: 515, y: 367, inner: 35, outer: 70, col: "#EE1D02" },

    // 新增：内圈 10-35
    { x: 280, y: 278, inner: 10, outer: 35, col: "#FD603A" }, 
  ];

  for (const r of rings) {
    spokeRings.push(new SpokeRing(r.x, r.y, r.inner, r.outer, 40, 2, r.col));
  }
}

function setupInnerDotRings() {
  innerDotRings.push(new DotRing(217, 27, 15, 35, 3, 6, '#FA5F21'));
  innerDotRings.push(new DotRing(19, 204, 15, 35, 3, 6, '#FA5F21'));
  innerDotRings.push(new DotRing(475, 101, 15, 35, 3, 6, '#F5DCF4'));
  innerDotRings.push(new DotRing(125, 318, 15, 35, 3, 6, '#F01318'));
  innerDotRings.push(new DotRing(335, 530, 15, 35, 3, 6, '#5CB677'));
  
}

function setupRingFill(){
  ringFills.push(new RingFill(71, 64, 'g'));
  ringFills.push(new RingFill(169, 177,'r'));
  ringFills.push(new RingFill(319, 137, 'b'));
  ringFills.push(new RingFill(428, 242, 'g'));
  ringFills.push(new RingFill(80, 458, 'b'));
  ringFills.push(new RingFill(370, 390, 'r'));
  ringFills.push(new RingFill(515, 367, 'g'));
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

function setupChains() {
//line1
  chains.push(new ChainLink([5,3], [-10,114], 5, 4));
  chains.push(new ChainLink([131,4], [160,91], 6, 6));
  chains.push(new ChainLink([-10,114], [89,147], 4, 4));
  chains.push(new ChainLink([160,91], [89,147], 4, 5));
  chains.push(new ChainLink([160,91], [230,113], 3, 6));
  chains.push(new ChainLink([297,55], [230,113], 4, 5));
  chains.push(new ChainLink([297,55], [287,-10], 4, 5));
  chains.push(new ChainLink([297,55], [387,80], 5, 3));
  chains.push(new ChainLink([469,0], [387,80], 7, 6));
//line2
  chains.push(new ChainLink([101,232], [89,147], 4, 5));
  chains.push(new ChainLink([101,232], [40,289], 4, 6));
  chains.push(new ChainLink([-11,277], [40,289], 4, 6));
  chains.push(new ChainLink([101,232], [189,263], 5, 3));
  chains.push(new ChainLink([256,195], [189,263], 4, 5));
  chains.push(new ChainLink([256,195], [230,113], 3, 6));
  chains.push(new ChainLink([256,195], [345,220], 4, 4));
  chains.push(new ChainLink([405,155], [345,220], 5, 5));
  chains.push(new ChainLink([405,155], [387,80], 3, 9));
  chains.push(new ChainLink([405,155], [500,190], 4, 4));
//line 3
chains.push(new ChainLink([63,375], [40,289], 3, 5));
chains.push(new ChainLink([63,375], [0,435], 5, 2));
chains.push(new ChainLink([0,490], [0,435], 1, 4));
chains.push(new ChainLink([63,375], [147,402], 4, 3));
chains.push(new ChainLink([207,338], [147,402], 4, 4));
chains.push(new ChainLink([207,338], [189,263], 3, 5));
chains.push(new ChainLink([207,338], [290,362], 4, 6));
chains.push(new ChainLink([360,305], [290,362], 5, 2));
chains.push(new ChainLink([360,305], [345,220], 3, 4));
chains.push(new ChainLink([360,305], [435,330], 4, 6));
chains.push(new ChainLink([498,283], [435,330], 2, 6));
//line4
chains.push(new ChainLink([170,495], [147,402], 4, 5));
chains.push(new ChainLink([308,444], [290,362], 4, 2));
chains.push(new ChainLink([308,444], [253,510], 4, 4));
chains.push(new ChainLink([170,495], [253,510], 4, 4));
chains.push(new ChainLink([308,444], [399,475], 4, 2));
chains.push(new ChainLink([450,430], [399,475], 3, 3));
chains.push(new ChainLink([450,430], [435,330], 4, 2));
chains.push(new ChainLink([450,430], [513,440], 4, 2));
chains.push(new ChainLink([405,510], [399,475], 3, 3));
}
//Circle Part
//Circle Part
//Circle Part
class BasicCircle {
  constructor(x, y, colorFlag = 0, outerType = '') {
    this.x = x;
    this.y = y;
    this.outerRadius = 70;
    this.innerRadius = 35;
    this.colorFlag = colorFlag; // 0 = green, 1 = red
    this.outerType = outerType; // '' | 'w' | 'y'
  }

  display() {
    noStroke();

    // Outer circle (based on outerType)
    if (this.outerType === 'w') {
      fill('#ffffff'); // white
    } else if (this.outerType === 'y') {
      fill('#FEA80F'); // yellow
    } else {
      fill('#FEA80F'); // default khaki
    }
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

//Chain Part
//Chain Part
//Chain Part
//Chain Part
class ChainLink {
  constructor(p1, p2, steps = 6, thickness = 5) {
    this.p1 = createVector(...p1);
    this.p2 = createVector(...p2);
    this.steps = steps;
    this.thickness = thickness;
  }

  display() {
    let dir = p5.Vector.sub(this.p2, this.p1);
    let totalDist = dir.mag();
    let segmentLength = totalDist / this.steps;
    let ellipseWidth = segmentLength; // 改为满宽防止间隙

    for (let i = 0; i < this.steps; i++) {
      let t = (i + 0.5) / this.steps;
      let pos = p5.Vector.lerp(this.p1, this.p2, t);
      push();
      translate(pos.x, pos.y);
      rotate(dir.heading());
      stroke('#D26728');
      strokeWeight(1.5);
      fill(random(255), random(255), random(255));
      ellipse(0, 0, ellipseWidth, this.thickness);
      pop();
    }

    this.drawAnchorDot(this.p1);
    this.drawAnchorDot(this.p2);
  }

  drawAnchorDot(p) {
    noStroke();
    fill('#DE6E2C');
    circle(p.x, p.y, 15);
    stroke(0);
    strokeWeight(2);
    fill(255);
    circle(p.x, p.y, 10);
  }
}

