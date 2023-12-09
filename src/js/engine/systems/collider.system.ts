import { BaseSystem } from "../baseClasses/BaseSystem.class";
import { GameElement } from "../baseClasses/gameElement.class";
import { stringIndexed } from "../interfaces/stringIndexed.interface";
import { PhysicalBody } from "../models/physicalBody.model"; 
import { MathHelper } from "../helpers/math.helper";
import { EventManager } from "../eventManager/eventManager";
import { Vector } from "../models/vector.model";
export  class ColliderSystem extends BaseSystem{
    static init(params: stringIndexed): void {
    
    }
    update(component: GameElement, localState:Array<GameElement>): GameElement {
       /* state.forEach(element=>{
            if(element.has("physicalBody") && ownerElement!=element){
                const bodyA:PhysicalBody = element.get("physicalBody").exportProps() as PhysicalBody;
                const bodyB:PhysicalBody = component.get("physicalBody").exportProps() as PhysicalBody;
                if (MathHelper.isColliding(bodyA.position as Vector,bodyB.position as Vector, bodyA.r+bodyB.r )){
                    EventManager.trigger("colided",element,{gameState:state});
                }
            }
        });*/
        return component;
    }

}