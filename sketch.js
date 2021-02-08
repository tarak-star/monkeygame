var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running

var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup

var score

var ground

var obstaclesGroup;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 400);
   monkey= createSprite(50,340,20,50);
   monkey.addAnimation("running",  monkey_running);
   monkey.scale = 0.1;

  ground = createSprite(300,380,800,20);
  obstaclesGroup = new Group();
  FoodGroup = new Group();
  score = 0
}


function draw() {
   background("white");
  text("Score: "+ score, 500,50);
   
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x <  200){
      ground.x =300;        
    }
   monkey.collide(ground);
  if (gameState===PLAY){
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    if (ground.x <  200){
      ground.x =300;        
    }
    if(keyDown("space") &&monkey.y >= 200) {
      monkey.velocityY = -12;
    }
    
   if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
      score=score+1;
   }
    spawnobstacle();
  spawnbanana();
    
  } else if (gameState === END) {
    
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    drawSprites();
}
function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var  obstacle = createSprite(600,100,40,10);
     obstacle.y = Math.round(random(332,333));
     obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
     obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
     
    
    //add each cloud to the group
    obstaclesGroup .add(obstacle);
  }
}
function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 250 === 0) {
    var  banana = createSprite(600,100,40,10);
     banana.y = Math.round(random(220,250));
     banana.addImage(bananaImage);
    banana.scale = 0.1;
     banana.velocityX = -3;
    
     //assign lifetime to the variable
   banana.lifetime = 200;
    
    //adjust the depth
     
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}



