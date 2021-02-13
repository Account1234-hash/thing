var Man, ManIdle, ManRun, ManDie, ManIdleReverse, ManRunReverse, ManDead, ManDuck, bohBohBot, bohBohBotAnim;
var ground, bohBoh, bohBohAnim, bohBohBullet, bohBohBulletImg, bohBohMech, bohBohMechAnim, bohBohKnight, bohBohKnightAnim;
var bohBohHorn, bohBohHornAnim, font, oliveUpgrade, oliveUpgradeImg, reStart, reStartAnim, bohBohSword, bohBohSwordAnim;
var GameState = 0, score = 0,tempScore = 0, sprint = 100, lifeBooster, lifeBoosterImg, extraLife = 0;
var bohBohGroup, oliveGroup, bohBohBotGroup, lifeGroup, thing, health = 100;; 

function preload() {
    ManIdle = loadAnimation("Sprites/Man/Idle/ManIdle1.png", "Sprites/Man/Idle/ManIdle1.png", "Sprites/Man/Idle/ManIdle2.png", "Sprites/Man/Idle/ManIdle2.png");
    ManRun = loadAnimation("Sprites/Man/Run/ManRun1.png", "Sprites/Man/Run/ManRun2.png", "Sprites/Man/Run/ManRun3.png");
    ManDead = loadAnimation("Sprites/Man/Dead/ManDead.png");
    ManDuck = loadAnimation("Sprites/Man/Run/ManRun3.png");
    bohBohAnim = loadAnimation("Sprites/BohBoh/BohBoh1.png", "Sprites/BohBoh/BohBoh2.png");
    bohBohBulletImg = loadImage("Sprites/BohBoh/BohBohBullet/BohBohBulletSmall.png");
    bohBohMechAnim = loadAnimation("Sprites/BohBohMech/BBM1.png", "Sprites/BohBohMech/BBM2.png", "Sprites/BohBohMech/BBM3.png", "Sprites/BohBohMech/BBM4.png", "Sprites/BohBohMech/BBM5.png", "Sprites/BohBohMech/BBM6.png", "Sprites/BohBohMech/BBM7.png", "Sprites/BohBohMech/BBM8.png", "Sprites/BohBohMech/BBM9.png", "Sprites/BohBohMech/BBM10.png");
    bohBohHornAnim = loadAnimation("Sprites/BohBohHorn/BBH1.png", "Sprites/BohBohHorn/BBH2.png", "Sprites/BohBohHorn/BBH3.png", "Sprites/BohBohHorn/BBH4.png", "Sprites/BohBohHorn/BBH5.png", "Sprites/BohBohHorn/BBH6.png", "Sprites/BohBohHorn/BBH7.png", "Sprites/BohBohHorn/BBH8.png", "Sprites/BohBohHorn/BBH9.png");
    font = loadFont("Bangers.ttf");
    oliveUpgradeImg = loadImage("Sprites/Upgrades/Olive.png");
    reStartAnim = loadAnimation("Sprites/Buttons/reStart1.png", "Sprites/Buttons/reStart1.png", "Sprites/Buttons/reStart2.png", "Sprites/Buttons/reStart2.png");
    bohBohBotAnim = loadAnimation("Sprites/BohBohBot/BBB1.png", "Sprites/BohBohBot/BBB1.png", "Sprites/BohBohBot/BBB2.png", "Sprites/BohBohBot/BBB2.png", "Sprites/BohBohBot/BBB3.png", "Sprites/BohBohBot/BBB3.png", "Sprites/BohBohBot/BBB4.png", "Sprites/BohBohBot/BBB4.png", "Sprites/BohBohBot/BBB5.png", "Sprites/BohBohBot/BBB5.png", "Sprites/BohBohBot/BBB6.png", "Sprites/BohBohBot/BBB6.png", "Sprites/BohBohBot/BBB7.png", "Sprites/BohBohBot/BBB7.png",);
    bohBohKnightAnim = loadAnimation("Sprites/BohBohKnight/BBK1.png", "Sprites/BohBohKnight/BBK2.png", "Sprites/BohBohKnight/BBK3.png", "Sprites/BohBohKnight/BBK4.png", "Sprites/BohBohKnight/BBK5.png");
    lifeBoosterImg = loadImage("Sprites/Upgrades/ExtraLife.png");
    bohBohSwordAnim = loadAnimation("Sprites/BohBohSword/BBS1.png", "Sprites/BohBohSword/BBS2.png");


}

function setup() {
    createCanvas(512,256);
    Man = createSprite(256, 170, 50, 50);
    Man.addAnimation("Idle", ManIdle);
    Man.addAnimation("Dead", ManDead);
    Man.addAnimation("Run", ManRun);
    Man.addAnimation("Duck", ManDuck);
    Man.changeAnimation("Idle");
    Man.setCollider("rectangle", 0, 0, Man.width-15, Man.height);
    ground = createSprite(256, 292, 600, 128);
    ground.shapeColor = rgb(28, 36, 29);
    bohBoh = createSprite(450, 212, 50, 50);
    bohBoh.addAnimation("bohBoh", bohBohAnim);
    bohBohGroup = createGroup();
    bohBohBotGroup = createGroup();
    oliveGroup = createGroup();
    reStart = createSprite(256, 88, 50, 50);
    reStart.addAnimation("Restart", reStartAnim);
    reStart.visible = false;
    reStart.depth = 5;
    lifeGroup = createGroup();
    thing = new Knight(256, 128, health);
    console.log("setupscore" + score);
}

function draw() {
    background(252, 186, 3);
    Man.collide(ground);
    if (GameState == 0) {
        Man.setCollider("rectangle", 0, 0, Man.width - 15, Man.height);
        Man.changeAnimation("Idle");
            Man.velocityY = Man.velocityY + 0.5;
        if (keyDown(RIGHT_ARROW)) {
            Man.changeAnimation("Run");
            Man.x = Man.x + 5;
        }
        else if (keyDown(LEFT_ARROW)) {
            Man.changeAnimation("Run");
            Man.x = Man.x - 5;
        }
        else if (keyDown(DOWN_ARROW)) {
            Man.velocityY = Man.velocityY + 4;
            Man.changeAnimation("Duck");
            Man.setCollider("rectangle", 0, -8, Man.width - 15, Man.height - 10);
        }
        else if (keyDown(UP_ARROW) && Man.y > 200) {
            Man.velocityY = -13;
            Man.changeAnimation("Idle");
        }
        else if (keyDown("space") && sprint > 0) {
            Man.velocityX = 5;
        }


        if (oliveGroup.isTouching(Man)) {
            bohBohGroup.destroyEach();
            oliveGroup.destroyEach();
        }

        if (lifeGroup.isTouching(Man)) {
            lifeGroup.destroyEach();
            extraLife = 1;
        }

        if (bohBohGroup.isTouching(Man) || bohBohBotGroup.isTouching(Man)) {
            GameState = 1;
        }
        thing.display(score);
        spawnOliveUpgrades();
        spawnBulletSmall();
        spawnMechs();
        spawnKnights();
        spawnSwords();
    }  
    if (GameState === 1) {
       
            bohBohGroup.setVelocityXEach(0);
            bohBohGroup.setVelocityYEach(0);
            oliveGroup.setVelocityXEach(0);
            bohBohBotGroup.setVelocityXEach(0);
            Man.velocityX = 0;
            Man.velocityY = 0;
            bohBohGroup.setLifetimeEach(-1);
            Man.changeAnimation("Dead");
            reStart.visible = true;
            if (score > tempScore) {
                tempScore = score;
            }
            if (mousePressedOver(reStart) || keyDown("enter")) {
                GameState = 0;
                bohBohGroup.destroyEach();
                oliveGroup.destroyEach();
                bohBohBotGroup.destroyEach();
                score = 0;
                Man.x = 257;
                Man.y = 200;
                reStart.visible = false;
            }
    } 

    fill(0);
    textFont(font);
    textAlign(CENTER);
    textSize(20);
    text("Score: " + Math.floor(score), 256, 40);
    text("HIGH Score: " + Math.floor(tempScore), 70, 40);
    console.log(score);
    drawSprites();
    
}

function spawnBulletSmall() {
    
    var rand = Math.round(random(1, 12));
    if (frameCount % (2 * rand) === 0) {
       
        switch (rand) {
            case 1:
                bohBohBullet = createSprite(512, 188, 5, 5);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityX = -4  ;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 2:
                bohBohBullet = createSprite(512, 208, 25, 25);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityX = -4  ;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 3:
                bohBohBullet = createSprite(512, 28, 25, 25);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityX = -4  ;
                bohBohBullet.velocityY = 4;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 4:
                bohBohBullet = createSprite(450, 28, 25, 25);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityX = -4  ;
                bohBohBullet.velocityY = 4;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 5:
                bohBohBullet = createSprite(400, 28, 25, 25);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityX = -4  ;
                bohBohBullet.velocityY = 4;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 6:
                bohBohBullet = createSprite(512, 128, 25, 25);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityX = -4  ;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 7:
                bohBohBullet = createSprite(512, 240, 25, 25);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityX = -4  ;
                bohBohBullet.velocityY = -4  ;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 8:
                bohBohBullet = createSprite(480, 240, 25, 25);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityX = -4  ;
                bohBohBullet.velocityY = -4  ;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 9:
                bohBohBullet = createSprite(460, 240, 25, 25);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityX = -4  ;
                bohBohBullet.velocityY = -4  ;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 10:
                bohBohBullet = createSprite(256, -10, 25, 25);
                bohBohBullet.addImage(bohBohBulletImg);
                bohBohBullet.velocityY = 4  ;
                bohBohBullet.lifeTime = 400;
                bohBohBullet.setCollider("rectangle", 0, 0, bohBohBullet.width - 12, bohBohBullet.height - 12);
                bohBohGroup.add(bohBohBullet);
                bohBohBullet.depth = 2;
                score++;
                break;
            case 11:
                bohBohMech = createSprite(512, 200, 50, 50);
                bohBohMech.addAnimation("BBM", bohBohMechAnim);
                bohBohMech.velocityX = -2 + score / 100;
                bohBohGroup.add(bohBohMech);
                bohBohMech.setCollider("rectangle", 0, 0, bohBohMech.width - 30, bohBohMech.height);
                score++;
                break;
            case 12:
                bohBohHorn = createSprite(512, 200, 50, 100);
                bohBohHorn.addAnimation("BBH", bohBohHornAnim);
                bohBohHorn.velocityX = -2 + score / 100;
                bohBohGroup.add(bohBohHorn);
                score++;
                break
        }
    }
}

function spawnOliveUpgrades() {
    if (score % 50 === 0 && score > 0) {
        oliveUpgrade = createSprite(512, 128, 10, 10);
        oliveUpgrade.addImage(oliveUpgradeImg);
        oliveUpgrade.velocityX = -2;
        oliveGroup.add(oliveUpgrade);
        score = score + 1;
    }
}

function spawnMechs() {
    if (score > 0 && score % 100 === 0 && score % 200 != 0) { 
        bohBohBot = createSprite(512, 170, 50, 50);
        bohBohBot.addAnimation("BBB", bohBohBotAnim);
        bohBohBot.velocityX = -3;
        bohBohBotGroup.add(bohBohBot);
        bohBohBot.setCollider("rectangle",0,10,60,100);
        score = score + 1;
    }
}

function spawnKnights() {
    if (score > 0 && score % 200 === 0) {
        bohBohKnight = createSprite(512, 170, 50, 50);
        bohBohKnight.addAnimation("BBK", bohBohKnightAnim);
        bohBohKnight.velocityX = -1;
        bohBohBotGroup.add(bohBohKnight);
        bohBohKnight.setCollider("rectangle", 0, 10, 60, 100);
        score = score + 1;
    }
}



function spawnSwords() {
    var swordRand = Math.floor(random(50,180));
    if (score > 50 && score % 10 === 0) {
        bohBohSword = createSprite(512, swordRand, 50, 50);
        bohBohSword.addAnimation("BBS", bohBohSwordAnim);
        bohBohSword.velocityX = -12;
        bohBohSword.depth = 3;
        bohBohBotGroup.add(bohBohSword);
        bohBohSword.setCollider("rectangle", 0, 0, 100, 10);
        if (score > 100) {
            bohBohSword = createSprite(512, swordRand + random(32, 100), 50, 50);
            bohBohSword.addAnimation("BBS", bohBohSwordAnim);
            bohBohSword.velocityX = -12;
            bohBohSword.depth = 3;
            bohBohBotGroup.add(bohBohSword);
            bohBohSword.setCollider("rectangle", 0, 0, 100, 10);
        }
        if (score > 150) {
            bohBohSword = createSprite(512, swordRand - random(32, 100), 50, 50);
            bohBohSword.addAnimation("BBS", bohBohSwordAnim);
            bohBohSword.velocityX = -12;
            bohBohSword.depth = 3;
            bohBohBotGroup.add(bohBohSword);
            bohBohSword.setCollider("rectangle", 0, 0, 100, 10);
        }
        score = score + 1;
    }
}