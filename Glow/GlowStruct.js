// simple line object
function Line(a, b, c, d){
	this.x1 = a;
	this.y1 = b;
	this.x2 = c;
	this.y2 = d;
}

/*
	Glow Struct

	This will be the main sprite for almost all the entities in this game.
	It stores a list of lines, which is drawn simultaneously into a line drawing
	It also stores the color
*/
function GlowStruct(){
	this.lines = [];
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.radius = 1; // for collision checking
	this.stretch = 1;
}

GlowStruct.prototype.setColor = function(r, g, b){
	this.r = r;
	this.g = g;
	this.b = b;
}

GlowStruct.prototype.addLine = function(x1, y1, x2, y2){
	var midx = (x1+x2)/2;
	var midy = (y1+y2)/2;
	this.radius = Math.max(this.radius, Math.sqrt(midx*midx + midy*midy));
	this.lines.push(new Line(x1, y1, x2, y2));
}

GlowStruct.prototype.render = function(ctx, x, y, angle=0){
	angle = angle / 180 * Math.PI;
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);

	ctx.strokeStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
	ctx.beginPath();
	for(var i=0; i<this.lines.length; i++){
		var x1 = this.lines[i].x1 * cos * this.stretch - this.lines[i].y1 * sin * this.stretch;
		var y1 = this.lines[i].x1 * sin * this.stretch + this.lines[i].y1 * cos * this.stretch;
		var x2 = this.lines[i].x2 * cos * this.stretch - this.lines[i].y2 * sin * this.stretch;
		var y2 = this.lines[i].x2 * sin * this.stretch + this.lines[i].y2 * cos * this.stretch;

		ctx.moveTo(x + x1, y + y1);
		ctx.lineTo(x + x2, y + y2);
		ctx.stroke();
	}
	ctx.closePath();
}

GlowStruct.prototype.getRadius = function(){
	return this.radius * this.stretch;
}