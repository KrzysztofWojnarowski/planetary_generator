import { MathHelper } from "./math.helper";
import { PhysicalBody } from "../models/physicalBody.model";
import { Vector } from "../models/vector.model";
import { PhysicsConfigModel } from "../models/PhysicsConfig.model";

export abstract class PhysicsHelper{

    static calculateForce(objectA: PhysicalBody, objectB: PhysicalBody,constObj:PhysicsConfigModel):Vector {
        let distance = MathHelper.calculateDistance(objectA.position, objectB.position);
  
        let d = distance;
        let r = Math.sqrt(d[0] * d[0] + d[1] * d[1]);
        let forceFactor = (constObj.G * objectA.m * objectB.m);
        return [
            forceFactor * d[0] / (r * r),
            forceFactor * d[1] / (r * r)
        ];
    }

    static calculateSpeed(objectA: PhysicalBody,config:PhysicsConfigModel):Vector {
        return [
            objectA.velocity[0] + (objectA.force[0] / objectA.m) * config.dt,
            objectA.velocity[1] + (objectA.force[1] / objectA.m) * config.dt,
        ];
    }
    static calculatePosition(objectA: PhysicalBody,config:PhysicsConfigModel) {
        return [
            PhysicsHelper._calculatePosition(objectA.position[0], objectA.velocity[0], objectA.force[0],config),
            PhysicsHelper._calculatePosition(objectA.position[1], objectA.velocity[1], objectA.force[1],config)
        ];
    }
    private static  _calculatePosition(x: number, v: number, f: number,config:PhysicsConfigModel) {
        return x + v * config.dt + f * Math.pow(config.dt, 2) / 2;
    }
}