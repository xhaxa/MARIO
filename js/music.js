/*Allows to turn music on/off - Permite encender/apagar la música*/
var audio = document.getElementById('audio');
var playPauseBTN = document.getElementById('musicButton');
var seEscucha = true

function playPause(){
  if (seEscucha === true){
  seEscucha = false;  
  audio.pause();
  playPauseBTN.classList.remove("soundOff")
  playPauseBTN.classList.add("soundOn")
  }else{
    seEscucha = true;
    audio.play();
    audio.loop = true;
    playPauseBTN.classList.remove("soundOn")
    playPauseBTN.classList.add("soundOff") 
  }
  
}