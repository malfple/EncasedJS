Explosions = {};

Explosions.ex = [];

Explosions.clear = function(){
	Explosions.ex = [];
}

Explosions.runCycle = function(delta){
	var tmp = Explosions.ex;
	for(var i=0; i<tmp.length; i++){
		tmp[i].runCycle(delta);
	}
	Explosions.ex = [];
	for(var i=0; i<tmp.length; i++){
		if(!tmp[i].isDead()){
			Explosions.ex.push(tmp[i]);
		}
	}
}

Explosions.render = function(ctx, offsetx, offsety){
	for(var i=0; i<Explosions.ex.length; i++){
		Explosions.ex[i].render(ctx, offsetx, offsety);
	}
}


Explosions.createRandomExplosions = function(){
	var chance = irand(1, 20);

	if(chance == 1 || Explosions.ex.length == 0){
		Explosions.ex.push(new Explosion(irand(0, CURRENT_ARENA_WIDTH), irand(0, CURRENT_ARENA_HEIGHT), 1));
	}
}