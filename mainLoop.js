const canvas = document.getElementById("canvas");
const SCREEN_WIDTH = window.innerWidth - 20;
const SCREEN_HEIGHT = window.innerHeight - 20;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
const ctx = canvas.getContext("2d");

// timer last record
var lastRec = 0;

//buttons
var btPlay = new TextButton("play",30, SCREEN_WIDTH/2, 300);

//the menu
/*
	1 = main
	2 = play game
	21 = pause game
*/
var mainMenu = 1;

function mainLoop(timestamp){
	var frameTime = timestamp - lastRec;
	lastRec = timestamp;

	//mouse event queue
	while(!mouseClickQueue.isEmpty()){
		var mousedown = mouseClickQueue.dequeue();

		if(mainMenu == 1){
			btPlay.handleMouseDown(mousedown);
		}
	}

	//clear
	ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	if(mainMenu == 1){
		drawText("Encased", 96, SCREEN_WIDTH/2, 100, 1);
		btPlay.runCycle();
		btPlay.render();

		if(btPlay.getClick()){
			mainMenu = 2;
		}
	}

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