import { Implementation } from "./baseClasses/Implementation.class";
import { BaseSystem } from "./baseClasses/BaseSystem.class";
import { GameElement } from "./baseClasses/gameElement.class";
import { SystemRegistry } from "./registry/system.registry";
import { PhysicalBodySystem } from "./systems/physicalBody.system";
import { SpriteSystem } from "./baseSystems/sprite.system";
import { Config } from "../game/config";
import { SystemManager } from "./systemManager/system.manager";
import { StateManager } from "./stateManager/state.manager";

export class EngineNew {
    spriteSystem: SpriteSystem = null;
    physicalBodySystem: PhysicalBodySystem = null;
    static state: Array<GameElement> = [];

    constructor() {
        const config = new Config;
        SystemRegistry.forEach(systemName => {
            SystemManager.register(systemName);
        });
    }

    static importState(state: Array<GameElement>) {
        EngineNew.state = state;
    }

    update() {
        SystemManager.procesSystems(StateManager.exportState());
        SystemManager.processDelegates();
        SystemManager.flushDelegates();

    }

    draw(gameObjects: Array<any>) {

    }

    get(gameObject: any, constructorName: string) {
        return constructorName in gameObject;
    }

}