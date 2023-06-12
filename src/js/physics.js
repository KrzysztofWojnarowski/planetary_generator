export default class Physics {
    G = 0.01;
    dt = 5;

    constructor(config = {
        G: 0.01,
        dt: 5
    }) {
        this.G = config.G;
        this.dt = config.dt;
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

    isCollision(objectA,objectB){
        const distance = this.calculateDistance(objectA,objectB);
        let radius = objectA.r+objectB.r;
        return distance[0]*distance[0]<radius*radius && distance[1]*distance[1]<radius*radius;
    }

}