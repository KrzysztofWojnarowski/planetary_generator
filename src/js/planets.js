import Random from "lm_random/random";

export default class Planets {
    constructor() {
        this.rand = new Random();
        this.rand.seed(0.5);
        this.rand.warmUp();
    }

    prototypes = {
        star: {
            m: 0.5,
            dm: 0.3,
            r: 50,
            positionRadiusDelta: 100,
            speedDelta: 0.001
        },
        planet: {
            m: 0.00001,
            dm: 0.000009,
            r: 50,
            positionRadiusDelta: 800,
            speedDelta: 100

        }
    }

    spawnEmpty() {
        return {
            x: 0,
            y: 0,
            r: 0,
            m: 0,
            vx: 0,
            vy: 0
        }
    }

    #randomSign() {
        return this.rand.random() > 0.5 ? 1 : -1;
    }

    #deltaRandomized(delta) {
        return this.rand.random() * delta * this.#randomSign();
    }

    #buildBodyArray(type, count) {
        let system = [];
        for (let c = 0; c < count; c++) {
            system.push(this.generateformPrototype(type));
        }
        return system;
    }

    generateformPrototype(type) {
        let protoData = this.prototypes[type];
        let radiusDelta = protoData.positionRadiusDelta;
        let speedDelta = protoData.speedDelta;
        let rand = this.rand;
        let planet = this.spawnEmpty();
        planet.x = this.#deltaRandomized(radiusDelta);
        planet.y = this.#deltaRandomized(radiusDelta);
        planet.r = protoData.r;
        planet.vx = this.#deltaRandomized(speedDelta);
        planet.vy = this.#deltaRandomized(speedDelta);
        planet.m = protoData.m + Math.abs(this.#deltaRandomized(protoData.dm));
        return planet;
    }

    buildSystem(starsCount, planetsCount) {
        return {
            planets: this.#buildBodyArray("planet", planetsCount),
            stars: this.#buildBodyArray("star", starsCount)
        }
    }
}