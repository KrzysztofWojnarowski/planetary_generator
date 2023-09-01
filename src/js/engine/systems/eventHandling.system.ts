import { EventModel } from "../models/event.model";

export default class EventHandlingSystem{

        
        events:Array<EventModel> = [];
        addListener(eventModel:EventModel){
            this.events.push(eventModel);
        }
        triggerEvent(eventName:string,owner:Object,params:Array<any>=[]){
            this.events.forEach(element => {
               if(element.name===eventName && owner === element.owner){
                element.handler([...params])
               }
            });
        }
       
        getRegisteredEvents():Array<EventModel>{
            return this.events;
        }
    
}