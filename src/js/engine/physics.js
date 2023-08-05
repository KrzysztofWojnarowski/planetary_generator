import Effects from "./effects";

export default class Physics {
    G = 0.01;
    dt = 5;

    constructor(config = {
        G: 0.01,
        dt: 5
    }) {
        this.G = config.G;
        this.dt = config.dt;
        this.effects = new Effects();
    }
    calculateDistance(objectA, objectB) {
        return [
            objectB.x - objectA.x,
            objectB.y - objectA.y
        ];

    }
    calculateForce(objectA, objectB) {
        let distance = this.calculateDistance(objectA, objectB);
        let d = distance;
        let r = Math.sqrt(d[0] * d[0] + d[1] * d[1]);
        let forceFactor = (this.G * objectA.m * objectB.m);
        return [
            forceFactor * d[0] / (r * r),
            forceFactor * d[1] / (r * r)
        ];
    }
    calculateSpeed(objectA) {
        return [
            objectA.vx + (objectA.fx / objectA.m) * this.dt,
            objectA.vy + (objectA.fy / objectA.m) * this.dt,
        ];
    }
    calculatePosition(objectA) {
        return [
            this.#calculatePosition(objectA.x, objectA.vx, objectA.fx),
            this.#calculatePosition(objectA.y, objectA.vy, objectA.fy)
        ];
    }

    #calculatePosition(x, v, f) {
        return x + v * this.dt + f * Math.pow(this.dt, 2) / 2;
    }

    vectorSum(a, b) {
        let sum = a.map((i, e) => i + b[e]);
        return a.map((i, e) => i + b[e]);
    }

    isCollision(objectA, objectB) {
        const distance = this.calculateDistance(objectA, objectB);
        let radius = objectA.r + objectB.r;
        return (distance[0] * distance[0] < radius * radius) && (distance[1] * distance[1] < radius * radius);
    }

    getCollisions(target, gameObjects) {
        const tb = target;
        let map = new Map();
        gameObjects.forEach((v,k) => {
            if (tb!=v && this.isCollision(tb,v)){
                map.set(k,v);
            }
        });
        return map;
    }


    applyGravity(target, gameObjects) {
        let f = [0, 0];
        let tb = target;
        gameObjects.forEach(cellestial => {
            if (cellestial != target) {
                let cb = cellestial;
                f = this.vectorSum(f, this.calculateForce(tb, cb));
            }
        });
        tb.fx = f[0];
        tb.fy = f[1];
        let newPosition = this.calculatePosition(tb);
        let newVelocity = this.calculateSpeed(tb);
        tb.x = newPosition[0];
        tb.y = newPosition[1];
        tb.vx = newVelocity[0];
        tb.vy = newVelocity[1];
    }

    applyNonElasticCollision(target,collider){
       let a = target;
       let b = collider;
       a.m>b.m && this.effects.collisionEffect(a,b);
    }

}

