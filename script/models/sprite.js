import Hitbox from "./hitbox.js";
import Vector2D from "./vector2d.js";
import Clock from './clock.js';

class Sprite extends Hitbox {
    image;
    spriteX;
    spriteY;
    spriteHeight;
    spriteWidth;
    maxSpriteX;
    maxSpriteY;
    velocity;

    constructor(spriteSheetSrc, square_width, square_height, nImagesX, nImagesY, 
        width, height, spawnX, spawnY) {
        super(spawnX, spawnY, width, height);
        this.image = new Image();
        this.image.src = spriteSheetSrc;
        this.spriteWidth = square_width;
        this.spriteHeight = square_height;

        this.spriteX = 0;
        this.spriteY = 0;
        this.maxSpriteX = nImagesX - 1;
        this.maxSpriteY = nImagesY - 1;
        this.clock = new Clock(120);

        this.position.x = spawnX;
        this.position.y = spawnY;
        this.velocity = new Vector2D(5, 0);
    }

    update() {
        this.clock.update();
        this.position.add(this.velocity);
        if (this.clock.tick()) {
            if (this.spriteX == this.maxSpriteX) {
                this.spriteY = (this.spriteY + 1) % this.maxSpriteY;
            }
            this.spriteX = (this.spriteX + 1) % this.maxSpriteX;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.spriteX * this.spriteWidth,
            this.spriteY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.position.x,
            ctx.canvas.clientHeight - this.position.y, this.width, this.height);
        super.draw(ctx);
    }

    collision(other) {
		console.log(other)
        if(this.intersection(new Vector2D(this.position.x + this.width , this.position.y), other) || 
        this.intersection(new Vector2D(this.position.x + this.width , this.position.y), other) ||
        this.intersection(new Vector2D(this.position.x + this.width , this.position.y - this.height), other) ||
        this.intersection(new Vector2D(this.position.x , this.position.y - this.height), other) 
        ){
            return true;
        }
        return false;
    }

    intersection(point , area){
        console.log(area)
        if(point.x <= area.position.x + area.width && point.x >= area.position.x
            && point.y <= area.position.y  + area.height && point.y <= area.position.y ){
                return true;
        }
        return false;
    }
}

export default Sprite;