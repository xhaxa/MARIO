
/*Play button Welcome Screen - Botón PLAY Pantalla de Bienvenida*/
const botonHTML = document.getElementById('playJuego');
botonHTML.onclick = function (){
  var pantallaInicio = document.getElementById('inicio');
  pantallaInicio.setAttribute('class', 'ocultar')
  //audio.play()
  audio.loop = true
}

/*Level 1 button Instructions Screen - Botón Level 1 Pantalla de Instrucciones*/
const botonInstrucciones = document.getElementById('level1');
botonInstrucciones.onclick = function (){
  var pantallaInstrucciones = document.getElementById('instrucciones');
  pantallaInstrucciones.setAttribute('class', 'ocultar')
}

/*Let's Go button Leven 1 Screen - Botón Let's Go Pantalla Nivel 1*/
const botonNivel = document.getElementById('letsGo');
botonNivel.onclick = function (){
  var pantallaNivel = document.getElementById('nivel1');
  pantallaNivel.setAttribute('class', 'ocultar')
}

/*GAME Object containing all the visual elements and obstacles in the game - Objeto GAME que contiene, todos los objetos y obstáculos del juego*/
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
  paintings: PAINTINGS,
  barriers: BARRIERS,
  gravity: 12,
  obstacles: OBSTACLES
}

/*CANVAS div is the display screen of the game - El div CANVAS es la pantalla donde se muestra el juego*/
const canvas = document.getElementById('canvas')

/*Updates Mario's position as it moves - Actualiza la posición de Mario conforme se mueve*/
function updateMario() {
  GAME.mario.html.style.left = GAME.mario.posX + 'px'
  GAME.mario.html.style.bottom = GAME.mario.posY + 'px'
}

/*Generates clouds randomly between certain posX and posY - Genera nubes aleatoriamente entre determinados valores de posX y posY*/
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

/*Generates the barriers in front of the paintings at fixed positions - Genera las barreras delante de los cuadros en posiciones fijas*/
function barriersGeneration() {

  GAME.barriers.forEach(function(barrier) {
    const barrierHTML = document.createElement('div')
    barrierHTML.classList.add('barrier')
    barrierHTML.style.top  = `${ barrier.posY }px`
    barrierHTML.style.left = `${ barrier.posX }px`
    canvas.appendChild(barrierHTML)
  
    barrier.html = barrierHTML;
  })
}

/*Generates Mario according to the values given to him in the object GAME - Genera a Mario de acuerdo a los valores asignados en el objeto GAME*/
function marioGeneration() {
  const marioHTML = document.getElementById('mario')
  marioHTML.style.left = `${ GAME.mario.posX }px`
  marioHTML.style.bottom = `${ GAME.mario.posY }px`
  marioHTML.style.width = `${ GAME.mario.width }px`
  marioHTML.style.height = `${ GAME.mario.height }px`
}

/*Generates the obstacles according to the values given in the object GAME - Genera obstáculos de acuerdo a los valores asignados en el objeto GAME*/
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

/*Generates the paintings according to the values given in the object GAME - Genera los cuadros de acuerdo a los valores asignados en el objeto GAME*/
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
/*Updates the positions of the elements (clouds, obstacles, paitings, barriers) to create impression of movement as we play with Mario - Actualiza la posición de los elementos (nubes, obstáculos, cuadros, barreras) para generar sensación de movimiento mientras jugamos con Mario*/
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

function enemyStartsMoving() {
  const malote = GAME.obstacles[GAME.obstacles.length-1]
  malote.dir = 1
  setInterval(function() {
    if (malote.posX > 850 || malote.posX < 420) { malote.dir *= -1}
    malote.posX += 5*malote.dir;
    malote.html.style.left = `${malote.posX}px`
  }, 50)
}

/*Initialises the game by excecuting all the functions that generate elements - Inicializar el juego al ejecutir las funciones que generan los elementos*/
function init() {
  marioGeneration()
  cloudGeneration()
  obstacleGeneration()
  paintingsGeneration()
  barriersGeneration()
  enemyStartsMoving()
  // gravityStarts()
}

/*Checks for collision between Mario's right hand side and obstacles - Comprueba colisión entre la derecha de Mario y los obstáculos */
function isCollisionRight() {
  for (let i = 0; i < GAME.obstacles.length; i++) {
    const obstacle = GAME.obstacles[i];
    isCollision = obstacle.posX === GAME.mario.posX + GAME.mario.width
      && GAME.mario.posY + GAME.mario.height > obstacle.posY
      && (GAME.mario.posY < obstacle.posY + obstacle.height)
    
    if (isCollision) {
      console.log("Is there a right collision?: ", isCollision)
      return true
    }
  }
  return false
}

/*Checks for collision between Mario's left hand side and obstacles - Comprueba colisión entre la izquierda de Mario y los obstáculos */
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

/*Checks for collision between Mario's feet hand side and obstacles - Comprueba colisión entre los pies de Mario y los obstáculos */
function isCollisionBelow(){
  for (let i = 0; i < GAME.obstacles.length; i++) {
    const obstacle = GAME.obstacles[i];
    let isCollision = 
      GAME.mario.posY < obstacle.posY + obstacle.height
      && GAME.mario.posY + GAME.mario.height > obstacle.posY
      && GAME.mario.posX < obstacle.posX + obstacle.width
      && GAME.mario.posX + GAME.mario.width > obstacle.posX;

    if (isCollision) {
      console.log("There is a below collision at:", obstacle.posY + obstacle.height);
      return obstacle.posY + obstacle.height;
    }
  }
  return false
}

/*Checks for collision between Mario's head hand side and obstacles - Comprueba colisión entre la cabeza de Mario y los obstáculos */
function isCollisionAbove(){
  for (let i = 0; i < GAME.obstacles.length; i++) {
    const obstacle = GAME.obstacles[i];

    let isCollision = 
      GAME.mario.posY + GAME.mario.height > obstacle.posY
      && obstacle.posY + obstacle.height > GAME.mario.posY
      && GAME.mario.posX < obstacle.posX + obstacle.width
      && GAME.mario.posX + GAME.mario.width > obstacle.posX;

    if (isCollision ) {
      if (obstacle.type === 'vitrina') {
        console.log('coge el cuadro')
      }
      console.log("There is a ABOVE collision at:", obstacle.posY);
      return obstacle.posY
    }
  }
  return false
}

/*Allows Mario to jump and stop once collision is detected on his head or feet - Permite saltar a Mario y detectar colisión en su cabeza y sus pies */
function fallDown(speed=100) {
  GAME.mario.jumping = true
  GAME.mario.jSpeed += speed
  let timerId = setInterval(function() {
    GAME.mario.posY += GAME.mario.jSpeed
    GAME.mario.jSpeed -= GAME.gravity

    // Moving Up
    if (GAME.mario.jSpeed >= 0) {
      let distCollission = isCollisionAbove()
      if (distCollission) {
        clearInterval(timerId)
        GAME.mario.jumping = false;
        GAME.mario.jSpeed = 0;
        GAME.mario.posY = distCollission - GAME.mario.height;
        console.log('moving up- collission detected')
        fallDown(0)
      }
    } 
    // Moving Down
    else {
      let distCollission = isCollisionBelow()
      if (distCollission) {
        clearInterval(timerId)
        GAME.mario.jumping = false;
        GAME.mario.jSpeed = 0;
        GAME.mario.posY = distCollission
        console.log('moving down- collission detected')
      } else {
        if (GAME.mario.posY < -50) {
          clearInterval(timerId)
          GAME.mario.jumping = false;
          alert('YOU LOST IN THE CRACKS')
        }
      }
    }

    updateMario()
  }, 50)
}

/*EventListeners to move Mario using arrow keys - EventListeners para mover a Mario usando las teclas de las flechas */
document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    GAME.mario.html.classList.remove('mario-left')
    
    if (!isCollisionRight()) { 
      if (GAME.mario.posX >= 500) {
        updateCloudsObstacles()
      } else {
        GAME.mario.posX += GAME.mario.movement
      }
    }
    if (!isCollisionBelow() && !GAME.mario.jumping) fallDown(0)

    console.log("Mario PosX", GAME.mario.posX)
    console.log("EmptyEasel PosX", GAME.obstacles[0].posX)
  }

  if (event.code === 'ArrowLeft') {
    GAME.mario.html.classList.add('mario-left')
    if (!isCollisionLeft()) {        
      GAME.mario.posX -= GAME.mario.movement
    }
    if (GAME.mario.posX <= 0) {
      GAME.mario.posX = 0
    }
    if (!isCollisionBelow() && !GAME.mario.jumping) fallDown(0)
  }

  if (event.code === 'ArrowUp') {
    console.log('mario jump');
    if (!GAME.mario.jumping) fallDown()
  }

  updateMario()
})

/* Initialise function that generates the elements - Inicializa la función que genera los elementos */
init()
