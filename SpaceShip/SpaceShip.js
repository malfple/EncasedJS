/*
	There will only be a single spaceship in the game

	The spaceship controls the camera
*/

function SpaceShip(x, y){
	// current position
	this.x = x;
	this.y = y;
	// move directions
	this.fx = 0;
	this.fy = 0;

	// speed
	this.vx = 0;
	this.vy = 0;
	// angle
	this.angle = 0;
}

SpaceShip.WIDTH = 40;
SpaceShip.HEIGHT = 40;

SpaceShip.MAXSPEED = 0.5;
SpaceShip.ACCELERATION = 0.01;
SpaceShip.DECELERATION = 0.003;
SpaceShip.sprite = new GlowStruct();

SpaceShip.sprite.addLine(-SpaceShip.WIDTH/2, -SpaceShip.HEIGHT/2, -SpaceShip.WIDTH/2, SpaceShip.HEIGHT/2);
SpaceShip.sprite.addLine(-SpaceShip.WIDTH/2, SpaceShip.HEIGHT/2, SpaceShip.WIDTH/2, SpaceShip.HEIGHT/2);
SpaceShip.sprite.addLine(SpaceShip.WIDTH/2, SpaceShip.HEIGHT/2, SpaceShip.WIDTH/2, -SpaceShip.HEIGHT/2);
SpaceShip.sprite.addLine(SpaceShip.WIDTH/2, -SpaceShip.HEIGHT/2, -SpaceShip.WIDTH/2, -SpaceShip.HEIGHT/2);

SpaceShip.sprite.addLine(-10, 0, 0, -20);
SpaceShip.sprite.addLine(10, 0, 0, -20);

SpaceShip.sprite.setColor(191, 255, 255);

SpaceShip.prototype.handleKeyboardInput = function(keyboardState){
	this.fx = 0;
	this.fy = 0;

	if(keyboardState[87]){
		this.fy--;
	}
	if(keyboardState[83]){
		this.fy++;
	}
	if(keyboardState[68]){
		this.fx++;
	}
	if(keyboardState[65]){
		this.fx--;
	}
}

SpaceShip.prototype.runCycle = function(timeFrame){
	//actual moving
	this.x += this.vx * timeFrame;
	this.y += this.vy * timeFrame;

	//deceleration
	if(this.vx > 0)this.vx = Math.max(0, this.vx - SpaceShip.DECELERATION*timeFrame);
	if(this.vx < 0)this.vx = Math.min(0, this.vx + SpaceShip.DECELERATION*timeFrame);
	if(this.vy > 0)this.vy = Math.max(0, this.vy - SpaceShip.DECELERATION*timeFrame);
	if(this.vy < 0)this.vy = Math.min(0, this.vy + SpaceShip.DECELERATION*timeFrame);
	//acceleration
	this.vx += this.fx * SpaceShip.ACCELERATION * timeFrame;
	this.vy += this.fy * SpaceShip.ACCELERATION * timeFrame;
	//update angle only if key was pressed
	if(this.fx != 0 || this.fy != 0)this.angle = Math.atan2(this.vx, -this.vy) / Math.PI * 180;
	//capping speed
	var maxspeedx = Math.abs(Math.sin(this.angle / 180 * Math.PI) * SpaceShip.MAXSPEED);
	var maxspeedy = Math.abs(Math.cos(this.angle / 180 * Math.PI) * SpaceShip.MAXSPEED);
	if(this.vx > maxspeedx)this.vx = maxspeedx;
	if(this.vx < -maxspeedx)this.vx = -maxspeedx;
	if(this.vy > maxspeedy)this.vy = maxspeedy;
	if(this.vy < -maxspeedy)this.vy = -maxspeedy;

	console.log(this.vx + " " + this.vy);
}

SpaceShip.prototype.render = function(ctx, offsetx, offsety){
	SpaceShip.sprite.render(ctx, this.x - offsetx, this.y - offsety, this.angle)
}