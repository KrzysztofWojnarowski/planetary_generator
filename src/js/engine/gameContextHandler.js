import { Entity } from "./entity";

export default class GameContextHandler {
    constructor(engine) {
        this.entity = new Entity();
        this.contextMap = new Map();
        this.engine = engine;
        this.currentContext = "";

    }
    createNewContext() {
        return {
            system: [],
            physical: new Map(),
            animation: [],
            drawable: [],
            eventQueue: new Map()
        }
    }
    applyContext(uuid) {
        this.currentContext = uuid;
        this.engine.store = this.contextMap.get(uuid);
    }


    getCurrentUUID(){
        return this.currentContext;
    }

    extractContext() {
        return this.engine.store;
    }
    registerContext(uuid, context) {
        this.contextMap.set(uuid, context);
    }

    buildContextFromFunction(fn,keyboardHandler,UUID){
        fn(this.engine,keyboardHandler,UUID);
        return this.engine.store;
    }

}