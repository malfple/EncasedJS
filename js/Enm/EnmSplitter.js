function EnmSplitter(x, y, level){
	Enm.call(this, x, y);

	// higher level splits to lower level
	this.level = level;
}

EnmSplitter.prototype = Object.create(Enm.prototype);
EnmSplitter.prototype.constructor = EnmSplitter;

EnmSplitter.SPLIT_COUNT = 3;
EnmSplitter.SPEED = 0.25;
EnmSplitter.SPIN_SPEED = 0.1;

EnmSplitter.sprite = new GlowStruct();

EnmSplitter.sprite.addLine(-10, -10, -10, 10);
EnmSplitter.sprite.addLine(-10, 10, 10, 10);
EnmSplitter.sprite.addLine(10, 10, 10, -10);
EnmSplitter.sprite.addLine(10, -10, -10, -10);

EnmSplitter.sprite.addLine(-10, -10, 10, 10);

EnmSplitter.prototype.runCycle = function(delta){
	EnmSplitter.sprite.setStretch(this.level);
	this.x += Math.sin(this.angle / 180 * Math.PI) * EnmSplitter.SPEED * delta;
    this.y -= Math.cos(this.angle / 180 * Math.PI) * EnmSplitter.SPEED * delta;
    this.spin += EnmSplitter.SPIN_SPEED * delta;
    while(this.spin > 360)this.spin -= 360;

    //bounce
    var radius = EnmSplitter.sprite.getRadius();
    if(this.x - radius < 0 || this.x + radius > CURRENT_ARENA_WIDTH)this.angle = 360-this.angle;
    if(this.y - radius < 0 || this.y + radius > CURRENT_ARENA_HEIGHT)this.angle = 540-this.angle;
    if(this.angle > 360)this.angle -= 360;

    if(this.x - radius < 0)this.x = -this.x + 2*radius;
    if(this.x + radius > CURRENT_ARENA_WIDTH)this.x = 2*CURRENT_ARENA_WIDTH - this.x - 2*radius;
    if(this.y - radius < 0)this.y = -this.y + 2*radius;
    if(this.y + radius > CURRENT_ARENA_HEIGHT)this.y = 2*CURRENT_ARENA_HEIGHT - this.y - 2*radius;
}

EnmSplitter.prototype.render = function(ctx, offsetx, offsety){
	EnmSplitter.sprite.setStretch(this.level);
	EnmSplitter.sprite.render(ctx, this.x - offsetx, this.y - offsety, this.spin);
}

EnmSplitter.prototype.handleCollision = function(ship, Bullets){
	EnmSplitter.sprite.setStretch(this.level);

	//only check collision if not yet dead
    if(this.dead)return;

    var radius = EnmSplitter.sprite.getRadius();

    //bullet collision
    if(Bullets.checkCollision(this.x, this.y, radius + 10, 1) == 0){
    	this.dead = true;
    }

    if(this.dead)return;

    //ship collision
    if(ship.getShieldCount() < 0)return;
    var dist = radius + SpaceShip.sprite.getRadius();
    if(Math.sqrt((ship.x - this.x)*(ship.x - this.x) + (ship.y - this.y)*(ship.y - this.y)) <= dist){
        this.dead = true;
        ship.hitt();
        ship.defenseMechanism(Bullets);
    }
}

EnmSplitter.prototype.explode = function(){
    return new Explosion(this.x, this.y, 2);
}
EnmSplitter.prototype.spawn = function(Enms){
    if(this.level == 1)return;
    for(var i=0; i<EnmSplitter.SPLIT_COUNT; i++){
        Enms.add(new EnmSplitter(this.x, this.y, this.level-1));
    }
}

EnmSplitter.prototype.isDead = function(){
	return this.dead;
}