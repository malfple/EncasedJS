var ScreenShake = [];

ScreenShake.range = 0;
ScreenShake.RANGE_SHRINK_SPEED = 0.1;
ScreenShake.INITIAL_RANGE = 25;

ScreenShake.reset = function(){
    this.range = 0;
}

ScreenShake.shake = function(){
    this.range = this.INITIAL_RANGE;
}

ScreenShake.applyShake = function(){
    return drand(-this.range, this.range);
}

ScreenShake.runCycle = function(delta){
    this.range = Math.max(0, this.range - this.RANGE_SHRINK_SPEED * delta);
}