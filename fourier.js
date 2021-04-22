const w = window.innerWidth;
const h = window.innerHeight;
const cx = w/2;
const cy = h/2;
const maxR = cx > cy ? cy - 100 : cx - 100;
let wheels = [];
let startPoint, currentPoint, lastPoint
let radii;

let canvas;

let hue = Math.round(Math.random() * 1000);
let saturation = Math.round(Math.random() * 100);

let startTime = 0;
let elapsedTime = 0;
let tickNum = 0;
let tickRadius;

let daysDrawn = false;
let clockDrawn = false;
let timeDrawn = false;
let titleTyped = false;

let pictureCount = 0;
let maxPictures = 50;

let hour, minute;

function setup() {
    frameRate(60);
    strokeCap(PROJECT);
    colorMode(HSB, 1000, 100, 100, 100);
    radii = [random(maxR/4,maxR/2), random(maxR/4,maxR/2)];
    tickRadius = radii[0] + radii[1] + (0.2 * (radii[0] + radii[1]));
    currentPont = createVector();
    lastPoint = createVector();
    canvas = createCanvas(w, h);
    pixelDensity(4);
    background(0);
    buildWheels();
    startPoint = lastPoint = currentPoint = getPoint();
    initTime();
}

function initTime(){
    startTime = Math.floor(Date.now()/1000);
}

function saveCopy(){
    const t = Math.floor(Date.now()/1000);
    let dt = t - startTime;
    if(dt > elapsedTime){
        elapsedTime = dt;
        if(dt % 30 == 0) saveImage();
    }
}

function drawDays(){
    if(daysDrawn) return;

    daysDrawn = true;

    let date1 = new Date("01/01/2021");
    let date2 = new Date();
      
    // To calculate the time difference of two dates
    let Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));


    const inc = 2*PI/365;
    push();
    for(let i = 0; i < 365; i++){
        rotate(inc);
        //i < Difference_In_Days ? strokeWeight(3) : strokeWeight(1);

        let ptY = -(tickRadius );
        i < Difference_In_Days ? stroke(hue,saturation, 100, 70) : stroke(hue,saturation, 100, 40);

        const dist_to_end = Difference_In_Days - i;
        let ptWt = 10 - dist_to_end;
        if(ptWt < 1 || i > Difference_In_Days) ptWt = 1;
        //strokeWeight(ptWt);
        //stroke(hue,saturation, 100, 40);
        if(ptWt > 1){
            noStroke();
            fill(hue, saturation, 100, 40)
            circle(0, ptY, ptWt)
        } 
        point(0, ptY);
    }
    pop();
}

function drawClock(){
    if(clockDrawn) return;

    clockDrawn = true;
    const inc = 2*PI/60;
    const ypos = tickRadius + 40;
    push();
    for(let i = 0; i < 60; i++){
        let tickLength = i % 5 == 0 ? 7.5 : 2.5;
        strokeWeight(1);
        stroke(hue,saturation, 100, 40);
        line(0, -ypos, 0, -(ypos + tickLength));
        rotate(inc);
    }
    pop();
}

function drawTime(){
    if(timeDrawn) return;

    timeDrawn = true;
    const d = new Date();
    hour = d.getHours();
    minute = d.getMinutes();
    push()
    let ang = 2*PI/12 * hour;
    rotate(ang);
    let ypos = tickRadius + 75;
    noFill();
    strokeWeight(4);
    stroke(hue,saturation, 100, 40);
    circle(0, -ypos, 25);
    pop()

    push()
    noFill();
    strokeWeight(2);
    stroke(hue,saturation, 100, 40);
    ang = 2*PI/60 * minute;
    rotate(ang);
    ypos -= 10;
    circle(0, -ypos, 10);
    pop()
}

function buildWheels(){
    const num = radii.length;
    let factor = Math.round(random(1,10))
    for(let i = 0; i < num; i++){
        const wheel = new Wheel(radii[i], random(-PI/15, PI/15));
        wheel.init();
        wheels.push(wheel);
    }
}

function draw() {
    translate(cx, cy);
    drawDays();
    drawClock();
    drawTime();
    typeTitle();
    
    currentPoint = getPoint();
    const dist = getDistance(currentPoint);
    const alph = map(dist, 0, (radii[0] + radii[1]), 25, 5)
    //const alph = ((radii[0] + radii[1]) - dist)/(radii[0] + radii[1]);
    //const alph = dist/radii[0];

    strokeWeight(1);
    stroke(hue,saturation, 100, alph)
    line(lastPoint.x, lastPoint.y, currentPoint.x, currentPoint.y);
    lastPoint = currentPoint;
    saveCopy();

    if(pictureCount >= maxPictures){
        noLoop();
        console.log('done')
    } 
}

function getPoint(){
    let pos = createVector();
    for(let wheel of wheels){
        pos.add(wheel.update());
    }

    return pos;
}

function getDistance(pt){
    return Math.sqrt(pt.x * pt.x + pt.y * pt.y);
}

// function mouseClicked() {
//     saveImage();
// }

function saveImage() {
    pictureCount++
    saveCanvas(canvas, `${getTitleString()}`, 'png');
}

function getTitleString() {
    const d = new Date();
    const y = d.getFullYear();
    const m = d.getMonth();
    const dt = d.getDate();
    const h = d.getHours();
    const min = d.getMinutes();
    const s = d.getSeconds()
    return  `fourier_${m}.${dt}.${y}.${h}.${min}.${s}`;
}

function typeTitle() {
    if(titleTyped) return;

    titleTyped = true;
    fill(hue,saturation, 100, 50)
    rectMode(CENTER);
    textSize(12);
    textAlign(CENTER);
    text(`Z U U B A  D I G I T A L`, 0, cy - 40);
    fill(hue,saturation, 100, 30)
    textSize(11);
    text(`${new Date().getFullYear()}`, 0, cy- 25);
}
