/*
	There will only be a single spaceship in the game
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

	this.isFiring = false;
	this.reloadCounter = 0; // when reaches 1, ready to shoot

	this.shieldCount = SpaceShip.INITIAL_SHIELD_COUNT;
}

SpaceShip.WIDTH = 40;
SpaceShip.HEIGHT = 40;

SpaceShip.MAXSPEED = 0.5;
SpaceShip.ACCELERATION = 0.01;
SpaceShip.DECELERATION = 0.003;

SpaceShip.FIRE_RATE = 0.01; // bullets / tick
SpaceShip.SPREAD_ANGLE = 10;
SpaceShip.SPREAD_COUNT = 3;

SpaceShip.INITIAL_SHIELD_COUNT = 5;

SpaceShip.sprite = new GlowStruct();

// SpaceShip.sprite.addLine(-SpaceShip.WIDTH/2, -SpaceShip.HEIGHT/2, -SpaceShip.WIDTH/2, SpaceShip.HEIGHT/2);
// SpaceShip.sprite.addLine(-SpaceShip.WIDTH/2, SpaceShip.HEIGHT/2, SpaceShip.WIDTH/2, SpaceShip.HEIGHT/2);
// SpaceShip.sprite.addLine(SpaceShip.WIDTH/2, SpaceShip.HEIGHT/2, SpaceShip.WIDTH/2, -SpaceShip.HEIGHT/2);
// SpaceShip.sprite.addLine(SpaceShip.WIDTH/2, -SpaceShip.HEIGHT/2, -SpaceShip.WIDTH/2, -SpaceShip.HEIGHT/2);

SpaceShip.sprite.addLine(-5, 5, 0, -5);
SpaceShip.sprite.addLine(5, 5, 0, -5);
SpaceShip.sprite.addLine(-5, 5, 5, 5);

SpaceShip.sprite.addLine(0, -20, -12, 5);
SpaceShip.sprite.addLine(0, -20, 12, 5);
SpaceShip.sprite.addLine(0, 20, -12, 5);
SpaceShip.sprite.addLine(0, 20, 12, 5);

SpaceShip.sprite.addLine(-12, -14, -20, 5);
SpaceShip.sprite.addLine(12, -14, 20, 5);
SpaceShip.sprite.addLine(-8, 20, -20, 5);
SpaceShip.sprite.addLine(8, 20, 20, 5);

SpaceShip.sprite.setColor(191, 255, 255);

SpaceShip.prototype.handleMouseEvent = function(mousedown){
	if(mousedown){
		this.isFiring = true;
	}else{
		this.isFiring = false;
	}
}

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

SpaceShip.prototype.runCycle = function(delta){
	//actual moving
	this.x += this.vx * delta;
	this.y += this.vy * delta;

	//deceleration
	if(this.vx > 0)this.vx = Math.max(0, this.vx - SpaceShip.DECELERATION*delta);
	if(this.vx < 0)this.vx = Math.min(0, this.vx + SpaceShip.DECELERATION*delta);
	if(this.vy > 0)this.vy = Math.max(0, this.vy - SpaceShip.DECELERATION*delta);
	if(this.vy < 0)this.vy = Math.min(0, this.vy + SpaceShip.DECELERATION*delta);
	//acceleration
	this.vx += this.fx * SpaceShip.ACCELERATION * delta;
	this.vy += this.fy * SpaceShip.ACCELERATION * delta;
	//update angle only if key was pressed
	if(this.fx != 0 || this.fy != 0)this.angle = Math.atan2(this.vx, -this.vy) / Math.PI * 180;
	//capping speed
	var maxspeedx = Math.abs(Math.sin(this.angle / 180 * Math.PI) * SpaceShip.MAXSPEED);
	var maxspeedy = Math.abs(Math.cos(this.angle / 180 * Math.PI) * SpaceShip.MAXSPEED);
	if(this.vx > maxspeedx)this.vx = maxspeedx;
	if(this.vx < -maxspeedx)this.vx = -maxspeedx;
	if(this.vy > maxspeedy)this.vy = maxspeedy;
	if(this.vy < -maxspeedy)this.vy = -maxspeedy;

	// limit inside arena
	if(this.x < SpaceShip.WIDTH/2)this.x = SpaceShip.WIDTH/2;
	if(this.x > CURRENT_ARENA_WIDTH - SpaceShip.WIDTH/2)this.x = CURRENT_ARENA_WIDTH - SpaceShip.WIDTH/2;
	if(this.y < SpaceShip.HEIGHT/2)this.y = SpaceShip.HEIGHT/2;
	if(this.y > CURRENT_ARENA_HEIGHT - SpaceShip.HEIGHT/2)this.y = CURRENT_ARENA_HEIGHT - SpaceShip.HEIGHT/2;

	//reloading
	this.reloadCounter += SpaceShip.FIRE_RATE * delta;
	// reload limiter, if isFiring -> no need
	if(this.reloadCounter > 1 && !this.isFiring)this.reloadCounter = 1;
}

SpaceShip.prototype.shootCycle = function(Bullets, offsetx, offsety){
	if(!this.isFiring)return;
	if(this.reloadCounter < 1)return;
	this.reloadCounter -= 1;

	var mx = mouseX + offsetx;
	var my = mouseY + offsety;

	var bulletAngle = Math.atan2(mx - this.x, -my + this.y) / Math.PI * 180;
	for(var i = 0; i < SpaceShip.SPREAD_COUNT; i++){
        Bullets.add(new Bullet(this.x, this.y,
        	((i*2)+1 - SpaceShip.SPREAD_COUNT)*SpaceShip.SPREAD_ANGLE/2 + bulletAngle));
	}
}

SpaceShip.prototype.defenseMechanism = function(Bullets){
	var bulletCount = 360.001 / SpaceShip.SPREAD_ANGLE;
    for(var i = 0; i < bulletCount; i++){
        Bullets.add(new Bullet(this.x, this.y, SpaceShip.SPREAD_ANGLE*i));
    }
}

SpaceShip.prototype.hitt = function(){
	ScreenShake.shake();
	this.shieldCount--;
}
SpaceShip.prototype.getShieldCount = function(){
	return this.shieldCount;
}

SpaceShip.prototype.render = function(ctx, offsetx, offsety){
	SpaceShip.sprite.render(ctx, this.x - offsetx, this.y - offsety, this.angle)
}