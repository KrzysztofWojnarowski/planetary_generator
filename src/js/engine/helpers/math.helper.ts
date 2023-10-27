import { Vector } from "../models/vector.model";

export class MathHelper {

    static calculateDistance(objectA: Vector, objectB: Vector): Vector {
        return [
            objectB[0] - objectA[0],
            objectB[1] - objectA[1]
        ];
    }

    static vectorSum(a: Vector, b: Vector): Vector {
        return a.map((i, e) => i + b[e]);
    }
    static isColliding(positionA: Vector, positionB: Vector, collidedDistance: number | 0): Boolean {
        const distance = MathHelper.calculateDistance(positionA, positionB);
        return ((distance[0] * distance[0] + distance[1] * distance[1]) < Math.pow(collidedDistance, 2));
    }

    static inRange(positionA: Vector, positionB: Vector, range: number, collisionDistance: number | 0): Boolean {
        let totalRange = range + collisionDistance;
        const rS = Math.pow(totalRange, 2);
        const distance = MathHelper.calculateDistance(positionA, positionB);
        return (distance[0] * distance[0] < rS) && (distance[1] * distance[1] < rS);
    }

}