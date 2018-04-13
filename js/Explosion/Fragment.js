// x,y, angle -> positions, s -> speed, rgb -> color
function Fragment(x, y, angle, s, r, g, b){
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.speed = s; // speed also indicates lifetime, 0 -> dead
	this.r = r;
	this.g = g;
	this.b = b;
}

Fragment.DECELERATION = 0.0015;
Fragment.SPEED_TO_LENGTH_MULTIPLIER = 40;

Fragment.prototype.runCycle = function(delta){
	var angleradian = this.angle / 180 * Math.PI;
	// move;
	this.x += Math.sin(angleradian) * this.speed * delta;
	this.y -= Math.cos(angleradian) * this.speed * delta;

	// reflections on walls
    if(this.x < 0 || this.x > CURRENT_ARENA_WIDTH)this.angle = 360-this.angle;
    if(this.y < 0 || this.y > CURRENT_ARENA_HEIGHT)this.angle = 540-this.angle;
    if(this.angle > 360)this.angle -= 360;
    if(this.x < 0)this.x = -this.x;
    if(this.x > CURRENT_ARENA_WIDTH)this.x = 2*CURRENT_ARENA_WIDTH - this.x;
    if(this.y < 0)this.y = -this.y;
    if(this.y > CURRENT_ARENA_HEIGHT)this.y = 2*CURRENT_ARENA_HEIGHT - this.y;

	//deceleration
	if(this.speed > 0)this.speed = Math.max(0, this.speed - Fragment.DECELERATION*delta);
}

Fragment.prototype.render = function(ctx, offsetx, offsety){
	var angleradian = this.angle / 180 * Math.PI;
	//length of fragment is based on speed
    //dx and dy is the difference in x and y axis from the original coordinate to the head
    var dx = Math.sin(angleradian) * this.speed * Fragment.SPEED_TO_LENGTH_MULTIPLIER;
    var dy = Math.cos(angleradian) * this.speed * Fragment.SPEED_TO_LENGTH_MULTIPLIER;

    //to prevent rendering head outside border -> limit dx and dy
    if(this.x + dx > CURRENT_ARENA_WIDTH){
        var mul = (CURRENT_ARENA_WIDTH - this.x) / dx;
        dx *= mul;
        dy *= mul;
    }
    if(this.x + dx < 0){
        var mul = this.x / (-dx);
        dx *= mul;
        dy *= mul;
    }
    if(this.y - dy > CURRENT_ARENA_HEIGHT){
        var mul = (CURRENT_ARENA_HEIGHT - this.y) / (-dy);
        dx *= mul;
        dy *= mul;
    }
    if(this.y - dy < 0){
        var mul = this.y / dy;
        dx *= mul;
        dy *= mul;
    }

    // head coordinate
    var hx = this.x + dx;
    var hy = this.y - dy;

    ctx.beginPath();
    ctx.strokeStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    ctx.moveTo(this.x - offsetx, this.y - offsety);
    ctx.lineTo(hx - offsetx, hy - offsety);
    ctx.stroke();
    ctx.closePath();
}

Fragment.prototype.isDead = function(){
	return this.speed <= 0;
}