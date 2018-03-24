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
}

TextButton.prototype.render = function(){
	drawText(this.text, this.height, this.x, this.y, 1);

	if(this.mouseIn){
		ctx.strokeStyle = "#FF0000";
		ctx.beginPath();
		ctx.moveTo(0, this.y - this.height/2);
		ctx.lineTo(SCREEN_WIDTH, this.y - this.height/2);
		ctx.moveTo(0, this.y + this.height/2);
		ctx.lineTo(SCREEN_WIDTH, this.y + this.height/2);
		ctx.stroke();
	}
};

TextButton.prototype.runCycle = function(){
	if(mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2){
		this.mouseIn = true;
	}else{
		this.mouseIn = false;
		this.mouseDown = false;
	}
};