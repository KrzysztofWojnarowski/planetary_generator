import { GameElement } from "../baseClasses/gameElement.class";
import { stringIndexed } from "../interfaces/stringIndexed.interface";
import { EventStoreItem } from "./eventStoreItem.interface";
import { Event } from "./event.interface";
export abstract class EventManager {

    static eventStore: Array<EventStoreItem>=[];
    static eventQueue:Array<Event>=[];

    static trigger(eventType:string,trigger:GameElement,props:stringIndexed) {
        const event:Event = {
            name:eventType,
            trigger:trigger,
            params:props
        }
        EventManager.eventQueue.push(event);
     }
    static subscribe(event: EventStoreItem) {
        EventManager.eventStore.push(event);
    }
    
    static unsubscribe(event:EventStoreItem) {
        EventManager.eventStore.filter(tested=>tested!=event);
    }
    static getQueue(){
        return EventManager.eventQueue;
    }
    static addToStore(item:EventStoreItem){
        EventManager.eventStore.push(item);
    }
    static removeFromStore(item:EventStoreItem){
         EventManager.eventStore  = EventManager.eventStore.filter(element=>element!=item);

    }


}