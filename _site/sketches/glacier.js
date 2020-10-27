var agents = [];
var maxAgentCount = 90;
var agentCount = 90;
var maxOpacity = 12;
var minOpacity = 0;
var redEffect = 10;
var backgroundShade = 255;
var ySpeedVariation = 3.5;
var baselineRedValue = 10;
var dotSize = 2;
var triSizeDivisor = 6.5;


function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-container');
    background(255);

    frameRate(30);
    agentCount = map(windowWidth,300,1920,20,maxAgentCount,true)
    for (var i = 0; i < agentCount; i++){
        agents[i] = new agent();
    }
    triSize = height/map(windowWidth,300,1920,triSizeDivisor+1,triSizeDivisor-1,true);
    stroke(255,5);
}

function draw() {
    // fill(backgroundShade);
    // rect(0,0,windowWidth,windowHeight);
    background(255);
    for(var i = 0; i < agentCount; i++){
        agents[i].update();
        // fill(agents[i].r,agents[i].g,agents[i].b);
        // agents[i].draw();
    }
    for(var i = 0; i < agentCount; i++){
        for(var j = 0; j < agentCount; j++){
            for(var k = i+1; k < agentCount; k++){
                if(agents[i].pos.dist(agents[j].pos) < triSize && agents[i].pos.dist(agents[k].pos) < triSize){
                    if(agents[i].pos.dist(createVector(mouseX,mouseY)) < height/8.2){
                        stroke(200,100,220,5);
                        fill(baselineRedValue,agents[i].g,agents[i].b,map(agents[i].pos.dist(agents[j].pos), 0,triSize,maxOpacity-50,minOpacity-50));
                    } else {
                        stroke(255,5);
                        fill(agents[i].r,agents[i].g,agents[i].b,map(agents[i].pos.dist(agents[j].pos), 0,triSize,maxOpacity,minOpacity));
                    }
                    triangle(agents[i].pos.x,agents[i].pos.y,agents[j].pos.x,agents[j].pos.y,agents[k].pos.x,agents[k].pos.y);

                }
            }
        }
    }

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setup();
}
function agent(){
    //random position
    this.pos = createVector(random(0,width),random(0,height));
    //random yVel
    this.vel = createVector(0,random(-1*ySpeedVariation,ySpeedVariation));
    //unique color
    this.r = baselineRedValue;
    this.g = random(100,155);
    this.b = random(150,220);
    //upper and lower boundary are here
    this.uB = (2.2*height/5)+random(-300,25);
    this.lB = (3.3*height/5)+random(-25,300);

    this.draw = function(){
        //draw circle at dot

        ellipse(this.pos.x, this.pos.y, dotSize,dotSize);
    }
    this.update = function(){
        //bounds
        if(this.pos.y  < this.uB){
            this.pos.y = this.lB;
        }
        if(this.pos.y > this.lB){
            this.pos.y = this.uB;
        }
        if(this.pos.x > width){
            this.pos.x = 0;
        }
        if(this.pos.x < 0){
            this.pos.x = width;
        }

        this.pos = this.pos.add(this.vel);
    }

}
