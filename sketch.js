var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;

var obstaclesGroup, obstacle1, obstacle2,
obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){

trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
trex_collided = loadAnimation("trex_collided.png");

groundImage = loadImage("ground2.png");

cloudImage = loadImage("cloud.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");

}

function setup() {

canvas =  createCanvas(displayWidth-20,displayHeight-20);

trex = createSprite(50,180,20,50);
trex.addAnimation("running", trex_running);
trex.scale = 0.5;

ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -4;

invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;

cloudsGroup = new Group();
obstaclesGroup = new Group();


}

function draw() {

background(0);

text("Score:"+ score , 500,50);

if (gameState === PLAY){

score = score + Math.round(frameCount/60);

if (ground.x < 0){
ground.x = ground.width/2;
}


if(keyDown("space") && trex.y>160) {
trex.velocityY = -15;
}

trex.velocityY = trex.velocityY + 0.8

if(obstaclesGroup.isTouching(trex)){
  gameState = END;

}

spawnClouds();

spawnObstacles(); 

}

else if(gameState === END){

trex.addAnimation("running",trex_collided);

obstaclesGroup.setLifetimeEach(-1);

cloudsGroup.setLifetimeEach(-1);

ground.velocityX = 0;

trex.velocityY = 0;

obstaclesGroup.setVelocityXEach(0);

cloudsGroup.setVelocityXEach(0);

}

camera.position.x = trex.x/2;

camera.position.y = displayHeight/4; 

trex.collide(invisibleGround);

drawSprites();
}






function spawnClouds() {

if (frameCount % 60 === 0) {

var cloud = createSprite(600,120,40,10);

cloud.y = Math.round(random(80,120));

cloud.addImage(cloudImage);

cloud.scale = 0.5;

cloud.velocityX = -3;

cloud.lifetime = 200;

cloud.depth = trex.depth;

trex.depth = trex.depth + 1;

cloudsGroup.add(cloud);

}

}

function spawnObstacles() {

if(frameCount % 60 === 0) {

var obstacle = createSprite(600,165,10,40);

obstacle.velocityX = -4;

var rand = Math.round(random(1,6));

switch(rand) {

case 1: obstacle.addImage(obstacle1);
break;

case 2: obstacle.addImage(obstacle2);
break;

case 3: obstacle.addImage(obstacle3);
break;

case 4: obstacle.addImage(obstacle4);
break;

case 5: obstacle.addImage(obstacle5);
break;

case 6: obstacle.addImage(obstacle6);
break;

default: break;

}

obstacle.scale = 0.5;

obstacle.lifetime = 300;

obstaclesGroup.add(obstacle);

}

}