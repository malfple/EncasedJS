// x,y -> pos, type defines the color/size of the explosion
function Explosion(x, y, type){
	//position limit
	if(x < 0)x = 0;
	if(x > CURRENT_ARENA_WIDTH)x = CURRENT_ARENA_WIDTH;
	if(y < 0)y = 0;
	if(y > CURRENT_ARENA_HEIGHT)y = CURRENT_ARENA_HEIGHT;

	//fragments
	this.fragments = [];
	for(var i=0; i<Explosion.FRAGMENT_COUNT[type]; i++){
		this.fragments.push(new Fragment(x, y, drand(0, 360),
			drand(Explosion.MIN_SPEED[type], Explosion.MAX_SPEED[type]),
			irand(Explosion.MIN_R[type], Explosion.MAX_R[type]),
			irand(Explosion.MIN_G[type], Explosion.MAX_G[type]),
			irand(Explosion.MIN_B[type], Explosion.MAX_B[type])));
	}
}

// Explosion types
// 0 -> bullet explosions
// 1 -> Main Menu Explosions
// 2 -> EnmSplitter Explosion
// 3 -> Gameover explosion
Explosion.FRAGMENT_COUNT	= [15,		400,	30,		400];
Explosion.MIN_SPEED			= [0.3,		0,		0.8,	0.5];
Explosion.MAX_SPEED 		= [0.7,		1.2,	1,		1.5];
Explosion.MIN_R 			= [255,		85,		255,	255];
Explosion.MAX_R				= [255,		204,	255,	255];
Explosion.MIN_G				= [255,		136,	255,	0];
Explosion.MAX_G				= [255,		204,	255,	85];
Explosion.MIN_B				= [102,		255,	255,	0];
Explosion.MAX_B				= [136,		255,	255,	85];

Explosion.prototype.runCycle = function(delta){
	var tmp = this.fragments;
	// run the cycles of each fragment
	for(var i=0; i<tmp.length; i++){
		tmp[i].runCycle(delta);
	}
	this.fragments = [];
	// remove dead fragments
	for(var i=0; i<tmp.length; i++){
		if(!tmp[i].isDead()){
			this.fragments.push(tmp[i]);
		}
	}
}

Explosion.prototype.render = function(ctx, offsetx, offsety){
	for(var i=0; i<this.fragments.length; i++){
		this.fragments[i].render(ctx, offsetx, offsety);
	}
}

Explosion.prototype.isDead = function(){
	return this.fragments.length == 0;
}