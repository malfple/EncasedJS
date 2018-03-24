// array of keyboard statuses, 1 -> pressed, 0 -> not pressed
var keyboardState = new Array(256);

document.addEventListener("keydown", function(event){
	keyboardState[event.keyCode] = 1;
})

document.addEventListener("keyup", function(event){
	keyboardState[event.keyCode] = 0;
})

function flushKeyboardState(){
	keyboardState.fill(0);
}