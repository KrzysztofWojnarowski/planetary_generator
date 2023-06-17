export default class Celestial {


    #planet = {};
    #sprite = {};
    #frame = 1;
    #frameCount = 1;
    #speed = 3;
    #tick = 0;
    #frameSize = [200,200];

    constructor(sprite, planet) {
        this.#planet = planet;
        this.#sprite = sprite;

    }

    setFrameSize(frameSize){
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
        let planet = this.#planet;
        context.save();
        context.translate(planet.x-planet.r, planet.y-planet.r);
        context.drawImage(image,
            dimension.x,
            dimension.y,
            dimension.w,
            dimension.h,
            0,
            0,
            planet.r*4,
            planet.r*4);
        context.restore();
    }
    getPlanet() {
        return this.#planet;
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

    setPlanet(planet) {
        this.#planet = planet;
    }
}