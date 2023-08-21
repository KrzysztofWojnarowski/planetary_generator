import { PhysicalBody } from "./physicalbody";

export class Effects {
    collisionEffect(objectA: PhysicalBody, objectB: PhysicalBody) {
        let m1 = objectA.m;
        let m2 = objectB.m;
        let v1 = [objectA.vx, objectA.vy];
        let v2 = [objectB.vx, objectB.vy];
        objectA.m = m1 + m2;
        const newMass = objectA.m;
        objectA.vx = (v1[0] * m1 + v2[0] * m2) / newMass;
        objectA.vy = (v2[1] * m1 + v2[1] * m2) / newMass;
    }
}