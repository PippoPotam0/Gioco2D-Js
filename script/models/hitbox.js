// Hitbox.js
import Vector2D from "./vector2d.js";

class Hitbox {
    position;
    width;
    height;

    constructor(x, y, width, height) {
        this.position = new Vector2D(x, y);
        this.height = height;
        this.width = width;
    }
    
    draw(ctx) {

    }
}

export default Hitbox;
