//////////////////////////////////////////////////////////////////////
// Define the vector function components <Fx, Fy> here
//
//

var Fx_str = "x";
var Fy_str = "y";

var Fx_node = math.parse(Fx_str);
var Fy_node = math.parse(Fy_str);
var Fx_code = Fx_node.compile();
var Fy_code = Fy_node.compile();


var Fx = function(_x,_y,Fx_code) {
 return Fx_code.evaluate({x:_x, y:_y}); 
};

var Fy = function(_x,_y,Fy_code) {
 return Fy_code.evaluate({x:_x, y:_y}); 
};

function resetFx() {
 Fx_str = this.value();
};

function resetFy() {
 Fy_str = this.value();
};

function resetF() {
 Fx_node = math.parse(Fx_str);
 Fy_node = math.parse(Fy_str);
 Fx_code = Fx_node.compile();
 Fy_code = Fy_node.compile();
};

//////////////////////////////////////////////////////////////////////
// A class that represents a ball on a circle of radius _R, color _c,
// center (_x,_y)
var Ball = function(_R, _c, _x, _y) {

  // Input parameters
  this.R = _R;
  this.color = _c;
  this.x = _x;
  this.y = _y;
  this.origX = _x;
  this.origY = _y;
  this.lifeSpan = 200;
  this.age = random(this.lifeSpan);
};

// Method to increment age counter
Ball.prototype.advanceAge = function() {
 this.age += 1;
};

// Method to see if expired
Ball.prototype.expired = function() {
 return this.age>this.lifeSpan;
};

// Method to get x coord
Ball.prototype.getX = function() {
 return this.x;
};
// Method to get y coord
Ball.prototype.getY = function() {
 return this.y;
};

// Method to set x coord
Ball.prototype.setX = function(_x) {
 this.x=_x;
};

// Method to set y coord
Ball.prototype.setY = function(_y) {
 this.y=_y;
};

// Method to reset age and original position
Ball.prototype.reset = function() {
 this.x = this.origX;
 this.y = this.origY;
 this.age = 0;
};


// Method to display
Ball.prototype.display = function() {
  fill(this.color);
  noStroke();
  ellipse(this.x,this.y,this.R,this.R);
};
