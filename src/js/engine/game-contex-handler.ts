import Engine from "./engine";
import { Entity } from "./entity";

export class GameContextHandler {
    engine: Engine = null;
    entity: Entity = null;
    contextMap: Map<any, any> = new Map();
    currentContext: string = '';

    constructor(engine: Engine) {
        this.entity = new Entity();
        this.engine = engine;
    }

    createNewContext() {
        return {
            system: [],
            physical: new Map(),
            animation: [],
            drawable: [],
            eventQueue: new Map()
        } as any;
    }
    
    applyContext(uuid: string) {
        this.currentContext = uuid;
        this.engine.store = this.contextMap.get(uuid);
    }


    getCurrentUUID(){
        return this.currentContext;
    }

    extractContext() {
        return this.engine.store;
    }

    // context is store from engine
    registerContext(uuid: string, context: any) {
        this.contextMap.set(uuid, context);
    }

    buildContextFromFunction(fn: any, keyboardHandler: any, UUID: string){
        fn(this.engine,keyboardHandler,UUID);
        return this.engine.store;
    }

}