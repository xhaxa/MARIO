const GAME = {
  numClouds: 30,
  mario: {
    posX: 40,
    posY: 50,
    width: 40,
    height: 75,
    movement: 40,
    html: document.getElementById('mario'),
    jumping: false,
    jSpeed: 0
  },
  clouds: [],
  gravity: 4,
  obstacles: [
    {
      type: 'pipe',
      posX: 150,
      posY: 240,
      width: 80,
      height: 80,
    },
    {
      type: 'pipe',
      posX: 880,
      posY: 50,
      width: 80,
      height: 80,
    },
    {
      type: 'floor',
      posX: 0,
      posY: 0,
      width: 400,
      height: 50
    },
    {
      type: 'floor',
      posX: 480,
      posY: 0,
      width: 1000,
      height: 50
    },

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
      posY: Math.floor(Math.random() * 200) + 30,
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
    
}

/*Inicializar el juego y generar sus elementos*/
function init() {
  marioGeneration()
  cloudGeneration()
  obstacleGeneration()
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
    if (isCollision) collisionHeight = obstacle.posY
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
      console.log("HAS PERDIDO");
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
    if (!GAME.mario.jumping) fallDown(40)
  }
  updateMario()
})

init()
