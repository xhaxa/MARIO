const GAME = {
  numClouds: 30,
  mario: {
    posX: 100,
    html: document.getElementById('mario')
  },
  clouds: []
}

const canvas = document.getElementById('canvas')

function updateMario() {
  GAME.mario.html.style.left = GAME.mario.posX + 'px'
}

function updateClouds() {
  GAME.clouds.forEach(function (cloud) {
    cloud.posX -= 30
    cloud.html.style.left = `${cloud.posX}px`
  })
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

function init() {
  cloudGeneration()
}

document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowRight') {
    GAME.mario.html.classList.remove('mario-left')
    if (GAME.mario.posX >= 600) {
      updateClouds()
    } else {
      GAME.mario.posX += 30
    }
  }
  if (event.code === 'ArrowLeft') {
    GAME.mario.posX -= 30
    GAME.mario.html.classList.add('mario-left')

  }
  updateMario()
})

init()
