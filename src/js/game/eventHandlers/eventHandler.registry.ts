import { EngineNew } from "../../engine/Engine.new";
import { GameElement } from "../../engine/baseClasses/gameElement.class"
import { stringIndexed } from "../../engine/interfaces/stringIndexed.interface"
export const eventHandlerRegistry:stringIndexed= {
    spaceshipColideHandler:(targetShip:GameElement,collisionSource:GameElement)=>{
        targetShip.shallBeRemoved = true;
    }
}