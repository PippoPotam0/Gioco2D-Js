import Vector2D from './vector2d.js';
import Clock from './clock.js';
import conf from '../config.js';
import Sprite from './sprite.js';
import Fireball from './fireball.js';
import Hitbox from './hitbox.js';

class Player extends Hitbox {
    name;
    score;
    velocity; // e non speed, mi raccomando
    hp304;
    currentImageIndex;
    images;
    moving;
    update_timer;

    constructor(images_srcs, name) {
        super(50, conf.GROUND_Y,165,175)
        this.name = name;
        // importo le immagini dello sprite_sheet nel vettore di immagini
        this.images = [];
        for(let src of images_srcs) {
            let img = new Image();
            img.src = src;
            this.images.push(img);
        }
        //  inizialmente uso la prima immagine
        this.currentImageIndex = 0; 

        this.velocity = new Vector2D();
        this.velocity.set(0, 0);
        this.hp304 = 100;
        this.score = 0;
        this.moving = false;
        this.update_timer = new Clock(125);
        this.canJump = true;
        this.bullets = [];
    }

    jump() {
        if(this.canJump) {
            this.velocity.y = 32;
            //this.velocity.x = 10;
        }
        //  TODO: Fix double jump based on whatever ground collision
        // Not only ground
        if(this.position.y > conf.GROUND_Y) {
            this.canJump = false;
        }
    }

    drawHealthBar(ctx) {
        const maxHP = 100; // Massima quantità di HP
        const hp = this.hp304; // HP attuali del giocatore
        const barWidth = 100; // Larghezza della barra della vita
        const barHeight = 10; // Altezza della barra della vita
        const x = this.position.x; // Posizione X della barra della vita
        const y = ctx.canvas.clientHeight - this.position.y - 20; // Posizione Y della barra della vita, leggermente sopra il giocatore
    
        // Disegna la parte esterna della barra della vita (il bordo)
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, barWidth, barHeight);
    
        // Calcola la larghezza effettiva della barra della vita in base agli HP correnti
        let healthWidth = (hp / maxHP) * barWidth;
    
        // Scegli il colore in base alla quantità di HP rimasti
        let healthColor = 'green';
        if (hp < maxHP / 2) {
            healthColor = 'yellow';
        }
        if (hp < maxHP / 4) {
            healthColor = 'red';
        }
    
        // Disegna la parte interna della barra della vita (la parte colorata che rappresenta gli HP)
        ctx.fillStyle = healthColor;
        ctx.fillRect(x, y, healthWidth, barHeight);
    }
    
    

    shoot(ctx) {
        console.log("Shooting: " + ctx.canvas.clientHeight);
        console.log("y: " + this.position.y);

        let fireball = new Fireball(this.position.x + 75, this.position.y - 50);
        this.bullets.push(fireball);
    }

    draw(ctx) {
        ctx.drawImage(this.images[this.currentImageIndex], this.position.x, 
            ctx.canvas.clientHeight - this.position.y, 
            175, 175);
        ctx.font = "30px Verdana";
        ctx.fillStyle = "white";
        ctx.fillText(this.name, this.position.x + 50, (ctx.canvas.clientHeight - (this.position.y + 25)));
        this.bullets.forEach((b) => b.draw(ctx));
    
        this.drawHealthBar(ctx); // Disegna la barra della vita
    
        super.draw(ctx);
    }

    update() {
        this.position.add(this.velocity);
        this.moving = this.velocity.x != 0;
        this.update_timer.update();

        //  accelerazione gravitazionale se lascio la terra
        // if(this.position.y > conf.GROUND_Y) {
        //     this.velocity.y -= 1.2;
        // }
        this.velocity.y += -1.2;
        if(this.moving) {
            if(this.update_timer.tick()) {
                this.currentImageIndex += 1;
                this.currentImageIndex %= this.images.length;
            }
            
        }
        else {
            this.currentImageIndex = 0;
        }

        this.bullets.forEach((b) => b.update());
    }
}

export default Player;