const GAME = {
  numClouds: 30,
  mario: {
    posX: 100,
    html: document.getElementById('mario')
  }
}

const canvas = document.getElementById('canvas')

function updateMario() {
  GAME.mario.html.style.left = GAME.mario.posX + 'px'
}

function cloudGeneration() {
  for (var i = 0; i < GAME.numClouds; i++) {
    const cloud = document.createElement('div')
    cloud.classList.add('cloud')
    cloud.style.top = `${ Math.floor(Math.random()*200) + 30 }px`
    cloud.style.left = `${(i*200) + Math.floor((Math.random() * 100))}px`
    canvas.appendChild(cloud)
  }
}

function init() {
  cloudGeneration()
}

document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    GAME.mario.posX += 30
    GAME.mario.html.classList.remove('mario-left')
  }
  if (event.code === 'ArrowLeft') {
    GAME.mario.posX -= 30
    GAME.mario.html.classList.add('mario-left')

  }
  updateMario()
})

init()
