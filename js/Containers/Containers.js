function Containers(){
	this.arr = [];
}

Containers.prototype.clear = function(){
	this.arr = [];
}

Containers.prototype.add = function(contained){
	this.arr.push(contained);
}

Containers.prototype.getSize = function(){
	return this.arr.length;
}

Containers.prototype.deathAction = function(theDead){
	// empty function
}

Containers.prototype.runCycle = function(delta){
	var tmp = this.arr;
	for(var i=0; i<tmp.length; i++){
		tmp[i].runCycle(delta);
	}
	this.arr = [];
	for(var i=0; i<tmp.length; i++){
		if(!tmp[i].isDead()){
			this.arr.push(tmp[i]);
		}else{
			this.deathAction(tmp[i]);
		}
	}
}

Containers.prototype.render = function(ctx, offsetx, offsety){
	for(var i=0; i<this.arr.length; i++){
		this.arr[i].render(ctx, offsetx, offsety);
	}
}

// =================================== Explosion =========================================
Explosions = new Containers();

Explosions.createRandomExplosions = function(){
	var chance = irand(1, 20);

	if(chance == 1 || this.arr.length == 0){
		this.arr.push(new Explosion(irand(0, CURRENT_ARENA_WIDTH), irand(0, CURRENT_ARENA_HEIGHT), 1));
	}
}

// =================================== Bullet =========================================
Bullets = new Containers();

Bullets.deathAction = function(theDead){
	Explosions.add(theDead.explode());
}

Bullets.checkCollision = function(x, y, radius, times){
	for(var i=0; i<this.arr.length; i++){
		if(times <= 0)break;
		var t = this.arr[i];
		if(t.isDead())continue;
        if(Math.sqrt((t.x - x)*(t.x - x) + (t.y - y)*(t.y - y)) <= radius){
        	times--;
        	t.hitt();
        }
	}
	return times;
}

// =================================== Enm =========================================

Enms = new Containers();

Enms.deathAction = function(theDead){
	Explosions.add(theDead.explode());
	theDead.spawn(this);
	score += theDead.getScore();
}

Enms.handleCollision = function(ship){
	for(var i=0; i<this.arr.length; i++){
		this.arr[i].handleCollision(ship, Bullets);
	}
}