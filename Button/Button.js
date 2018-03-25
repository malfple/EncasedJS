// str,fontsize = text, ctx = canvas.contex
function TextButton(str, fontsize, x, y, ctx){
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

TextButton.prototype.render = function(ctx){
	drawText(this.text, this.height, this.x, this.y, 1);

	if(this.mouseIn){ // draw 2 horizontal lines when mouse inside button
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
		if(mousedown == 1){ // pressed inside button
			this.mouseDown = true;
			this.clicked = false;
		}else{ // released inside button
			if(this.mouseDown){ // only if already pressed previously
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
	if(mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2){ // if mouse inside button
		this.mouseIn = true;
	}else{ // if not
		this.mouseIn = false;
		this.mouseDown = false;
	}
};