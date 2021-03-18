var b1,enemy;
var enemyGroup,bulletGroup,coinGroup,blastGroup,enemyBgroup;
var coinsCollected = 0;
var hearts = 5;
var bgSound1;
var shootSound1;
var night
var jetsDestroyed = 0
var PLAY = 1
var END = 0
var gameState = PLAY;
//Function load the images 
function preload(){

	//Loading Images And Sounds

	//images
	bg1 = loadImage("imagesSounds/bg4.png");
	Jet1 = loadImage("imagesSounds/ourJet.png");
	Jet2 = loadImage("imagesSounds/eneJet.png");
	bullet1 = loadImage("imagesSounds/ourBullet.png");
	bullet2 = loadImage("imagesSounds/oppBullet.png");
	plives = loadImage("imagesSounds/lives.png");
	gameOverimg = loadImage("imagesSounds/gameOver.png");
	coinImg = loadImage("imagesSounds/coin.png");
	fire4 = loadImage("fire4.png");
	night1 = loadImage("imagesSounds/night.jpg");
	storm = loadImage("imagesSounds/stormybg.jpg");
	cloud = loadImage("imagesSounds/cloudybg.jpg");
	f1 = loadImage("fire1.png");
	f2 = loadImage("fire2.png");
	f3 = loadImage("fire3.png")

	
	//bgSound1 = loadSound("imagesSounds/bgSound.mp3");
	//shootSound1 = loadSound("imagesSounds/shootSound.mp3");
	
}

function setup(){
	canvas = createCanvas(displayWidth, 1000);

bg = createSprite(500,+30,2000,2800);
bg.addImage(bg1)
bg.scale=5
bg.velocityY=5

edge1 = createSprite(10,230,80,1700);
edge1.shapeColor="darkblue";
//edge1.visible=false;
edge2 = createSprite(1910,230,80,1700);
edge2.shapeColor="darkblue";
//edge2.visible = false;

live1 = createSprite(200,100,30,30);
live1.addImage(plives)
live1.scale=0.1
live2 = createSprite(270,100,30,30);
live2.addImage(plives)
live2.scale=0.1
live3 = createSprite(340,100,30,30);
live3.addImage(plives)
live3.scale=0.1
live4 = createSprite(410,100,30,30);
live4.addImage(plives)
live4.scale=0.1
live5 = createSprite(480,100,30,30);
live5.addImage(plives)
live5.scale=0.1

gameOver = createSprite(1000,500,50,50);
gameOver.addImage(gameOverimg);
gameOver.scale = 0.3
gameOver.visible = false;

	
player = createSprite(930,900,20,20);
player.addImage(Jet1)


bulletGroup = new Group();
enemyGroup = new Group();
coinGroup = new Group();
blastGroup = new Group();
enemyBgroup = new Group();


}
function draw(){
	if (gameState === PLAY){
		spawnEnemy();
		spawnCoins();
		spawnBullets();
		differentBg();
	//bgSound1.play();
	
	//gameOver.visible = false;
	background(bg1);
	player.collide(edge1);
	player.collide(edge2);
	if (bg.y > 800){
		bg.y=0
		
	}
	if (keyDown("right")){
		player.velocityX=15
	}
	if (keyDown("left")){
		player.velocityX=-15
	}
	
	if(keyDown("space")){
		b1 = createSprite(0,850,20,20);
		b1.x = player.x
		b1.addImage(bullet1);
		b1.velocityY=-15
		b1.scale=0.15
		bulletGroup.add(b1)
		//shootSound1.play();
	}
	
	
	
	if (enemyGroup.isTouching(bulletGroup)){
		enemy.destroy();
		bulletGroup.destroyEach();
		jetsDestroyed = jetsDestroyed + 1
		fire = createSprite();
		fire.x = enemy.x
		fire.y=enemy.y
		fire.scale=2
		fire.velocityY = 5
		fire.addImage(fire4)
		
	}
	
	if (player.isTouching(coinGroup)){
		coinGroup.destroyEach();
		coinsCollected = coinsCollected + 1 
	}
	if (player.isTouching(enemyBgroup)){
		hearts = hearts -1
		enemyBgroup.destroyEach();
		
	}
	
	if (hearts === 4){
		live5.visible = false;
	}
	if (hearts === 3){
		live4.visible = false;
	}
	if (hearts === 2){
		live3.visible = false;
		
	}
	if (hearts === 1){
		live2.visible = false;
		
	}
	if (hearts === 0){
		live1.visible = false;
		gameState = END;
		
	}
	
} else if (gameState === END){

	bg.velocityY = 0
	bulletGroup.destroyEach();
	enemyBgroup.destroyEach();
	coinGroup.destroyEach();
	enemyGroup.destroyEach();
	gameOver.visible = true;
	player.velocityX = 0
	
	
   
}
if (keyDown("r") && gameState === END){
	bg.velocityY=5
	gameState = PLAY
	gameOver.visible = false;
	live1.visible = true;
	live2.visible = true;
	live3.visible = true;
	live4.visible = true;
	live5.visible = true;
	hearts = 5
	jetsDestroyed = 0
	coinsCollected = 0
}


	
	drawSprites();

	
	stroke("red");
	fill("red");
	textSize(40);
	textFont("chiller")
	text("Your Lives => "+hearts,200,200);

	text("Coins Collected => "+coinsCollected,200,240);
	

	text("Jets Destroyed => "+jetsDestroyed,200,280);
	fill("red");
	stroke("red")
	textFont("chiller");
	textSize(48);
	
	text("Press R to restart the game",200,320)
	
}
function spawnEnemy(){
	if (frameCount % 150 === 0){
		enemy = createSprite(500,100,20,20);
		enemy.x = Math.round(random(100,1910))
		enemy.scale=0.3
		enemy.addImage(Jet2);
		enemy.velocityY=5
		enemyGroup.add(enemy)
		enemy.setLifetime = 1200
	}
}
function spawnCoins(){
	if (frameCount % 100 === 0 ){
		coin1 = createSprite(500,100,20,20);
		coin1.scale=0.3
		coin1.x = Math.round(random(100,1910))
		coin1.addImage(coinImg);
		coin1.velocityY = 3
		coinGroup.add(coin1);
		coin1.setLifetime = 1200
	}
}
function spawnBullets(){
	if (frameCount % 40 === 0){
		bullet = createSprite(500,100,20,20);
		bullet.x = player.x
		bullet.scale = 0.1
		bullet.velocityY = 15
		bullet.addImage(bullet2);
		enemyBgroup.add(bullet);
		bullet.setLifetime = 1200
	}

}
function differentBg(){
	if (frameCount % 200 === 0){
	 var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        bg.addImage(night1);
        break;
      case 2:
        bg.addImage(storm);
        break;
      case 3:
        bg.addImage(cloud)
        break;
      case 4:
        bg.addImage(bg1);
        break;
      default:
        break;
	}


    }
}