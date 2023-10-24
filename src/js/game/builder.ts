import SpaceShip from "./ingame-objects/spaceship";
import { ImageLoaderManager } from "../engine/image-loader-manager";
import { gameImages } from "./dataObjects/game-images";
import Background from "./background";
import CellestialImplementation from "../engine/implementation/cellestial.implementation";
import EntityImplementation from "../engine/implementation/entity.implementation";
import PhysicalBodyImplementation from "../engine/implementation/physicalBody.implementation";
import { SpriteImplementation } from "../engine/implementation/sprite.implementation";
import { RadarGauge } from "./gauges/radar-gauge";
import { radar } from "./dataObjects/radar";
import { SpaceMap } from "./gauges/space-map";
import Engine from "../engine/engine";
import { ImplementationRegistry } from "../engine/implementation/implementationRegistry";
import { stringIndexed } from "../engine/interfaces/stringIndexed.interface";
import { GameElement } from "../engine/baseClasses/gameElement.class";
import prebuild from "./dataObjects/prebuild";
import { spaceshiptypes } from "./dataObjects/spaceshiptypes";
import { gameElements } from "./dataObjects/game.elements";


export class Builder {
    buildAssets() {
        const loader = new ImageLoaderManager();
        loader.setAssetList(gameImages);
        loader.loadImages();
        return loader;
    }

    build(presets: any, engine: any) {
        const buildData = presets.cellestial;
        const cellestialInstance = new CellestialImplementation(
            new EntityImplementation(
                {
                    label: buildData.entity.label,
                    UUID: crypto.randomUUID()
                }),
            new PhysicalBodyImplementation(buildData.physicalBody),
            new SpriteImplementation(buildData.sprite)
        );
        engine.eventHandlingSystem.addListener("onCollided", () => cellestialInstance.markForRemoval = true);
        return cellestialInstance;
    }

    buildRadar(engine: any): RadarGauge {
        const radarInstance = new RadarGauge(radar, engine);
        radarInstance.setDrawable(radarInstance.getDrawable());
        radarInstance.useCamera(engine.camera);
        return radarInstance;

    }

    async buildBackground(background: Background) {
        const backgroundImage = await background.load()
        background.setImage(backgroundImage);
        background.setLoaded(true);
        return background;
    }

    buildShip() {
        let ship = new SpaceShip();
        ship.load().then((image: HTMLImageElement) => {
            ship.setImage(image);
            ship.setLoaded(true);
        });
        return ship;
    }
    buildSpaceMap(spaceMap: SpaceMap, engine: Engine) {
        engine.store.system.forEach(element => {
            if (typeof element.getBody == "function") {
                spaceMap.addToMap(element);
            }
        }
        )
    }

    buildGameElement(entityName:string,preset: stringIndexed) {
        let implementationProps: stringIndexed = []; 
            Object.keys(preset).forEach(propName => {
                implementationProps[propName] = new ImplementationRegistry[propName](preset[propName])
            }
            );
        return new GameElement(entityName, implementationProps);
    }
    buildExperimental(gameObjects:stringIndexed) {
        let gameState: Array<GameElement> = [];
        for (let i in gameObjects) {
            gameState.push(this.buildGameElement(i,gameObjects[i]));
        }        
        return gameState;
    }
}