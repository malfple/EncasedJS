// array of keyboard statuses, true -> pressed, false -> not pressed
var keyboardState = new Array(256);
var keyboardPressedQueue = new Queue();

document.addEventListener("keydown", function(event){
	keyboardState[event.keyCode] = true;
})

document.addEventListener("keyup", function(event){
	if(keyboardState[event.keyCode]){
		keyboardPressedQueue.enqueue(event.keyCode);
	}
	keyboardState[event.keyCode] = false;
})

function flushKeyboardState(){
	keyboardState.fill(false);
}