// str,fontsize = text, ctx = canvas.contex
function TextButton(str, fontsize, x, y){
	this.x = x;
	this.y = y;
	this.text = str;

	ctx.font = fontsize + "px Sofachrome";
	this.width = ctx.measureText(str).width;
	this.height = fontsize;

	this.mouseIn = false;
	this.mouseDown = false;
	this.clicked = false;
}

TextButton.prototype.render = function(){
	drawText(this.text, this.height, this.x, this.y, 1);

	if(this.mouseIn){
		if(this.mouseDown)ctx.strokeStyle = "#FF0000";
		else ctx.strokeStyle = "#FFFFFF";
		ctx.beginPath();
		ctx.moveTo(0, this.y - this.height/2);
		ctx.lineTo(SCREEN_WIDTH, this.y - this.height/2);
		ctx.moveTo(0, this.y + this.height/2);
		ctx.lineTo(SCREEN_WIDTH, this.y + this.height/2);
		ctx.stroke();
	}
};

TextButton.prototype.handleMouseDown = function(mousedown){
	if(this.mouseIn){
		if(mousedown == 1){
			this.mouseDown = true;
			this.clicked = false;
		}else{
			if(this.mouseDown){
				this.mouseDown = false;
				this.clicked = true;
			}
		}
	}else{
		this.mouseDown = false;
		this.clicked = false;
	}
};

TextButton.prototype.getClick = function(){
	if(this.clicked){
		this.clicked = false;
		this.mouseDown = false;
		return true;
	}else return false;
};

TextButton.prototype.runCycle = function(){
	if(mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2){
		this.mouseIn = true;
	}else{
		this.mouseIn = false;
	}
};