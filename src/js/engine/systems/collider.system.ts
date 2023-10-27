import { BaseSystem } from "../baseClasses/System.class";
import { GameElement } from "../baseClasses/gameElement.class";
import { stringIndexed } from "../interfaces/stringIndexed.interface";
import { PhysicalBody } from "../models/physicalBody.model"; 
import { MathHelper } from "../helpers/math.helper";
import { EventManager } from "../eventManager/eventManager";
import { Vector } from "../models/vector.model";
export abstract class ColliderSystem extends BaseSystem{
    static init(params: stringIndexed): void {
        
    }
    static update(component: GameElement, ownerElement: GameElement, state: GameElement[]): void {
        state.forEach(element=>{
            if(BaseSystem.has(element,"physicalBody") && ownerElement!=element){
                const bodyA:PhysicalBody = element.get("physicalBody").exportProps() as PhysicalBody;
                const bodyB:PhysicalBody = component.get("physicalBody").exportProps() as PhysicalBody;
                if (MathHelper.isColliding(bodyA.position as Vector,bodyB.position as Vector, bodyA.r+bodyB.r )){
                    EventManager.trigger("colided",element,{gameState:state});
                }
            }
        });
    }

}