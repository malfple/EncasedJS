var mouseX, mouseY;
var mouseDownX, mouseDownY;

function eventMouseMove(event){
	var canvas = document.getElementById("canvas");
	var rect = canvas.getBoundingClientRect();
	mouseX = event.clientX - rect.left;
	mouseY = event.clientY - rect.top;
}

function eventMouseDown(){

}

function eventMouseUp(){
}