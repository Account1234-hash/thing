class Knight {
    constructor(x, y, health) {
        this.x = x; 
        this.y = y;;
        this.health = health;
       
    }
  
    display(score) {
        var testGroup = createGroup();
            var knightAnim = loadAnimation("Sprites/BohBohKnight/BBK1.png", "Sprites/BohBohKnight/BBK2.png", "Sprites/BohBohKnight/BBK3.png", "Sprites/BohBohKnight/BBK4.png", "Sprites/BohBohKnight/BBK5.png");
        var test = createSprite(this.x, this.y + 1000, 20, 20);
        console.log("I have created a new Sprite");
       test.velocityX = -2;
        this.score = score;

        testGroup.add(test);
        if (this.score % 20 != 0) {
            test.lifeTime = 1;
        }
        else {
            test.lifeTime = 20;
            test.y = this.y;
        }
            test.addAnimation("TK", knightAnim);
        if (test.x < 100) {
            testGroup.destroyEach();
            console.log("I ");
        }
                

            this.health = this.health - 1;
        if (this.health === 0) {
            testGroup.destroyEach();
        }
    }

}