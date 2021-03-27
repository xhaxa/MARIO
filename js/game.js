const GAME = {
  numClouds: 30,
  mario: {
    posX: 100,
    posY: 50,
    width: 40,
    height: 75,
    movement: 40,
    html: document.getElementById('mario'),
    jumping: false,
    jSpeed: 0
  },
  clouds: [],
  gravity: 2.5,
  obstacle: {
    posX: 240,
    posY: 50,
    width: 80,
    height: 80
  },
  obstacles: [
    {
      type: 'pipe',
      posX: 240,
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
  GAME.obstacle.posX -= GAME.mario.width
  GAME.obstacle.html.style.left = `${GAME.obstacle.posX}px`

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
      (obstacle.posX <= GAME.mario.posX + GAME.mario.width
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
      (obstacle.posX + obstacle.width >= GAME.mario.posX
      && GAME.mario.posY + GAME.mario.height > obstacle.posY
      && GAME.mario.posY < obstacle.posY + obstacle.height)
  })
  console.log("Is there a left collision?: ", isCollision)
  return isCollision
}

function isCollisionBelow(){
  let isCollision = false;
  GAME.obstacles.forEach( function(obstacle) {
    isCollision = isCollision ||
      (GAME.mario.posY <= obstacle.posY + obstacle.height
      && GAME.mario.posX < obstacle.posX + obstacle.width
      && GAME.mario.posX + GAME.mario.width > obstacle.posX)
  })
  console.log("Is there a below collision?:", isCollision);
  return isCollision
  // const obsTop = GAME.obstacle.posY + GAME.obstacle.height;
  // const res = !(GAME.mario.posY - obsTop <= 0 && GAME.mario.posX < GAME.obstacle.posX + GAME.obstacle.width && GAME.mario.posX + GAME.mario.width > GAME.obstacle.posX)
  // console.log("RES", res);
  // console.log("POSY", GAME.mario.posY )
  // console.log("FALL ", GAME.mario.posY > 50 && res);
  // return res
  // // return GAME.mario.posY > 50 && res
}

// function checkCollisionY() {
//   const col = (GAME.mario.posY + GAME.mario.height >= GAME.obstacle.posY
//        && GAME.mario.posY <= GAME.obstacle.posY + GAME.obstacle.height )
//        col ? console.log('colission y detected'): null
//        return col
// }

document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    GAME.mario.html.classList.remove('mario-left')
    if (GAME.mario.posX >= 500) {
      updateCloudsObstacles()
    }  else if (canMarioMoveRight()) {
      GAME.mario.posX += GAME.mario.movement
    }
    if (canMarioFall()){
          //makeMarioFall()
    }
  }
  if (event.code === 'ArrowLeft') {
    GAME.mario.html.classList.add('mario-left')
    if (canMarioMoveLeft()) {        ///////////////
      GAME.mario.posX -= GAME.mario.movement
    }

    if (GAME.mario.posX <= 0) {
      GAME.mario.posX = 0
    }
    if (canMarioFall()){
      //makeMarioFall()
}
  }
  if (event.code === 'ArrowUp') {
    if (!GAME.mario.jumping) {
      GAME.mario.jumping = true
      GAME.mario.jSpeed += 30
      let timerId = setInterval(function() {
        GAME.mario.posY += GAME.mario.jSpeed
        GAME.mario.jSpeed -= GAME.gravity
        console.log(GAME.mario.posY)
        //updateMario()
        // checkCollision()
        const obsTop = GAME.obstacle.posY + GAME.obstacle.height
        if (GAME.mario.jSpeed < 0
          && !canMarioFall()
          && (canMarioMoveLeft() && canMarioMoveRight())) {
            console.log('object detected. stop gravity');
            clearInterval(timerId)
            GAME.mario.jumping = false;
            GAME.mario.jSpeed = 0;
            GAME.mario.posY = obsTop
        } else {
          if(GAME.mario.posY <= 50) {
            console.log('floor detected. stop gravity');
            clearInterval(timerId)
            GAME.mario.jumping = false;
            GAME.mario.jSpeed = 0;
            GAME.mario.posY = 50;
          }
        }
        if (timerId) updateMario()
        
      }, 100)
    }
  }
  updateMario()
})

init()
