
var OBSTACLES = [
  /*los obstáculos tendrán que estar posicionados en multiplos de 60 para que las 
  colisiones coincidan con el movimiento de Mario que se mueve de 60px en 60px*/
  {
    type: 'meta',
    posX: 7200,
    posY: 50,
    width: 233, 
    height: 350,
  },
  {
    type: 'tourists',
    posX: 720,
    posY: 50,
    width: 120,
    height: 130,
  },
  {
    type: 'tourists',
    posX: 1440,
    posY: 50,
    width: 120,
    height: 130,
  },
  {
    type: 'tourists',
    posX: 2880,
    posY: 50,
    width: 120,
    height: 130,
  },
  {
    type: 'tourists',
    posX: 3960,
    posY: 50,
    width: 120,
    height: 130,
  },
  {
    type: 'tourists',
    posX: 4680,
    posY: 50,
    width: 120,
    height: 130,
  },
  {
    type: 'tourists',
    posX: 6600,
    posY: 50,
    width: 120,
    height: 130,
  },
  {
    type: 'chandelier',
    posX: 1100,
    posY: 270,
    width: 120,
    height: 58,
  },
  {
    type: 'chandelier',
    posX: 2600,
    posY: 270,
    width: 120,
    height: 58,
  },
  {
    type: 'chandelier',
    posX: 3480,
    posY: 270,
    width: 120,
    height: 58,
  },
  {
    type: 'chandelier',
    posX: 5350,
    posY: 270,
    width: 120,
    height: 58,
  },
  {
    type: 'chandelier',
    posX: 6800,
    posY: 270,
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
    width: 1800,
    height: 50
  },
  /*{
    type: 'floor',
    posX: 480,
    posY: 0,
    width: 1000,
    height: 50
  },*/
  {
    type: 'floor',
    posX: 1920,
    posY: 0,
    width: 1680,
    height: 50
  },
  {
    type: 'floor',
    posX: 3720,
    posY: 0,
    width: 1800,
    height: 50
  },
  {
    type: 'floor',
    posX: 5640,
    posY: 0,
    width: 600,
    height: 50
  },
  {
    type: 'floor',
    posX: 6360,
    posY: 0,
    width: 3000,
    height: 50
  }
]

var PAINTINGS = [
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
]

var BARRIERS = [
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

var HOLES = [
{
  posY: 0,
  posX: 1800
},
{
  posY: 0,
  posX: 3600
},
{
  posY: 0,
  posX: 5520
},
{
  posY: 0,
  posX: 6240
}
]


var THIEFS = [
  {
    type: 'thief',
    posInit: 1135,
    posIncr: 48,
    posX: 660,
    posY: 50,
    width: 80,
    height: 85
  },
  {
    type: 'thief',
    posInit: 4360,
    posIncr: 48,
    posX: 660,
    posY: 50,
    width: 80,
    height: 85
  },
  {
    type: 'thief',
    posInit: 6960,
    posIncr: 48,
    posX: 660,
    posY: 50,
    width: 80,
    height: 85
  }
]

var COLLECTABLES = [
  {
    name: 'topRightCollectable',
    posX: 1712,
    posY: 256,
    width: 53, 
    height: 43,
  }, 
  {
    name: 'topLeftCollectable',
    posX: 3282,
    posY: 337,
    width: 53, 
    height: 43,
  },
  {
    name: 'bottomRightCollectable',
    posX: 3212,
    posY: 256,
    width: 53, 
    height: 43,
  },
  {
    name: 'bottomLeftCollectable',
    posX: 5012,
    posY: 216,
    width: 53, 
    height: 43,
  },
]
