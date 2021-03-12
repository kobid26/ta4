var b1,enemy;
var enemyGroup,bulletGroup,coinGroup,blastGroup,enemyBgroup;
var coinsCollected = 0;
var lives = 5;
distance = 0;
var bgSound;

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
	fire4 = loadImage("fire4.png")
	

	//sounds
	//bgSound = loadSound("imagesSounds/bgSound.mp3");
	//shootSound.loadSound("imagesSounds/shootSound.mp3");
	
}

function setup(){
	canvas = createCanvas(displayWidth, displayHeight);

bg = createSprite(500,+30,2000,2800);
bg.addImage(bg1)
bg.scale=5
bg.velocityY=(5 + distance / 100)

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



	
player = createSprite(930,900,20,20);
player.addImage(Jet1)


bulletGroup = new Group();
enemyGroup = new Group();
coinGroup = new Group();
blastGroup = new Group();
enemyBgroup = new Group();


}
function draw(){
	stroke("black");
	fill("black")
	textFont("chiller");
	textSize(16);
	text("Coins Collected = "+coinsCollected,200,200);
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
		//shootSound.play();
	}
	
	if (enemyGroup.isTouching(bulletGroup)){
		enemy.destroy();
		bulletGroup.destroyEach();
		fire = createSprite();
		fire.x = enemy.x
		fire.y=enemy.y
		fire.scale=2
		fire.velocityY = 5
		fire.addImage(fire4)
	}
	
	if (player.isTouching(coinGroup)){
		//coinGroup.destroyEach();
		coinsCollected = coinsCollected + 1 
	}
	/*if (player.isTouching(enemyBgroup)){
		lives = lives-1
		live5.visible=false
	}*/
	
	fill("black");
	textFont("chiller");
	textSize(20);
	distance = Math.ceil(frameCount / frameRate())
	stroke("red");
	fill("red");
	textSize(20);
	textFont("chiller")
	text("Your Lives => "+lives,300,200)
	spawnEnemy();
	spawnCoins();
	spawnBullets();
	drawSprites();
}
function spawnEnemy(){
	if (frameCount % 150 === 0){
		enemy = createSprite(500,100,20,20);
		enemy.x = Math.round(random(100,1910))
		enemy.scale=0.3
		enemy.addImage(Jet2);
		enemy.velocityY=5
		enemyGroup.add(enemy)
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
	}
}
function spawnBullets(){
	if (frameCount % 100 === 0){
		bullet = createSprite(500,100,20,20);
		bullet.x = player.x
		bullet.scale = 0.1
		bullet.velocityY = 15
		bullet.addImage(bullet2);
		enemyBgroup.add(bullet);
	}

}