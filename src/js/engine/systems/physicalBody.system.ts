
import { Config } from "../../game/config";
import { BaseSystem } from "../baseClasses/BaseSystem.class";
import { GameElement } from "../baseClasses/gameElement.class";
import { GameElementFactory } from "../factory/gameElement.factory";
import { MathHelper } from "../helpers/math.helper";
import { PhysicsHelper } from "../helpers/physics.helper";
import { stringIndexed } from "../interfaces/stringIndexed.interface";
import { PhysicsConfigModel } from "../models/PhysicsConfig.model";
import { PhysicalBody } from "../models/physicalBody.model";
import { Vector } from "../models/vector.model";


export class PhysicalBodySystem extends BaseSystem {
    config: PhysicsConfigModel=null;

    constructor() {
        super();
        this.handles = ["physicalBody"];
        this.config = Config.PhysicalBodySystem

    }
    update(element: GameElement, list: Array<GameElement>) {
        let gravity: Vector = [0, 0];
        const mass = element.get("m");
        const position = element.get("position").exportProps();
        const startVelocity = element.get("velocity").exportProps();
        const radius = element.get("r");
        list.forEach(neighbour => {
            if (element != neighbour) {
                const neighbourMass = neighbour.get("m");
                const neighbourPosition = neighbour.get("position").exportProps();
                const distance = MathHelper.calculateDistance(position, neighbourPosition);
                gravity = MathHelper.vectorSum(gravity,PhysicsHelper.gravity(mass, neighbourMass, distance,this.config.G));
            }
        });
        const velocity = PhysicsHelper.speed(startVelocity,gravity,mass,this.config.dt);
        const newPosition = PhysicsHelper.reposition(position,velocity,gravity,this.config.dt);
        let newElementBody:PhysicalBody ={
            position: newPosition,
            r: radius,
            m: mass,
            velocity: velocity,
            force: gravity
        }    
        console.log(newElementBody);    
        return GameElementFactory.build("physicalBody",newElementBody);
    }



    private processPhysics(focused: GameElement, neighbour: GameElement): GameElement {

        const updatedBody = focused.getRaw() as PhysicalBody;
        const neighbourBody = neighbour.getRaw() as PhysicalBody;
        const force = focused.get("force").exportProps();



        updatedBody.force = PhysicsHelper.calculateForce(updatedBody, neighbourBody, this.config);
        updatedBody.velocity = PhysicsHelper.calculateSpeed(updatedBody, this.config);
        updatedBody.position = PhysicsHelper.calculatePosition(updatedBody, this.config);
        return GameElementFactory.build("physicalBody", updatedBody);
    }


}