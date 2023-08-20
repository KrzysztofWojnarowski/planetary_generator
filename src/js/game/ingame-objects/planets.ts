export class Planets {
    private rand: Randomizer;

    private prototypes = {
        star: {
            m: 50,
            dm: 0.0000000003,
            r: 20,
            positionRadiusDelta: 100,
            speedDelta: 0,
        },
        planet: {
            m: 0.01,
            dm: 0.09,
            r: 5,
            positionRadiusDelta: 200,
            speedDelta: 0.05,
        },
        moon: {
            m: 0.00009,
            dm: 0.000007,
            r: 2,
            positionRadiusDelta: 200,
            speedDelta: 0.0008,
        },
    };

    constructor(randomizer: Randomizer) {
        this.rand = randomizer;
    }

    private spawnEmpty(type: string): Body {
        return {
            type: type,
            x: 0,
            y: 0,
            r: 0,
            m: 0,
            vx: 0,
            vy: 0,
            fx: 0,
            fy: 0,
        };
    }

    private randomSign(): number {
        return this.rand.random() > 0.5 ? 1 : -1;
    }

    private deltaRandomized(delta: number): number {
        return this.rand.random() * delta * this.randomSign();
    }

    private buildBodyArray(type: keyof typeof this.prototypes, count: number): Body[] {
        const system: Body[] = [];
        for (let c = 0; c < count; c++) {
            system.push(this.generateFromPrototype(type));
        }
        return system;
    }

    private generateFromPrototype(type: keyof typeof this.prototypes): Body {
        const protoData = this.prototypes[type];
        const radiusDelta = protoData.positionRadiusDelta;
        const speedDelta = protoData.speedDelta;
        const planet = this.spawnEmpty(type);
        planet.x = this.deltaRandomized(radiusDelta);
        planet.y = this.deltaRandomized(radiusDelta);
        planet.r = protoData.r;
        planet.vx = this.deltaRandomized(speedDelta);
        planet.vy = this.deltaRandomized(speedDelta);
        planet.m = protoData.m + Math.abs(this.deltaRandomized(protoData.dm));
        return planet;
    }

    public buildSystem(
        starsCount: number,
        planetsCount: number,
        moonCount: number = 0
    ): Body[] {
        const planets = this.buildBodyArray("planet", planetsCount);
        const stars = this.buildBodyArray("star", starsCount);
        const moons = this.buildBodyArray("moon", moonCount);
        return planets.concat(stars).concat(moons);
    }
}

interface Body {
    type: string;
    x: number;
    y: number;
    r: number;
    m: number;
    vx: number;
    vy: number;
    fx: number;
    fy: number;
}

interface Randomizer {
    random(): number;
}
