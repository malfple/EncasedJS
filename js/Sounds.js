// creating audio with html tag
// 
var Sounds = [];
Sounds.sMusic = new Audio("Sounds/Tchaikovsky\ -\ Sleeping\ Beauty\ Waltz.mp3");
Sounds.sExplosion = new Audio("Sounds/Explosion+1.wav");
Sounds.sShot = new Audio("Sounds/shot.wav");

Sounds.playSound = function(sound){
	let clone = sound.cloneNode();
	clone.play();
}

// loop music
Sounds.sMusic.addEventListener("ended", function(){
	this.currentTime = 0;
	this.play();
}, false);