import { Effects } from "./effects";
import { PhysicalBody } from "./models/physicalBody.model";
import { Vector } from "./models/vector.model";
// TODO: Mage proper TS!!
export class Physics {
    G = 0.01;
    dt = 5;
    effects: Effects;

    constructor(config = {
        G: 0.01,
        dt: 5
    }) {
        this.G = config.G;
        this.dt = config.dt;
        this.effects = new Effects();
    }
    calculateDistance(objectA: PhysicalBody, objectB: PhysicalBody) {
        return [
            objectB.position[0] - objectA.position[0],
            objectB.position[1] - objectA.position[1]
        ];

    }
    calculateForce(objectA: PhysicalBody, objectB: PhysicalBody) {
        let distance = this.calculateDistance(objectA, objectB);
        let d = distance;
        let r = Math.sqrt(d[0] * d[0] + d[1] * d[1]);
        let forceFactor = (this.G * objectA.m * objectB.m);
        return [
            forceFactor * d[0] / (r * r),
            forceFactor * d[1] / (r * r)
        ];
    }
    calculateSpeed(objectA: PhysicalBody) {
        return [
            objectA.velocity[0] + (objectA.force[0] / objectA.m) * this.dt,
            objectA.velocity[1] + (objectA.force[1] / objectA.m) * this.dt,
        ];
    }
    calculatePosition(objectA: PhysicalBody) {
        return [
            this._calculatePosition(objectA.position[0], objectA.velocity[0], objectA.force[0]),
            this._calculatePosition(objectA.position[1], objectA.velocity[1], objectA.force[1])
        ];
    }

    _calculatePosition(x: number, v: number, f: number) {
        return x + v * this.dt + f * Math.pow(this.dt, 2) / 2;
    }

    vectorSum(a:Vector, b:Vector) {
        let sum = a.map((i, e) => i + b[e]);
        return a.map((i, e) => i + b[e]);
    }

    isCollision(objectA: PhysicalBody, objectB: PhysicalBody) {
        const distance = this.calculateDistance(objectA, objectB);
        let radius = objectA.r + objectB.r;
        return ((distance[0] * distance[0] +  distance[1] * distance[1])< radius * radius );
    }

    getCollisions(target: any, gameObjects: any) {
        const tb = target;
        let map = new Map();
        gameObjects.forEach((v: any,k: any) => {
            if (tb!=v && this.isCollision(tb,v)){
                map.set(k,v);
            }
        });
        return map;
    }

    getInRange(target: any,gameObjects: any,range: any){
        const tb = target;
        let map = new Map();
        gameObjects.forEach((v: PhysicalBody,k: number) => {
            if (tb!=v && this.inRange(tb,v,range)){
                map.set(k,v);
            }
        });
        return map;
    }


    inRange(objectA: PhysicalBody, objectB: PhysicalBody, range: number) {
        let totalRange = range+objectA.r+objectB.r;
        const rS = totalRange*totalRange;
        const distance = this.calculateDistance(objectA, objectB);
        return (distance[0] * distance[0] < rS) && (distance[1] * distance[1] < rS);
    }


    applyGravity(target: any, gameObjects: any) {
        let f = [0, 0];
        let tb = target;
        gameObjects.forEach((cellestial: any) => {
            if (cellestial != target) {
                let cb = cellestial;
                f = this.vectorSum(f, this.calculateForce(tb, cb));
            }
        });
        tb.force = f;
        let newPosition = this.calculatePosition(tb);
        let newVelocity = this.calculateSpeed(tb);
        tb.position = newPosition;
        tb.velocity = newVelocity;
    }

    applyNonElasticCollision(target: any, collider: any){
       let a = target;
       let b = collider;
       a.m>b.m && this.effects.collisionEffect(a,b);
    }

}

