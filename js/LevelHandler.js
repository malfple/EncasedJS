var LevelHandler = [];

LevelHandler.WAVE_TEXT_FADE_TICKS = 1000;
LevelHandler.WAVE_TEXT_PAUSE_TICKS = 1000;

/*

Attribute description

currentLevel = wave
stage => the stage of a wave
renderTime => the time already used for rendering the text

*/

LevelHandler.newGame = function(){
	this.currentLevel = 1;
	this.stage = 1;
}

LevelHandler.renderWaveText = function(ctx){ // returns true if already done rendering
	if(this.renderTime > 2*LevelHandler.WAVE_TEXT_FADE_TICKS + LevelHandler.WAVE_TEXT_PAUSE_TICKS)return true;

	if(this.renderTime < LevelHandler.WAVE_TEXT_FADE_TICKS){ // fade in
		ctx.globalAlpha = this.renderTime / LevelHandler.WAVE_TEXT_FADE_TICKS;
	}else if(this.renderTime < LevelHandler.WAVE_TEXT_FADE_TICKS + LevelHandler.WAVE_TEXT_PAUSE_TICKS){ // pause
		// do nothing.. alpha already 1
	}else{ // fade out
		ctx.globalAlpha =
			(2*LevelHandler.WAVE_TEXT_FADE_TICKS + LevelHandler.WAVE_TEXT_PAUSE_TICKS - this.renderTime)
			/ LevelHandler.WAVE_TEXT_FADE_TICKS;
	}
	drawText(this.waveText, 96, SCREEN_WIDTH/2, 100, 1); // function from mainLoop.js
	ctx.globalAlpha = 1;
}

LevelHandler.spawnEnm = function(){
	Enms.add(new EnmSplitter(CURRENT_ARENA_WIDTH/2, CURRENT_ARENA_HEIGHT/2, this.currentLevel+2));
}

LevelHandler.waveDone = function(){
	if(Enms.getSize() == 0)return true;
	return false;
}

LevelHandler.runCycle = function(ctx, delta){
	if(this.stage == 1){ // setup
		this.stage = 2;
		this.waveText = "wave " + this.currentLevel;
		this.renderTime = 0;
	}else if(this.stage == 2){ // render wave text
		this.renderTime += delta;
		if(this.renderWaveText(ctx)){
			this.stage = 3;
			this.spawnEnm();
		}
	}else if(this.stage == 3){ // spawn enemies and wait
		if(this.waveDone()){
			this.stage = 2;
			this.renderTime = 0;
			this.currentLevel++; // next wave
			this.waveText = "wave " + this.currentLevel; // load new text
		}
	}
}