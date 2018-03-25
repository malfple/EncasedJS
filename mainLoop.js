const canvas = document.getElementById("canvas");
const SCREEN_WIDTH = window.innerWidth - 20;
const SCREEN_HEIGHT = window.innerHeight - 20;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
const ctx = canvas.getContext("2d");

const ARENA_WIDTH = 3000;
const ARENA_HEIGHT = 3000;

// timer last record
var lastRec = 0;

//buttons
var btPlay = new TextButton("play",30, SCREEN_WIDTH/2, 300, ctx);

//spaceship
var playerSS;
var camX, camY;

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
	// keyboard events
	if(mainMenu == 2){
		playerSS.handleKeyboardInput(keyboardState);
	}

	//clear
	ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	if(mainMenu == 1){
		drawText("Encased", 96, SCREEN_WIDTH/2, 100, 1);
		btPlay.runCycle();
		btPlay.render(ctx);

		if(btPlay.getClick()){
			mainMenu = 2;
			newGame();
		}
	}else if(mainMenu == 2){
		drawText("halo", 30, ARENA_WIDTH/2.5-camX, ARENA_HEIGHT/2.5-camY, 1);

		// update camera
		camX = playerSS.x - SCREEN_WIDTH/2;
		camY = playerSS.y - SCREEN_HEIGHT/2;

		playerSS.runCycle(frameTime);

		playerSS.render(ctx, camX, camY);
	}

	requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);

// creates a new game
function newGame(){
	playerSS = new SpaceShip(ARENA_WIDTH/2.5, ARENA_HEIGHT/2.5);
}

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