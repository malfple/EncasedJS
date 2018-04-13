// template for other enms out there

function Enm(x, y){
	this.x = x;
	this.y = y;

	this.angle = drand(0, 360); // angle as in direction
	this.spin = drand(0, 360); // angle as in rotated sprite
	this.dead = false;
}

Enm.prototype.runCycle = function(delta){
	//
}

Enm.prototype.render = function(ctx, offsetx, offsety){
	//
}

Enm.prototype.handleCollision = function(ship, Bullets){
	//
}

Enm.prototype.isDead = function(){
	return true;
}