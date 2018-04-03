function Bullet(x, y, angle){
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.dead = false;
}

Bullet.SPEED = 0.9;
Bullet.sprite = new GlowStruct();

Bullet.sprite.addLine(0, 0, 4, 20);
Bullet.sprite.addLine(0, 0, -4, 20);
Bullet.sprite.setColor(255, 255, 130);

Bullet.prototype.runCycle = function(delta) {
    this.x += Math.sin(this.angle / 180 * Math.PI) * Bullet.SPEED * delta;
    this.y -= Math.cos(this.angle / 180 * Math.PI) * Bullet.SPEED * delta;
};

Bullet.prototype.render = function(ctx, offsetx, offsety){
	Bullet.sprite.render(ctx, this.x - offsetx, this.y - offsety, this.angle)
}

Bullet.prototype.hitt = function(){
	this.dead = true;
}

Bullet.prototype.explode = function(){
	return new Explosion(this.x, this.y, 0);
}

Bullet.prototype.isDead = function(){
    if(this.x < 0 || this.x > CURRENT_ARENA_WIDTH || this.y < 0 || this.y > CURRENT_ARENA_HEIGHT)return true;
    return this.dead;
}