import { GameElement } from "./baseClasses/gameElement.class";
import { ImageLoader } from "./image-loader"
import { ImageLoaderManager } from "./image-loader-manager";
import { GameObject } from "./interfaces/gameObject.interface";
import { PhysicalBody } from "./physicalbody";
import { Physics } from "./physics";
import { PhysicalBodySystem } from "./systems/physicalBody.system";
import { SpriteSystem } from "./systems/sprite.system";

export class EngineNew {
    spriteSystem: SpriteSystem = null;
    physicalBodySystem: PhysicalBodySystem = null;
    static state: Array<GameElement> = [];

    constructor(physics: Physics) {
        this.spriteSystem = new SpriteSystem();
        this.physicalBodySystem = new PhysicalBodySystem(physics);

    }

    static importState(state: Array<GameElement>) {
        EngineNew.state = state;
    }



    update(gameObjectArray: Array<any>, loader: ImageLoaderManager, context: CanvasRenderingContext2D) {
        gameObjectArray.forEach(gameObject => {

            for (let property in gameObject) {
                const constructorName: string = gameObject[property].constructor.name;
                switch (constructorName) {
                    case "SpriteImplementation": {
                        const sprite = gameObject.getSprite();
                        this.spriteSystem.update(sprite);
                        break;

                    }
                    case "PhysicalBodyImplementation": {
                        this.physicalBodySystem.update(gameObject, gameObjectArray);
                        break;
                    }
                }
            }

        });
    }

    draw(gameObjects: Array<any>) {

    }

    get(gameObject: any, constructorName: string) {
        return constructorName in gameObject;
    }

}