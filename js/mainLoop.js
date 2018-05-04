const canvas = document.getElementById("canvas");
const SCREEN_WIDTH = window.innerWidth - 20;
const SCREEN_HEIGHT = window.innerHeight - 20;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
const ctx = canvas.getContext("2d");

var CURRENT_ARENA_WIDTH = SCREEN_WIDTH;
var CURRENT_ARENA_HEIGHT = SCREEN_HEIGHT;
const ARENA_WIDTH = 1500;
const ARENA_HEIGHT = 1500;

// timer last record
var lastRec = 0;
const FRAME_TIME_CAP = 50;

//buttons
var btPlay = new TextButton("play",30, SCREEN_WIDTH/2, 300, ctx);

//spaceship
var playerSS;
var camX = 0, camY = 0;

// the portal
var gsPortal = new GlowStruct();
gsPortal.addLine(-50, -50, 50, -50);
gsPortal.addLine(50, -50, 50, 50);
gsPortal.addLine(50, 50, -50, 50);
gsPortal.addLine(-50, 50, -50, -50);
gsPortal.addLine(-50, 0, 0, -50);
gsPortal.addLine(50, 0, 0, 50);
gsPortal.addLine(0, -50, 50, 0);
gsPortal.addLine(0, 50, -50, 0);

//the menu
/*
	1 = main
	2 = play game
	21 = pause game
	22 = game over
*/
var mainMenu = 1;

function mainLoop(timestamp){
	var frameTime = timestamp - lastRec;
	lastRec = timestamp;
	frameTime = Math.min(frameTime, FRAME_TIME_CAP);

	//mouse event queue
	while(!mouseClickQueue.isEmpty()){
		var mousedown = mouseClickQueue.dequeue();

		if(mainMenu == 1){
			btPlay.handleMouseDown(mousedown);
		}else

		playerSS.handleMouseEvent(mousedown);
	}
	// keyboard events
	if(mainMenu == 2){
		playerSS.handleKeyboardInput(keyboardState);
	}
	while(!keyboardPressedQueue.isEmpty()){
		var keyCode = keyboardPressedQueue.dequeue();

		if(keyCode == 27){ // esc key
			if(mainMenu == 2)mainMenu = 21;
			else if(mainMenu == 21)mainMenu = 2;
		}
	}

	//clear
	ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	//buttons/texts/misc and playerSS
	if(mainMenu == 1){
		drawText("encased", 96, SCREEN_WIDTH/2, 100, 1);
		btPlay.runCycle();
		btPlay.render(ctx);

		if(btPlay.getClick()){
			mainMenu = 2;
			newGame();
		}
	}else{
		if(mainMenu == 2){
			// update camera
			camX = playerSS.x - SCREEN_WIDTH/2;
			camY = playerSS.y - SCREEN_HEIGHT/2;

			playerSS.runCycle(frameTime);
			playerSS.shootCycle(Bullets, camX, camY);

			LevelHandler.runCycle(ctx, frameTime);
		}else{
			LevelHandler.runCycle(ctx, 0);
		}
		
		renderArena();

		drawText("shield count : " + playerSS.getShieldCount(), 20, 0, 0);
		drawText("enemy count : " + Enms.getSize(), 20, SCREEN_WIDTH, 0, 2);

		if(mainMenu != 22){ // if not gameover
			playerSS.render(ctx, camX, camY);
			if(playerSS.getShieldCount() < 0){ // game over
				gameOver();
				mainMenu = 22;
			}
		}

		gsPortal.render(ctx, CURRENT_ARENA_WIDTH/2 - camX, CURRENT_ARENA_HEIGHT/2 - camY);
	}


	// explosions
	if(mainMenu != 21){
		Explosions.runCycle(frameTime);
	}
	Explosions.render(ctx, camX, camY);
	if(mainMenu == 1){
		Explosions.createRandomExplosions();
	}

	// bullets
	if(mainMenu != 21){
		Bullets.runCycle(frameTime);
	}
	Bullets.render(ctx, camX, camY);

	// enms
	if(mainMenu != 21){
		Enms.runCycle(frameTime);
		Enms.handleCollision(playerSS);
	}
	Enms.render(ctx, camX, camY);

	// screen dim
	if(mainMenu == 21 || mainMenu == 22){
		ctx.globalAlpha = 0.7;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
		ctx.globalAlpha = 1;
	}

	if(mainMenu == 21){
		drawText("paused", 96, SCREEN_WIDTH/2, SCREEN_HEIGHT-100, 1);
	}else if(mainMenu == 22){
		drawText("game over", 96, SCREEN_WIDTH/2, SCREEN_HEIGHT-100, 1);
	}

	requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);

// creates a new game
function newGame(){
	playerSS = new SpaceShip(ARENA_WIDTH/2.5, ARENA_HEIGHT/2.5);
	CURRENT_ARENA_WIDTH = ARENA_WIDTH;
	CURRENT_ARENA_HEIGHT = ARENA_HEIGHT;
	Explosions.clear();
	LevelHandler.newGame();
}

// game over
function gameOver(){
	Explosions.add(new Explosion(playerSS.x, playerSS.y, 3));
}

// str = string to draw, fontsize,
//x,y = coordinate of :
// pos = 0, top left
// pos = 1, center
// pos = 2, top right
function drawText(str, fontsize, x, y, pos = 0){
	ctx.font = fontsize + "px Sofachrome";
	ctx.fillStyle = "#FFFFFF";
	if(pos == 1){
		ctx.fillText(str, x - ctx.measureText(str).width/2, y + fontsize/2);
	}else if(pos == 0){
		ctx.fillText(str, x, y + fontsize);
	}else if(pos == 2){
		ctx.fillText(str, x - ctx.measureText(str).width, y + fontsize);
	}
}

function renderArena(){
	ctx.strokeStyle = "#FFFFFF";
	ctx.beginPath();
	ctx.moveTo(-camX, -camY);
	ctx.lineTo(ARENA_WIDTH-camX, -camY);
	ctx.moveTo(ARENA_WIDTH-camX, -camY);
	ctx.lineTo(ARENA_WIDTH-camX, ARENA_HEIGHT-camY);
	ctx.moveTo(ARENA_WIDTH-camX, ARENA_HEIGHT-camY);
	ctx.lineTo(-camX, ARENA_HEIGHT-camY);
	ctx.moveTo(-camX, ARENA_HEIGHT-camY);
	ctx.lineTo(-camX, -camY);
	ctx.stroke();
	ctx.closePath();
}