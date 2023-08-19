import { EventSystem } from "../../engine/eventSystem";
import { Entity } from "../../engine/entity";

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
        this.eventSystem.addListener("onCollided", (f, e) => {
            this.#body.markForRemoval = this.#body.m < e.getBody().m;
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