import EventSystem from "../../engine/eventSystem";
import Entity from "../../engine/entity";
import Explode from "./explode";

export default class Celestial {


    #body = {};
    #sprite = {};
    #frame = 1;
    #frameCount = 1;
    #speed = 3;
    #tick = 0;
    #frameSize = [200, 200];

    constructor(sprite, planet) {
        this.#body = planet;
        this.#sprite = sprite;
        this.entity = new Entity();

        this.eventSystem = new EventSystem(this);
        this.eventSystem.registerEvent("onCollided");
        this.eventSystem.addListener("onCollided", (f, e, g) => {
            // If this is a star, it's immune to collisions
            if (this.#body.type === "star") {
                return;
            }

            // If colliding with a star, only this planet explodes
            if (e && e.getBody() && e.getBody().type === "star") {
                let explosion = new Explode();
                const body = this.#body;
                explosion.sprite.setImage(g.loader.getGameImages().explosionSheet.getImage());
                explosion.animation.position = [
                    body.x, body.y
                ];
                explosion.animation.size = [200, 200];
                g.store.system.push(explosion);
                g.registerAnimation(explosion);
                
                // Only mark this planet for removal
                this.#body.markForRemoval = true;
                
                // Log the collision
                if (this.#body.label && e.getBody().label) {
                    console.log(`${this.#body.label} collided with ${e.getBody().label} and was destroyed`);
                }
            } else {
                // Regular planet-planet collision
                let explosion = new Explode();
                const body = this.#body;
                explosion.sprite.setImage(g.loader.getGameImages().explosionSheet.getImage());
                explosion.animation.position = [
                    body.x, body.y
                ];
                explosion.animation.size = [200, 200];
                g.store.system.push(explosion);
                g.registerAnimation(explosion);
                
                // Mark both planets for removal
                this.#body.markForRemoval = true;
                if (e && e.getBody()) {
                    e.getBody().markForRemoval = true;
                }
                
                // Log the collision
                if (this.#body.label && e && e.getBody() && e.getBody().label) {
                    console.log(`${this.#body.label} collided with ${e.getBody().label}`);
                }
            }
        });


    }

    setFrameSize(frameSize) {
        this.#frameSize = frameSize;
    }

    updateTick() {
        this.#tick++;
        if (this.#tick >= 1000000) {
            this.#tick = 0;
        }
    }

    draw(context) {

        this.updateTick();
        let image = this.#sprite.getImage();
        let frame = this.getNextFrame();
        let dimension = this.#sprite.getFrame(frame, this.#frameSize[0], this.#frameSize[1]);
        let planet = this.#body;
        context.save();
        context.drawImage(image,
            dimension.x,
            dimension.y,
            dimension.w,
            dimension.h,
            planet.x - 2 * planet.r,
            planet.y - 2 * planet.r,
            planet.r * 4,
            planet.r * 4);
        context.restore();
    }
    getBody() {
        return this.#body;
    }
    getSprite() {
        return this.#sprite;
    }
    getNextFrame() {
        if (this.#tick % this.#speed !== 0) return this.#frame;
        if (this.#frame < this.#frameCount) {
            this.#frame++;
        } else {
            this.#frame = 1;
        }
        return this.#frame;
    }
    setFrameCount(frameCount) {
        this.#frameCount = frameCount;
    }

    setBody(planet) {
        this.#body = planet;
    }
}