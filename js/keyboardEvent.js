// array of keyboard statuses, true -> pressed, false -> not pressed
var keyboardState = new Array(256);

document.addEventListener("keydown", function(event){
	keyboardState[event.keyCode] = true;
})

document.addEventListener("keyup", function(event){
	keyboardState[event.keyCode] = false;
})

function flushKeyboardState(){
	keyboardState.fill(false);
}