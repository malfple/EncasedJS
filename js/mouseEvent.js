var mouseX, mouseY;
var mouseDownX, mouseDownY;

// 1 if mouse down, 0 if mouse up
var mouseClickQueue = new Queue();

function eventMouseMove(event){
	var canvas = document.getElementById("canvas");
	var rect = canvas.getBoundingClientRect();
	mouseX = event.clientX - rect.left;
	mouseY = event.clientY - rect.top;
}

function eventMouseDown(){
	mouseClickQueue.enqueue(1);
}

function eventMouseUp(){
	mouseClickQueue.enqueue(0);
}