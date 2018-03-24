const canvas = document.getElementById("canvas");
const SCREEN_WIDTH = window.innerWidth - 20;
const SCREEN_HEIGHT = window.innerHeight - 20;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
const ctx = canvas.getContext("2d");

var lastRec = 0;

var btPlay = new TextButton("play",30, SCREEN_WIDTH/2, 300);

function mainLoop(timestamp){
	var frameTime = timestamp - lastRec;
	lastRec = timestamp;

	//clear
	ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	drawText("Encased", 96, SCREEN_WIDTH/2, 100, 1);
	btPlay.runCycle();
	btPlay.render();

	requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);

// MOUSE

// str = string to draw, fontsize,
//x,y = coordinate of left top of text if center = 0, (center of text if center = 1)
function drawText(str, fontsize, x, y, center = 0){
	ctx.font = fontsize + "px Sofachrome";
	ctx.fillStyle = "#FFFFFF";
	if(center == 1){
		ctx.fillText(str, x - ctx.measureText(str).width/2, y + fontsize/2);
	}else{
		ctx.fillText(str, x, y);
	}
}