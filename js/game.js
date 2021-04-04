const botonHTML = document.getElementById('playJuego');
botonHTML.onclick = function (){
  var pantallaInicio = document.getElementById('inicio');
  pantallaInicio.setAttribute('class', 'ocultar')
  audio.play()
  audio.loop = true
}
 
const botonInstrucciones = document.getElementById('level1');

botonInstrucciones.onclick = function (){
  var pantallaInstrucciones = document.getElementById('instrucciones');
  pantallaInstrucciones.setAttribute('class', 'ocultar')
}

const botonNivel = document.getElementById('letsGo');
botonNivel.onclick = function (){
  var pantallaNivel = document.getElementById('nivel1');
  pantallaNivel.setAttribute('class', 'ocultar')
}


const GAME = {
  numClouds: 150,
  mario: {
    posX: 60,
    posY: 50,
    width: 60,
    height: 95,
    movement: 60,
    html: document.getElementById('mario'),
    jumping: false,
    jSpeed: 0
  },
  clouds: [],
  paintings: [
    {
      name: 'selfportraitPicasso',
      posX: 700,
      posY: 260,
      width: 150, 
      height: 120,
    },
    {
      name: 'birthVenus',
      posX: 1400,
      posY: 215,
      width: 180, 
      height: 180,
    },
    {
      name: 'selfportraitVanGogh',
      posX: 2200,
      posY: 260,
      width: 120, 
      height: 120,
    },
    {
      name: 'magritte',
      posX: 2950,
      posY: 220,
      width: 150, 
      height: 200,
    },
    {
      name: 'sunflowers',
      posX: 3700,
      posY: 230,
      width: 130, 
      height: 200,
    },
    {
      name: 'vermeer',
      posX: 4500,
      posY: 275,
      width: 63, 
      height: 92,
    },
    {
      name: 'picassoPortrait',
      posX: 5150,
      posY: 230,
      width: 150, 
      height: 190,
    },
    {
      name: 'monaLisa',
      posX: 5900,
      posY: 240,
      width: 106, 
      height: 152,
    },
    {
      name: 'vanGoghPortrait',
      posX: 6600,
      posY: 230,
      width: 150, 
      height: 160,
    }
  ],
  barriers: [],
  gravity: 4,
  obstacles: [
    {
      type: 'meta',
      posX: 7200,
      posY: 50,
      width: 233, 
      height: 350,
    },
    /*{los obstáculos tendrán que ser multiplos de 60
      type: 'pipe',
      posX: 120,
      posY: 240,
      width: 120,
      height: 80,
    },*/
    {
      type: 'tourists',
      posX: 300,
      posY: 50,
      width: 120,
      height: 130,
    },
    {
      type: 'tourists',
      posX: 900,
      posY: 50,
      width: 120,
      height: 130,
    },

    {
      type: 'chandelier',
      posX: 970,
      posY: 290,
      width: 120,
      height: 58,
    },
    {
      type: 'chandelier',
      posX: 1920,
      posY: 290,
      width: 120,
      height: 58,
    },
    {
      type: 'chandelier',
      posX: 3150,
      posY: 290,
      width: 120,
      height: 58,
    },
    {
      type: 'chandelier',
      posX: 3500,
      posY: 290,
      width: 120,
      height: 58,
    },
    {
      type: 'chandelier',
      posX: 4800,
      posY: 290,
      width: 120,
      height: 58,
    },
    {
      type: 'chandelier',
      posX: 5600,
      posY: 290,
      width: 120,
      height: 58,
    },
    {
      type: 'vitrina',
      posX: 1700,
      posY: 240,
      width: 75,
      height: 80,
    },
    {
      type: 'vitrina',
      posX: 3200,
      posY: 240,
      width: 75,
      height: 80,
    },
    {
      type: 'vitrina',
      posX: 3270,
      posY: 320,
      width: 75,
      height: 80,
    },
    {
      type: 'vitrina',
      posX: 5000,
      posY: 200,
      width: 75,
      height: 80,
    },
    {
      type: 'floor',
      posX: 0,
      posY: 0,
      width: 1200,
      height: 50
    },
    {
      type: 'floor',
      posX: 480,
      posY: 0,
      width: 1000,
      height: 50
    },
    {
      type: 'floor',
      posX: 1560,
      posY: 0,
      width: 600,
      height: 50
    },
    {
      type: 'floor',
      posX: 2240,
      posY: 0,
      width: 900,
      height: 50
    },
    {
      type: 'floor',
      posX: 3220,
      posY: 0,
      width: 1200,
      height: 50
    },
    {
      type: 'floor',
      posX: 4500,
      posY: 0,
      width: 900,
      height: 50
    },
    {
      type: 'floor',
      posX: 5480,
      posY: 0,
      width: 3000,
      height: 50
    },
    {
      type: 'thief',
      posX: 420,
      posY: 50,
      width: 79,
      height: 85
    }
  ]
}


const canvas = document.getElementById('canvas')

function updateMario() {
  GAME.mario.html.style.left = GAME.mario.posX + 'px'
  GAME.mario.html.style.bottom = GAME.mario.posY + 'px'
}

function cloudGeneration() {
  for (var i = 0; i < GAME.numClouds; i++) {
    let cloud = {
      posY: Math.floor(Math.random() * 50) + 30,
      posX: (i * 200) + Math.floor((Math.random() * 100))
    }

    const cloudHTML = document.createElement('div')
    cloudHTML.classList.add('cloud')
    cloudHTML.style.top  = `${ cloud.posY }px`
    cloudHTML.style.left = `${ cloud.posX }px`
    canvas.appendChild(cloudHTML)

    cloud.html = cloudHTML;
    GAME.clouds.push(cloud)
  }
}

function barriersGeneration() {
  for (var i = 0; i < 9; i++) {
    let barrier = [
    {
      posY: 370,
      posX: 670
    },
    {
      posY: 370,
      posX: 1390
    },
    {
      posY: 370,
      posX: 2165
    },
    {
      posY: 370,
      posX: 2933
    },
    {
      posY: 370,
      posX: 3672
    },
    {
      posY: 370,
      posX: 4442
    },
    {
      posY: 370,
      posX: 5132
    },
    {
      posY: 370,
      posX: 5865
    },
    {
      posY: 370,
      posX: 6586
    }
    ]

    const barrierHTML = document.createElement('div')
    barrierHTML.classList.add('barrier')
    barrierHTML.style.top  = `${ barrier[i].posY }px`
    barrierHTML.style.left = `${ barrier[i].posX }px`
    canvas.appendChild(barrierHTML)

    barrier[i].html = barrierHTML;
    GAME.barriers.push(barrier[i])
  }
}

function marioGeneration() {
  const marioHTML = document.getElementById('mario')
  marioHTML.style.left = `${ GAME.mario.posX }px`
  marioHTML.style.bottom = `${ GAME.mario.posY }px`
  marioHTML.style.width = `${ GAME.mario.width }px`
  marioHTML.style.height = `${ GAME.mario.height }px`
}

function obstacleGeneration() {
  GAME.obstacles.forEach( function(obstacle) {
    const obstacleHTML = document.createElement('div')
    obstacleHTML.classList.add(obstacle.type)
    obstacleHTML.style.left = `${ obstacle.posX }px`
    obstacleHTML.style.bottom = `${ obstacle.posY }px`
    obstacleHTML.style.width = `${ obstacle.width }px`
    obstacleHTML.style.height = `${ obstacle.height }px`
    canvas.appendChild(obstacleHTML)
    obstacle.html = obstacleHTML
  })  
}

function paintingsGeneration() {
  GAME.paintings.forEach( function(painting) {
    const paintingHTML = document.createElement('div')
    paintingHTML.classList.add(painting.name)
    paintingHTML.style.left = `${ painting.posX }px`
    paintingHTML.style.bottom = `${ painting.posY }px`
    paintingHTML.style.width = `${ painting.width }px`
    paintingHTML.style.height = `${ painting.height }px`
    canvas.appendChild(paintingHTML)
    painting.html = paintingHTML
  })  
}

/*Que las nubes se muevan -30px*/
function updateCloudsObstacles() {
  GAME.clouds.forEach(function (cloud) {
    cloud.posX -= GAME.mario.width
    cloud.html.style.left = `${cloud.posX}px`
  })

  GAME.obstacles.forEach(function(obstacle){
    obstacle.posX -= GAME.mario.width
    obstacle.html.style.left = `${obstacle.posX}px`
  })
    
  GAME.paintings.forEach(function(painting){
    painting.posX -= GAME.mario.width
    painting.html.style.left = `${painting.posX}px`
  })

  GAME.barriers.forEach(function(barrier){
    barrier.posX -= GAME.mario.width
    barrier.html.style.left = `${barrier.posX}px`
  })
}

/*Inicializar el juego y generar sus elementos*/
function init() {
  marioGeneration()
  cloudGeneration()
  obstacleGeneration()
  paintingsGeneration()
  barriersGeneration()
  // gravityStarts()
}

function isCollisionRight() {
  let isCollision = false;
  GAME.obstacles.forEach( function(obstacle) {
    isCollision = isCollision ||
      (obstacle.posX === GAME.mario.posX + GAME.mario.width
      && GAME.mario.posY + GAME.mario.height > obstacle.posY
      && (GAME.mario.posY < obstacle.posY + obstacle.height))
  })
  console.log("Is there a right collision?: ", isCollision)
  return isCollision
}

function isCollisionLeft() {
  let isCollision = false;
  GAME.obstacles.forEach( function(obstacle) {
    isCollision = isCollision ||
      (obstacle.posX + obstacle.width === GAME.mario.posX
      && GAME.mario.posY + GAME.mario.height > obstacle.posY
      && GAME.mario.posY < obstacle.posY + obstacle.height)
  })
  console.log("Is there a left collision?: ", isCollision)
  return isCollision
}

//COLISION ABAJO___
function isCollisionBelow(){
  let collisionHeight = null;
  GAME.obstacles.forEach( function(obstacle) {
    let isCollision = 
      GAME.mario.posY < obstacle.posY + obstacle.height
      && GAME.mario.posY + GAME.mario.height > obstacle.posY
      && GAME.mario.posX < obstacle.posX + obstacle.width
      && GAME.mario.posX + GAME.mario.width > obstacle.posX
    if (isCollision && !isCollisionAbove()) collisionHeight = obstacle.posY + obstacle.height
  })
  console.log("There is a below collision at:", collisionHeight);
  return collisionHeight
}

//COLISION ARRIBA^^^
function isCollisionAbove(){
  let collisionHeight = null;
  GAME.obstacles.forEach( function(obstacle) {
    let isCollision = 
      GAME.mario.posY + GAME.mario.height > obstacle.posY
      && obstacle.posY + obstacle.height > GAME.mario.posY
      && GAME.mario.posX < obstacle.posX + obstacle.width
      && GAME.mario.posX + GAME.mario.width > obstacle.posX
    if (isCollision ) collisionHeight = obstacle.posY /*+ obstacle.height            AQUI ES DONDEE ESTA SITUANDOSE MAL*/
  })
  console.log("There is a ABOVE collision at:", collisionHeight);
  return collisionHeight
}

function fallDown(speed) {
  GAME.mario.jumping = true
  GAME.mario.jSpeed += speed
  let timerId = setInterval(function() {
    GAME.mario.posY += GAME.mario.jSpeed
    GAME.mario.jSpeed -= GAME.gravity

    let collisionBelowHeight = isCollisionBelow()
    if (collisionBelowHeight !== null) {
      clearInterval(timerId)
      GAME.mario.jumping = false;
      GAME.mario.jSpeed = 0;
      GAME.mario.posY = collisionBelowHeight
    } else if (GAME.mario.posY < 0){
      alert("HAS PERDIDO");/*-------*/
    }

    let collisionAboveHeight = isCollisionAbove()
    if (collisionAboveHeight !== null) {
      clearInterval(timerId)
      GAME.mario.jumping = false;
      GAME.mario.jSpeed = 0;
      GAME.mario.posY = collisionAboveHeight - GAME.mario.height;
      fallDown(0)  
    }


    updateMario()
  }, 100)
}
/*
function fallDownJumping(speed) {
  GAME.mario.jumping = true
  GAME.mario.jSpeed += speed
  let timerId = setInterval(function() {
    GAME.mario.posY += GAME.mario.jSpeed
    GAME.mario.jSpeed -= GAME.gravity

    let collisionAboveHeight = isCollisionAbove()
    if (collisionAboveHeight !== null) {
      clearInterval(timerId)
      GAME.mario.jumping = false;
      GAME.mario.jSpeed = 0;
      GAME.mario.posY = collisionAboveHeight - GAME.mario.height;
      fallDown(0)  
    }

    let collisionBelowHeight = isCollisionBelow()
    if (collisionBelowHeight !== null) {
      clearInterval(timerId)
      GAME.mario.jumping = false;
      GAME.mario.jSpeed = 0;
      GAME.mario.posY = collisionBelowHeight
    } else if (GAME.mario.posY < 0){
      console.log("HAS PERDIDO -fallDownJumping");
    }


    updateMario()
  }, 100)
}*/



document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    GAME.mario.html.classList.remove('mario-left')
    if (GAME.mario.posX >= 500 && !isCollisionRight()) {
      updateCloudsObstacles()
    }  else if (!isCollisionRight()) { 
      GAME.mario.posX += GAME.mario.movement
    }
    if (isCollisionBelow() === null  && !GAME.mario.jumping) fallDown(0)
    console.log("Mario PosX", GAME.mario.posX)
    console.log("EmptyEasel PosX", GAME.obstacles[0].posX)
    /* NO FURULA
    if (GAME.obstacles[0].posX === 600){
      document.getElementsByClassName("meta").style.background = "(../assets/caballete_completo.svg)"
    }
    if (GAME.obstacles[0].posX === 600){
      GAME.obstacles[0].html.style.background = "(../assets/caballete_completo.svg)"
    }*/
    }
  if (event.code === 'ArrowLeft') {
    GAME.mario.html.classList.add('mario-left')
    if (!isCollisionLeft()) {        
      GAME.mario.posX -= GAME.mario.movement
    }
    if (GAME.mario.posX <= 0) {
      GAME.mario.posX = 0
    }
    if (isCollisionBelow() === null && !GAME.mario.jumping) fallDown(0)
  }
  if (event.code === 'ArrowUp') {
    if (!GAME.mario.jumping) fallDown(47)
  }
  updateMario()
})

init()

/*AUDIO*/
/*
const sound = new Audio ('assets/mountains.wav')
sound.loop = true

function stopSound(){
  sound.pause()
}
*/

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

/*
musicSound.addEventListener('click', function(event){
  if (sound.play())
  console.log('lelel');
  musicSound.classList.add("soundOff")
})*/

