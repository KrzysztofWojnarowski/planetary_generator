export class EventSystem{

    constructor(owner){
        this.owner = owner;
    }
    eventList ={
        "onMove":[],
        "onUpdate":[],
        "onRemove":[],
    }
    addListener(event,callback){
        this.eventList[event].push(callback);
    }
    triggerEvent(event,source,params={}){
        console.log(event,params);
        this.eventList[event].forEach(element => {
            element(this.owner,source,params);
        });
    }
    registerEvent(eventName){
        this.eventList[eventName] = [];
    }
    getRegisteredEvents(){
        return this.eventList;
    }
}