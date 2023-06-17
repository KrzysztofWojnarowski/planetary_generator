import Physics from "./physics";
import Effects from "./effects";


export default class EffectManager {

    #physics = {};
    #effects = {};

    constructor(physics, effects) {
        this.#effects = effects;
        this.#physics = physics;
    }


    applyCollision(a, b) {
        let colided = this.#physics.isCollision(a, b) && b.m > a.m;
        if (colided) {
            let momentum = this.#effects.collisionEffect(a, b);
            b.m = momentum.m;
            b.vx = momentum.v[0];
            b.vy = momentum.v[1];
            a.markForRemoval = true;
        }
        return [a, b];
    }
}