const GAME = {
  numClouds: 30,
  mario: {
    posX: 120,
    posY: 50,
    width: 40,
    height: 75,
    html: document.getElementById('mario'),
    jumping: false,
    jSpeed: 0
  },
  clouds: [],
  gravity: 2.5,
  obstacle: {
    posX: 240,
    posY: 50,
    width: 60,
    height: 50
  }
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

function obstacleGeneration() {
  const obstacleHTML = document.createElement('div')
  obstacleHTML.classList.add('obstacle')
  obstacleHTML.style.left = `${ GAME.obstacle.posX }px`
  canvas.appendChild(obstacleHTML)
  GAME.obstacle.html = obstacleHTML
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
  cloudGeneration()
  obstacleGeneration()
  gravityStarts()
}

function canMarioMoveRight() {
  const MarioRight = GAME.mario.posX + GAME.mario.width
  const res = (Math.abs(GAME.obstacle.posX - MarioRight) >= GAME.mario.width
     || GAME.mario.posY > GAME.obstacle.height + GAME.obstacle.posY)
  console.log('can Move right?`',res);  
  return res;
}

function canMarioMoveLeft() {
  const ObstacleRight = GAME.obstacle.posX + GAME.obstacle.width
  const res = (Math.abs(GAME.mario.posX - ObstacleRight) >= GAME.mario.width
    || GAME.mario.posY > GAME.obstacle.height + GAME.obstacle.posY)
  console.log('can Move left?`',res);
  return res
}
function checkCollisionY() {
  const col = (GAME.mario.posY + GAME.mario.height >= GAME.obstacle.posY
       && GAME.mario.posY <= GAME.obstacle.posY + GAME.obstacle.height )
       col ? console.log('colission y detected'): null
       return col
}

document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    GAME.mario.html.classList.remove('mario-left')
    if (GAME.mario.posX >= 500) {
      updateCloudsObstacles()
    }  else if (canMarioMoveRight()) {
      GAME.mario.posX += GAME.mario.width
    }
  }

  if (event.code === 'ArrowLeft') {
    GAME.mario.html.classList.add('mario-left')
    if (canMarioMoveLeft()) {
      GAME.mario.posX -= GAME.mario.width
    }

    if (GAME.mario.posX <= 0) {
      GAME.mario.posX = 0
    }  
  }

  if (event.code === 'ArrowUp') {
    if (!GAME.mario.jumping) {
      GAME.mario.jumping = true
      GAME.mario.jSpeed += 30

      let timerId = setInterval(function() {
        GAME.mario.posY += GAME.mario.jSpeed
        GAME.mario.jSpeed -= GAME.gravity
        updateMario()
        // checkCollision()
        const obsTop = GAME.obstacle.posY + GAME.obstacle.height
        if (GAME.mario.jSpeed < 0
          && Math.abs(GAME.mario.posY - obsTop) <= 20
          
          && (!canMarioMoveLeft() || !canMarioMoveLeft())) {
            console.log('object detected. stop gravity');
            clearInterval(timerId)
            GAME.mario.jumping = false;
            GAME.mario.jSpeed = 0;
        } else {
          if(GAME.mario.posY <= 50) {
            console.log('floor detected. stop gravity');
            clearInterval(timerId)
            GAME.mario.jumping = false;
            GAME.mario.jSpeed = 0;
            GAME.mario.posY = obsTop;
          }
        }
        
      }, 100)
    }
  }

  updateMario()
})

function gravityStarts() {

}

init()
