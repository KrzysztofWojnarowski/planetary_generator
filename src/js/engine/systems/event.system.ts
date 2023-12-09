import { BaseSystem } from "../baseClasses/BaseSystem.class";
import { stringIndexed } from "../interfaces/stringIndexed.interface";
import { EventDefinition } from "../interfaces/eventDefinition.interface";
import { GameElement } from "../baseClasses/gameElement.class";
import { EventManager } from "../eventManager/eventManager";
import { eventHandlerRegistry } from "../../game/eventHandlers/eventHandler.registry";
import { EventStoreItem } from "../eventManager/eventStoreItem.interface";
export  class EventSystem extends BaseSystem{
    constructor(){
        super();
        this.handles = ["eventListener"];
    }
   

    static EventDefinitionArray = Array<EventDefinition>;
    static init(params: stringIndexed): void {
        
    }
    static update(component: GameElement,localState:Array<GameElement>): void {
        const eventQueue = EventManager.getQueue();
    }
}