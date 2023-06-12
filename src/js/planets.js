
export default class Planets {
    constructor(randomizer) {
        this.rand = randomizer;
    }

    prototypes = {
        star: {
            m: 50,
            dm: 0.0000000003,
            r: 20,
            positionRadiusDelta: 100,
            speedDelta: 0
        },
        planet: {
            m: 0.0001,
            dm: 0.09,
            r: 5,
            positionRadiusDelta: 200,
            speedDelta: 0.09

        },
        moon: {
            m: 0.00009,
            dm: 0.000007,
            r: 2,
            positionRadiusDelta: 200,
            speedDelta: 0.08

        }
    }

    spawnEmpty(type) {
        return {
            type: type,
            x: 0,
            y: 0,
            r: 0,
            m: 0,
            vx: 0,
            vy: 0,
            fx: 0,
            fy: 0
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
        let planet = this.spawnEmpty(type);
        planet.x = this.#deltaRandomized(radiusDelta);
        planet.y = this.#deltaRandomized(radiusDelta);
        planet.r = protoData.r;
        planet.vx = this.#deltaRandomized(speedDelta);
        planet.vy = this.#deltaRandomized(speedDelta);
        planet.m = protoData.m + Math.abs(this.#deltaRandomized(protoData.dm));
        return planet;
    }

    buildSystem(starsCount, planetsCount,moonCount=0) {
        let planets = this.#buildBodyArray("planet", planetsCount);
        let stars = this.#buildBodyArray("star", starsCount);
        let moons = this.#buildBodyArray("moon",moonCount);
        return planets.concat(stars).concat(moons);
    }
}