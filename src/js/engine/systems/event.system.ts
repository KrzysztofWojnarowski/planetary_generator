import { BaseSystem } from "../baseClasses/System.class";
import { stringIndexed } from "../interfaces/stringIndexed.interface";
import { EventDefinition } from "../interfaces/eventDefinition.interface";
import { GameElement } from "../baseClasses/gameElement.class";
import { EventManager } from "../eventManager/eventManager";
import { eventHandlerRegistry } from "../../game/eventHandlers/eventHandler.registry";
import { EventStoreItem } from "../eventManager/eventStoreItem.interface";
export abstract class EventSystem extends BaseSystem{
    static EventDefinitionArray = Array<EventDefinition>;
    static init(params: stringIndexed): void {
        
    }
    static update(component: GameElement, ownerElement: GameElement, state: GameElement[]): void {
        const eventQueue = EventManager.getQueue();
        console.log(EventManager);
    }
}