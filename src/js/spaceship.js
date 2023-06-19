import PhysicalBody from "./physicalbody";
import spaceshiptypes from "./spaceshiptypes";

export default class SpaceShip {
    url = "assets/pngegg.png";
    #isLoaded = false;
    #image = {};
    #mesh = spaceshiptypes.bascicCrousier;
    position = [-300, 0];
    velocity = [0, 0];
    rotation = Math.PI / 2;
    force = 0;
    body = new PhysicalBody();
    throttle = 0;
    powerQuantum = 1e-37;


    constructor() {
        this.body.m = this.#mesh.m;
        this.body.x = this.position[0];
        this.body.y = this.position[1];
        this.body.r = this.#mesh.r;
        this.vx = 0;
        this.vy = 0;
    }

    getBody() {
        return this.body;
    }

    setBody(body) {
        this.body.fromObject(body);
    }

    load() {
        let url = this.url;
        return new Promise(resolve => {
            const image = new Image();
            image.addEventListener("load", (e) => {
                resolve(image);
            });
            image.src = url;
        });

    }
    isLoaded() {
        return this.#isLoaded;
    }
    getImage() {
        return this.#image;
    }
    setImage(image) {
        this.#image = image;
    }
    setLoaded(loaded) {
        this.#isLoaded = loaded;
    }

    draw(context) {
        context.save();
        const body = this.getBody();
        context.translate(body.x, body.y);
        context.rotate(this.rotation);
        let sprite = this.#mesh.sprite;
        let [x, y] = sprite.position;
        let [w, h] = sprite.sizeSource;
        let [dw, dh] = sprite.sizeDestination;

        context.drawImage(this.#image, x, y, w, h, -0.5 * dw, -0.5 * dh, dw, dh);
        context.restore();
    }
    //TODO - use sprite instead of this nasty hack
    getSprite() {
        return this;
    }

    throttleUp() {
        this.throttle=1;
    }

    throttleDown() {
        this.throttle=0;
    }

    decreaseThrottleTick(){
        this.throttle*=0.9;
    }

    //TODO: Come up with something more reasonable
    update(physics) {
        let throttleFactor = this.throttle * this.powerQuantum;
        this.body.fx += throttleFactor * Math.cos(this.rotation);
        this.body.fy += throttleFactor * Math.sin(this.rotation);
        let v = physics.calculateSpeed(this.getBody());
        this.body.vx = v[0];
        this.body.vy = v[1];
        let p = physics.calculatePosition(this.getBody());
        this.body.x = p[0];
        this.body.y = p[1];
        //this.decreaseThrottleTick();
        
        
    }

}