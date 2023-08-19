 export type SystemEvent = 
    "onMove" | 
    "onUpdate" |
    "onRemove" | 
    "onImagesReady"; 

export type EventList  = {
    [eventType in SystemEvent]: Array<(...args: any) => void>;
}

export class EventSystem {
    owner: any = null;
    
    constructor(owner?: any){
        this.owner = owner;
    }

    eventList: EventList = {
        "onMove":[],
        "onUpdate":[],
        "onRemove":[],
        "onImagesReady": []
    }
    
    addListener(event: SystemEvent, callback: () => void){
        this.eventList[event].push(callback);
    }
    
    triggerEvent(event: SystemEvent, source: any, params={}){
        console.log(event,params);
        this.eventList[event].forEach(elementCallback => {
            elementCallback(this.owner, source, params);
        });
    }
    
    registerEvent(eventName: SystemEvent){
        this.eventList[eventName] = [];
    }
    
    getRegisteredEvents(){
        return this.eventList;
    }
}