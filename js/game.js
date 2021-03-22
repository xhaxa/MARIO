const canvas = document.getElementById('canvas')

for (var i = 0; i < 30; i++) {
  const cloud = document.createElement('div')
  cloud.classList.add('cloud')
  cloud.style.top = `${ Math.floor(Math.random()*200) + 30 }px`
  cloud.style.left = `${(i*200) + Math.floor((Math.random() * 100))}px`
  canvas.appendChild(cloud)
}
