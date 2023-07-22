export default class EventSystem{

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
    triggerEvent(event,source){
        this.eventList[event].forEach(element => {
            element(this.owner,source);
        });
    }
}