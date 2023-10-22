 import { GameObject } from "../interfaces/gameObject.interface"
import { Physics } from "../physics";
import { System } from "../interfaces/system.interface";
import { PhysicalBody } from "../physicalbody";
 
 export class PhysicalBodySystem implements System {
    physics:Physics = null;
    constructor(physics:Physics){
        this.physics = physics;
    }
    
    update(gameElement:GameObject,gameObjectArray:Array<GameObject>){
        

    }
    preparePhysicalBodyMap(gameObjectArray:Array<GameObject>){
        let physicalBodyArray:Array<PhysicalBody>;
     //   gameObjectArray.forEach
    }

    draw(){}
    
}