/*Play button Welcome Screen - Botón PLAY Pantalla de Bienvenida*/
const botonHTML = document.getElementById('playJuego');
botonHTML.onclick = function (){
  var pantallaInicio = document.getElementById('inicio');
  pantallaInicio.setAttribute('class', 'ocultar')
  audio.play()
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
  numClouds: 30,
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
  paintings: [...PAINTINGS].map(function(painting){
    return {...painting}
  }),
  barriers: [...BARRIERS].map(function(barrier){
    return {...barrier}
  }),
  holes: [...HOLES].map(function(hole){
    return {...hole}
  }),
  thiefs:   [...THIEFS].map(function(thief){
    return {...thief}
  }),
  obstacles: [...OBSTACLES].map(function(obstacle){
    return {...obstacle}
  }),
  collectables: [...COLLECTABLES].map(function(collectable){
    return {...collectable}
  }),
  gravity: 4,
  score: 0,
  maxScore: 4
}


function restartGame(){
  GAME.mario.posX = 60;
  GAME.mario.posY = 50;
  GAME.mario.jumping = false;
  GAME.mario.jSpeed = 0;
  GAME.score = 0;
  GAME.maxScore = 4;
  GAME.clouds = [];
  audio.play()
  GAME.paintings = [...PAINTINGS].map(function(painting){
    return {...painting}
  })
  
  GAME.barriers = [...BARRIERS].map(function(barrier){
    return {...barrier}
  })

  GAME.holes =  [...HOLES].map(function(hole){
    return {...hole}
  })

  GAME.thiefs =   [...THIEFS].map(function(thief){
    return {...thief}
  })

  GAME.obstacles = [...OBSTACLES].map(function(obstacle){
    return {...obstacle}
  })

  GAME.collectables = [...COLLECTABLES].map(function(collectable){
    return {...collectable}
  })
  updateScore()
  const divMuerte = document.getElementById('muerte');
  divMuerte.style.display = 'none';
  init()
}

function updateScore(){
  let scoreHTML = document.getElementById('number-picture');
  scoreHTML.innerText = `${GAME.score}/${GAME.maxScore}`
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
    cloudHTML.classList.add('blur')
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
    barrierHTML.classList.add('blur')
    barrierHTML.style.top  = `${ barrier.posY }px`
    barrierHTML.style.left = `${ barrier.posX }px`
    canvas.appendChild(barrierHTML)
    barrier.html = barrierHTML;
  })
}

function holeGeneration() {
  GAME.holes.forEach(function(hole) {
    const holeHTML = document.createElement('div')
    holeHTML.classList.add('hole')
    holeHTML.style.bottom  = `${ hole.posY }px`
    holeHTML.style.left = `${ hole.posX }px`
    canvas.appendChild(holeHTML)
    hole.html = holeHTML;
  })
}

function dead() {
  removeHtmlItems();
  timerId.forEach(function(timer){
    clearInterval(timer)
  })
  audio.pause()
  const divMuerte = document.getElementById('muerte');
  divMuerte.style.display = 'block';
}

function win(){
  removeHtmlItems();
  timerId.forEach(function(timer){
    clearInterval(timer)
  })
  const divWin = document.getElementById('win')
  divWin.style.display = 'block';
  const divWinText = document.getElementById('win-text')
  if (GAME.score === GAME.maxScore){
    divWinText.innerText = 'Well done! \n\n COMING SOON:'
  } else {
    divWinText.innerText = 'Well done but you missed some fragments! \n\n COMING SOON:'
  }
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
      if (obstacle.type === 'vitrina'){
        obstacleHTML.classList.add('hasCollectable')
      }
    obstacleHTML.style.left = `${ obstacle.posX }px`
    obstacleHTML.style.bottom = `${ obstacle.posY }px`
    obstacleHTML.style.width = `${ obstacle.width }px`
    obstacleHTML.style.height = `${ obstacle.height }px`
    canvas.appendChild(obstacleHTML)
    obstacle.html = obstacleHTML
  })  
}

function thiefsGeneration() {
  GAME.thiefs.forEach( function(thief) {
    const thiefHTML = document.createElement('div')
    thiefHTML.classList.add('thief')
    thiefHTML.style.left = `${ thief.posX }px`
    thiefHTML.style.bottom = `${ thief.posY }px`
    thiefHTML.style.width = `${ thief.width }px`
    thiefHTML.style.height = `${ thief.height }px`
    canvas.appendChild(thiefHTML)
    thief.html = thiefHTML
  })  
}
/*Generates the paintings according to the values given in the object GAME - Genera los cuadros de acuerdo a los valores asignados en el objeto GAME*/
function paintingsGeneration() {
  GAME.paintings.forEach( function(painting) {
    const paintingHTML = document.createElement('div')
    paintingHTML.classList.add(painting.name)
    paintingHTML.classList.add('blur')
    paintingHTML.style.left = `${ painting.posX }px`
    paintingHTML.style.bottom = `${ painting.posY }px`
    paintingHTML.style.width = `${ painting.width }px`
    paintingHTML.style.height = `${ painting.height }px`
    canvas.appendChild(paintingHTML)
    painting.html = paintingHTML
  })  
}

function collectablesGeneration() {
  GAME.collectables.forEach( function(collectable) {
    const collectableHTML = document.createElement('div')
    collectableHTML.classList.add(collectable.name)
    collectableHTML.style.left = `${ collectable.posX }px`
    collectableHTML.style.bottom = `${ collectable.posY }px`
    collectableHTML.style.width = `${ collectable.width }px`
    collectableHTML.style.height = `${ collectable.height }px`
    canvas.appendChild(collectableHTML)
    collectable.html = collectableHTML
  })  
}

function removeHtmlItems() {
  GAME.collectables.forEach( function(item) {
    item.html.remove()
  })

  GAME.obstacles.forEach( function(item) {
    item.html.remove()
  })

  GAME.paintings.forEach( function(item) {
    item.html.remove()
  })

  GAME.barriers.forEach( function(item) {
    item.html.remove()
  })

  GAME.thiefs.forEach( function(item) {
    item.html.remove()
  })

  GAME.holes.forEach( function(item) {
    item.html.remove()
  })

  GAME.clouds.forEach( function(item) {
    item.html.remove()
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

  GAME.holes.forEach(function(hole){
    hole.posX -= GAME.mario.width
    hole.html.style.left = `${hole.posX}px`
  })  

  GAME.thiefs.forEach(function(thief){
    thief.posInit -= GAME.mario.width
    thief.posX -= GAME.mario.width
  })

  GAME.collectables.forEach(function(collectable){
    collectable.posX -= GAME.mario.width
    collectable.html.style.left = `${collectable.posX}px`
  })
}


const timerId = [];
function enemyStartsMoving() {
  GAME.thiefs.forEach( function(malote, i) {
    malote.dir = 1
    timerId[i] = setInterval(function() {
      malote.posX += 5*malote.dir;
      malote.html.style.left = `${malote.posX}px`
      if (malote.posX > malote.posInit + malote.posIncr * 5){ 
        malote.posX = malote.posInit + malote.posIncr * 5
        malote.html.classList.add('mario-left')
        malote.dir *= -1
      }
      if ( malote.posX < malote.posInit - malote.posIncr * 5){
        malote.posX = malote.posInit - malote.posIncr * 5
        malote.html.classList.remove('mario-left')
        malote.dir *= -1
      }
      //if collision with Mario
      if (
        malote.posX < GAME.mario.posX + GAME.mario.width
        && malote.posX + malote.width > GAME.mario.posX
        && malote.posY + malote.height > GAME.mario.posY
        && malote.posY < GAME.mario.posY + GAME.mario.height
      ) {
        dead()
      }
    }, 50)
  })
}

/*Initialises the game by excecuting all the functions that generate elements - Inicializar el juego al ejecutir las funciones que generan los elementos*/
function init() {
  marioGeneration()
  cloudGeneration()
  obstacleGeneration()
  paintingsGeneration()
  barriersGeneration()
  thiefsGeneration()
  collectablesGeneration()
  enemyStartsMoving()
  holeGeneration()
}

/*Checks for collision between Mario's right hand side and obstacles - Comprueba colisión entre la derecha de Mario y los obstáculos */
function isCollisionRight() {
  for (let i = 0; i < GAME.obstacles.length; i++) {
    const obstacle = GAME.obstacles[i];
    isCollision = obstacle.posX === GAME.mario.posX + GAME.mario.width
      && GAME.mario.posY + GAME.mario.height > obstacle.posY
      && (GAME.mario.posY < obstacle.posY + obstacle.height)
    
    if (isCollision) {
      if (obstacle.type === 'meta') {
        win()
      }
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
      console.log(obstacle.html.classList); 
      if (obstacle.type === 'vitrina' && obstacle.html.classList.contains('hasCollectable')) {
        obstacle.html.classList.remove('hasCollectable')
        GAME.score++
        GAME.collectables.filter(function(collectable){
         return collectable.posX > obstacle.posX && collectable.posX < obstacle.posX + obstacle.width  
        })[0].html.remove()
        updateScore()
        console.log('coge el cuadro')
      }
      return obstacle.posY
    }
  }
  return false
}

/*Allows Mario to jump and stop once collision is detected on his head or feet - Permite saltar a Mario y detectar colisión en su cabeza y sus pies */
function fallDown(speed=50) {
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
      } else {
        if (GAME.mario.posY < -50) {
          clearInterval(timerId)
          GAME.mario.jumping = false;
          dead()
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
    if (!GAME.mario.jumping) fallDown()
  }
  updateMario()
})

let restartButton = document.getElementById ('restart-button')
restartButton.addEventListener('click', function(){
  restartGame()
})

document.getElementById('win-button').addEventListener('click', function(){
  if (GAME.score < GAME.maxScore){
    restartGame()
    const divWinText = document.getElementById('win');
    divWinText.style.display = 'none'
  } else {
    restartGame()
    const divWinText = document.getElementById('win')
    divWinText.style.display = 'none'
  }
})

/* Initialise function that generates the elements - Inicializa la función que genera los elementos */
init()
