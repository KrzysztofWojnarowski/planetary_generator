import Physics from "./engine/physics";
import Effects from "./effects";


export default class EffectManager {

    #effects = {};

    constructor(physics, effects) {
        this.#effects = effects;
    }
    applyCollision(a, b) {
        let colided = b.m >= a.m;
        if (colided) {          
            let momentum = this.#effects.collisionEffect(a, b);
            b.m = momentum.m;
            b.vx = momentum.v[0];
            b.vy = momentum.v[1];
        }
        return [a, b];
    }
}