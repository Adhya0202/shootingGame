var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life=3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  redBubbleGroup = createGroup(); 
  blueBubbleGroup = createGroup();   
  
  
}

function draw() {
  background("#BDA297");

  heading = createElement("h1");
 scoreBoard = createElement("h1");

  //display Score and number of lifes
  scoreBoard.html("score= "+score)
  scoreBoard.style('color:red')
  scoreBoard.position(width-200,20)

  heading.html("life= "+life)
 heading.style('color:red')
heading.position(width-500,20)

  if(gameState===1){
    gun.y=mouseY  
  
    if(keyIsDown(RIGHT_ARROW)){
      shootBullet();
    }
    if(frameCount % 80 === 0){
      drawBlueBubble()
    }
    if(frameCount % 100 === 0){
      drawRedBubble()
    }
     
    if(bulletGroup.isTouching(blueBubbleGroup)){
      bulletGroup.destroyEach();
      blueBubble.changeImage ("blueBlast")
      blueBubble.lifetime = 20;
      blueBubble.velocityX = 0;
      handleBubbleCollision()
    }
    if(bulletGroup.isTouching(redBubbleGroup)){
     bulletGroup.destroyEach();
      redBubble.changeImage ("redBlast")
      redBubble.lifetime = 20;
      redBubble.velocityX = 0;
      
      handleBubbleCollision();
        
    if(blueBubbleGroup.isTouching(backBoard)){
      life-=1
      redBubbleGroup.distroyEach()
    }
    if(redBubbleGroup.isTouching(backBoard)){
      life-=1
      blueBubbleGroup.distroyEach();
    }
      }
    drawSprites();
   
  }
  if(life <= 0){
    gameState = 2
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      text: "Your score is -"+score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  
  }
}

function shootBullet(){
 bullet= createSprite(236,gun.y-35);
 bullet.lifetime = 50; 
 bullet.scale = 0.15
 bullet.addImage(bulletImg)
 bullet.velocityX = 40
 bulletGroup.add(bullet)
}
function drawBlueBubble(){
  blueBubble = createSprite(800,random(20,780),40,40);
 blueBubble.lifetime = 900; 
 blueBubble.scale = 0.1;
 blueBubble.addImage("blueBlast",blastImg)
 blueBubble.addImage("blueBubble",blueBubbleImg)
 blueBubble.changeImage ("blueBubble")
 blueBubble.velocityX = -8;
 blueBubbleGroup.add(blueBubble)
}

function drawRedBubble(){
  redBubble = createSprite(800,random(20,780),40,40);
 redBubble.lifetime = 900; 
 redBubble.scale = 0.1;
 redBubble.addImage ("redBlast",blastImg)
 redBubble.addImage ("redBubble",redBubbleImg)
 redBubble.changeImage ("redBubble")

 redBubble.velocityX = -8;
 redBubbleGroup.add(redBubble)
}
function handleBubbleCollision(){
  if(life > 0){
    score = score+1;
  }
}
function handleGameOver(){
  life = life-1
  redBubbleGroup.distroy()
}