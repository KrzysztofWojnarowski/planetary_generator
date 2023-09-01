import { Effects } from "./effects";
import { PhysicalBody } from "./physicalbody";

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
            objectB.x - objectA.x,
            objectB.y - objectA.y
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
            objectA.vx + (objectA.fx / objectA.m) * this.dt,
            objectA.vy + (objectA.fy / objectA.m) * this.dt,
        ];
    }
    calculatePosition(objectA: PhysicalBody) {
        return [
            this._calculatePosition(objectA.x, objectA.vx, objectA.fx),
            this._calculatePosition(objectA.y, objectA.vy, objectA.fy)
        ];
    }

    _calculatePosition(x: number, v: number, f: number) {
        return x + v * this.dt + f * Math.pow(this.dt, 2) / 2;
    }

    vectorSum(a:any, b: any) {
        let sum = a.map((i: number, e:number) => i + b[e]);
        return sum;
    }

    isCollision(objectA: PhysicalBody, objectB: PhysicalBody) {
        const distance = this.calculateDistance(objectA, objectB);
        let radius = objectA.r + objectB.r;
        return (distance[0] * distance[0] < radius * radius) && (distance[1] * distance[1] < radius * radius);
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
        tb.fx = f[0];
        tb.fy = f[1];
        let newPosition = this.calculatePosition(tb);
        let newVelocity = this.calculateSpeed(tb);
        tb.x = newPosition[0];
        tb.y = newPosition[1];
        tb.vx = newVelocity[0];
        tb.vy = newVelocity[1];
    }

    applyNonElasticCollision(target: any, collider: any){
       let a = target;
       let b = collider;
       a.m>b.m && this.effects.collisionEffect(a,b);
    }

}

