const GAME = {
  numClouds: 30,
  mario: {
    posX: 100,
    posY: 50,
    width: 60,
    height: 75,
    html: document.getElementById('mario'),
    jumping: false,
    jSpeed: 0
  },
  clouds: [],
  gravity: 2.5,
  obstacle: {
    posX: 200,
    posY: 50,
    width: 60,
    height: 50
  }
}

const canvas = document.getElementById('canvas')

function updateMario() {
  GAME.mario.html.style.left = GAME.mario.posX + 'px'
  console.log(GAME.mario.html.style.left)
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

/*Que las nubes se muevan -30px*/
function updateClouds() {
  GAME.clouds.forEach(function (cloud) {
    cloud.posX -= 30
    cloud.html.style.left = `${cloud.posX}px`
  })
}

/*Inicializar el juego y generar sus elementos*/
function init() {
  cloudGeneration()
}

function checkCollision() {
  if (GAME.mario.posX + GAME.mario.width >= GAME.obstacle.posX
    && GAME.mario.posX <= GAME.obstacle.posX + GAME.obstacle.width
    && GAME.mario.posY + GAME.mario.height >= GAME.obstacle.posY
    && GAME.mario.posY <= GAME.obstacle.posY + GAME.obstacle.height
   ) {
    /*GAME.mario.posX = GAME.obstacle.posX - GAME.mario.width */
    console.log("He colisionado")
  }
}

document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    GAME.mario.html.classList.remove('mario-left')
    if (GAME.mario.posX >= 500) {
      updateClouds()
    } else {
      GAME.mario.posX += 30
    }
    checkCollision()
  }
  if (event.code === 'ArrowLeft') {
    GAME.mario.posX -= 30
    GAME.mario.html.classList.add('mario-left')
    console.log(GAME.mario.posX)
    if (GAME.mario.posX <= 0) {
      GAME.mario.posX = 0
    }  
    checkCollision()
  }
  if (event.code === 'ArrowUp') {
    if (!GAME.mario.jumping) {
      GAME.mario.jumping = true
      GAME.mario.jSpeed += 30
      let timerId = setInterval(function() {
        GAME.mario.posY += GAME.mario.jSpeed
        GAME.mario.jSpeed -= GAME.gravity
        updateMario()
        checkCollision()
        if(GAME.mario.posY <= 50) {
          clearInterval(timerId)
          GAME.mario.jumping = false;
          GAME.mario.jSpeed = 0;
          GAME.mario.posY = 50;
        }
      }, 100)
    }
    checkCollision()
  }
  updateMario()
})

init()
