import MovingDirection from "./MovingDirection.js";

/**
 * same as pacman.js
 */
export default class Clone {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentDirection = Math.floor(
            Math.random() * Object.keys(MovingDirection).length
        );

        this.cloneAnimationTimerDefault = 10; 
        this.cloneAnimationTimer = this.cloneAnimationTimerDefault;

        this.cloneRotation = 0; // rotate
        this.cloneImages = [];
        this.cloneImageIndex = 0;

        this.#loadCloneImages();
    }

    #loadCloneImages() {
        const cloneImage1 = new Image();
        cloneImage1.src = "image/pac0.png";

        const cloneImage2 = new Image();
        cloneImage2.src = "image/pac1.png";

        const cloneImage3 = new Image();
        cloneImage3.src = "image/pac2.png";

        const cloneImage4 = new Image();
        cloneImage4.src = "image/pac1.png";

        this.cloneImages = [cloneImage1, cloneImage2, cloneImage3, cloneImage4];
    }

    draw(ctx) {
        const size = this.tileSize / 2;

        ctx.save();
        ctx.translate(this.x + size, this.y + size); 
        ctx.rotate((this.cloneRotation * 90 * Math.PI) / 180);

        ctx.drawImage(
            this.cloneImages[this.cloneImageIndex],
            -size,
            -size,
            this.tileSize,
            this.tileSize
        );

        ctx.restore();
    }

    #animate() {
        this.cloneAnimationTimer--;
        if (this.cloneAnimationTimer === 0) {
            this.cloneAnimationTimer = this.cloneAnimationTimerDefault;
            this.cloneImageIndex++;
            if (this.cloneImageIndex >= this.cloneImages.length) {
                this.cloneImageIndex = 0; // animation loop 
            }
        }
    }

    move(enemies) {
        this.#animate();

        if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.currentDirection)) {
            switch (this.currentDirection) {
                case MovingDirection.up:
                    this.y -= this.velocity;
                    this.cloneRotation = 3;
                    break;
                case MovingDirection.down:
                    this.y += this.velocity;
                    this.cloneRotation = 1;
                    break;
                case MovingDirection.left:
                    this.x -= this.velocity;
                    this.cloneRotation = 2;
                    break;
                case MovingDirection.right:
                    this.x += this.velocity;
                    this.cloneRotation = 0;
                    break;
            }
        } else {
            this.currentDirection = Math.floor(
                Math.random() * Object.keys(MovingDirection).length
            );
        }

        this.tileMap.eatDot(this.x, this.y);
        this.#checkEnemyCollision(enemies);
    }

    #checkEnemyCollision(enemies) {
        const size = this.tileSize / 2;
        enemies.forEach((enemy, index) => {
            if (
                this.x < enemy.x + size &&
                this.x + size > enemy.x &&
                this.y < enemy.y + size &&
                this.y + size > enemy.y
            ) {
                if (enemy.isScared) {
                console.log("Enemy eaten by clone:", enemy);
                enemies.splice(index, 1); // delete enemy
                } else {
                console.log("Clone eaten by enemy:", this);
                this.tileMap.removeClone(this); // get eaten by the enemy
                }
            }
        });
    }
}
