var PLAY;
var END;
var gameState = PLAY;
var bow, arrow, scene;
var bowImage,
  arrowImage,
  green_balloonImage,
  red_balloonImage,
  pink_balloonImage,
  blue_balloonImage,
  backgroundImage;

var pinkBallonGroup, blueBallonGroup, greenBallonGroup, redBallonGroup;
var arrowGroup;
var score = 0;


function preload() {
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
}

function setup() {
  createCanvas(400, 400);
  
   //crea el fondo
  scene = createSprite(0, 0, 400, 400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5;

  //crea el arco para disparar las flechas
  bow = createSprite(380, 220, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 1;

  //crea grupos para los globos
  pinkBallonGroup = createGroup();
  blueBallonGroup = createGroup();
  greenBallonGroup = createGroup();
  redBallonGroup = createGroup();
  arrowGroup = createGroup();
  
  score = 0;
}

function draw() {
  background(0);
  //fondo en movimiento
  scene.velocityX = -3;
   
  
  redBallonGroup.depth = arrowGroup.depth
    arrowGroup.depth = redBallonGroup.depht + 1
  
  if(gameState === PLAY){
   
    if(redBallonGroup.isTouching(arrowGroup)){
      gameState = END;
    }
    
  }
  else if (gameState === END){
    
    redBallonGroup.setVelocityXEach(0);
  }

  if (scene.x < 0) {
    scene.x = scene.width / 2;
  }

  //arco en movimiento
  bow.y = World.mouseY;

  //suelta la flecha cuando se presione la tecla de barra espaciadora
  if (keyDown("space")) {
    createArrow();
  }
  
  

  
  

  //crea enemigos de forma continua
  var select_balloon = Math.round(random(1, 4));

  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }

  drawSprites();
  text("Puntuación: " + score, 300, 50);
  score = score + Math.round(getFrameRate()/60)
    
  
}

//crea las flechas para el arco
function createArrow() {
  var arrow = createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y = bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
  if(arrowGroup.isTouching(redBallonGroup)){  //si grupoDeFlechas toca al grupo    de globos rojos 
    redBallonGroup.destroyEach(); //destruye cada uno de los elementos del     grupoDeGlobosRojos
    arrowGroup.destroyEach(); //destruye cada uno de los elementos del grupoDeflechas
    score=score+1 //incrementa el score en 1 cada vez que es destruido un globo
  } else if (arrowGroup.isTouching(blueBallonGroup)){ //si grupoDeFlechas toca al grupo de globos azules
    blueBallonGroup.destroyEach(); //destruye cada uno de los elemntos del grupoDeGlobosAzules
    arrowGroup.destroyEach(); // destruye cada unp de los elementos del grupoDeFlechas
    score=score+2; //incrementar 2 punto cuando toque un globo azul
  } else if (arrowGroup.isTouching(greenBallonGroup)){ //si grupoDeFlechas toca un globo verde 
    greenBallonGroup.destroyEach(); //destruye cada uno de los elemntos del grupoDeFlechas
    arrowGroup.destroyEach(); //destruye cada uno de los elementos del grupoDeFlechas
    score=score+3; //incrementa 3 puntos cuando toque un globo verde
  } else if (arrowGroup.isTouching(pinkBallonGroup)){ //si grupoDeFlechas toca un globo rosa
    pinkBallonGroup.destroyEach(); //destruye cada uno de los elemntos del grupo de flechas
    arrowGroup.destroyEach(); //destruye cada uno de los elemntos del grupo de flechas
    score=score+4; //incrementa 4 puntos cuando toque un globo rosa
    
  }
}
function redBalloon() {
  var red = createSprite(0, Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redBallonGroup.add(red);
}

function blueBalloon() {
  var blue = createSprite(0, Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueBallonGroup.add(blue);
}

function greenBalloon() {
  var green = createSprite(0, Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenBallonGroup.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0, Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1;
  pinkBallonGroup.add(pink);
}
