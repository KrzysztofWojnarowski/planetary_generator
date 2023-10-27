import { Implementation } from "./baseClasses/Implementation.class";
import { BaseSystem } from "./baseClasses/System.class";
import { GameElement } from "./baseClasses/gameElement.class";
import { ImageLoaderManager } from "./image-loader-manager";
import { Physics } from "./physics";
import { SystemRegistry } from "./registry/system.registry";
import { PhysicalBodySystem } from "./systems/physicalBody.system";
import { SpriteSystem } from "./systems/sprite.system";
import { Config } from "../game/config";

export class EngineNew {
    spriteSystem: SpriteSystem = null;
    physicalBodySystem: PhysicalBodySystem = null;
    static state: Array<GameElement> = [];

    constructor() {
        const config = new Config;
        Object.keys(SystemRegistry).forEach(systemName => {
            try {
                SystemRegistry[systemName].init(config[systemName as keyof Config]);
            } catch {
                console.warn(`${systemName} is not a valid system - init method missing`);
            }
        });
    }

    static importState(state: Array<GameElement>) {
        EngineNew.state = state;
    }



    update(loader: ImageLoaderManager, context: CanvasRenderingContext2D) {
        EngineNew.state.forEach((element: GameElement) => {
            Object.keys(element.props).forEach(prop => {
                if (typeof SystemRegistry[element.props[prop].getHandler()] === "function") {

                    SystemRegistry[element.props[prop].getHandler()].update(element.props[prop], element, EngineNew.state);

                } else {
                    console.log(`This component has no system registered ${prop} `)
                }
            });
        });
        console.log(EngineNew.state);

    }

    draw(gameObjects: Array<any>) {

    }

    get(gameObject: any, constructorName: string) {
        return constructorName in gameObject;
    }

}