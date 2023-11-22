var b;
var x, y;

// Real dimensions of the canvas
var xmin, xmax, ymin, ymax;
// Step size to increment along vectors
var h;

// Ball list
var balls;
// Number of balls to maintain.
var N;

// Slider to control animation speed parameter h
var hSlider, controlDiv;
var inputFx, inputFy;

function setup() {
 // Video settings
 //frameRate(10);
 pixelDensity(1);

 // Display canvas settings
 var canvas;
 canvas = createCanvas(500,500);
 canvas.parent('display');


 // Real dimensions of the canvas
 xmin = -2; xmax = 2; ymin = -2; ymax = 2;

 // Step size to increment along vectors
 h = (xmax-xmin)/1000;
 // Controls section
 inputFx = createInput('x');
 inputFx.size(100);
 inputFy = createInput('y');
 inputFy.size(100);
 inputFx.parent('Fx_input');
 inputFx.input(resetFx);
 inputFy.parent('Fy_input');
 inputFy.input(resetFy);
 // Build update button, click to update to new field
 let changeF = createButton('Update Field');
 changeF.parent('submit');
 changeF.mousePressed(resetF);
 // Build animation speed slider
 hSlider = createSlider(-2*h,2*h,h,0);
 hSlider.parent('slider');



 // Allocate a ball list array
 balls = [];
 // Number of balls to maintain.
 N = 40;
 // Populate with a collection of randomly generated balls.
 /*
 for(var i=0; i<N; i++) {
  noStroke();
  b = new Ball(2,color(255,255,255),random(width),random(height));
  balls.push(b);
 }
 */
 
 // Populate with a uniformly distributed collection of balls
 var Nx = float(width)/N;
 var Ny = float(height)/N;
 for(var i=0; i<N; i++) {
  for(var j=0; j<N; j++) {
   b = new Ball(2,color(255,255,255),i*Nx,j*Ny);
   balls.push(b);
  }
 }
 
}

function draw() {
 var x, y, vx, vy;
 fill(0,0,0,10);
 rect(0,0,width,height);

 // Update speed
 h = hSlider.value();

 // Display the collection of balls.
 for(var i=0; i<balls.length; i++) {
  balls[i].display();
 }

 // Update position of the balls according to the vector field
 for(var i=0; i<balls.length; i++) {
  b = balls[i];
  x = map(b.getX(),0,width-1,xmin,xmax);
  y = map(b.getY(),height-1,0,ymin,ymax);
  x += h*Fx(x,y,Fx_code);
  y += h*Fy(x,y,Fy_code);
  b.setX(map(x,xmin,xmax,0,width-1));
  b.setY(map(y,ymin,ymax,height-1,0));
  b.advanceAge();
 }

 // Refresh old balls
 for(var i=0; i<balls.length; i++) {
  b = balls[i];
  if (b.expired()) {
   b.reset();
  }
 }

 // Overlay some boundaries.
 // Exercise 16.5.1, <x*y, -x*y>, D=[0,1]x[0,1]
 /*
    stroke(255,0,0,50);
    strokeWeight(2);
    noFill();
    rect(width/2,height/4,width/4,height/4);
    strokeWeight(1);
    */

 // Exercise 16.5.4, <sin(x)*cos(y), cos(x)*sin(y)>, D=triangle (0,0),
 // (pi/2, 0), (pi/2,pi/2)
 /*
    stroke(255,0,0,50);
    strokeWeight(2);
    noFill();
    triangle(
    width/2,height/2,
    map(PI/2,xmin,xmax,0,width-1),height/2,
    map(PI/2,xmin,xmax,0,width-1), map(PI/2,ymax,ymin,0,height-1)
    );
    strokeWeight(1);
    */

 // Circle at the origin
    stroke(255,0,0,50);
    strokeWeight(2);
    noFill();
    ellipse(width/2,height/2,width/2,width/2);
    strokeWeight(1);

}




