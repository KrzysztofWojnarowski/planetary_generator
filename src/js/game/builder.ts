import SpaceShip from "./ingame-objects/spaceship";
import { ImageLoaderManager } from "../engine/image-loader-manager";
import { gameImages } from "./dataObjects/game-images";
import Background from "./background";
import CellestialImplementation from "../engine/implementation/cellestial.implementation";
import { EntityImplementation } from "../engine/implementation/entity.implementation";
import PhysicalBodyImplementation from "../engine/implementation/physicalBody.implementation";
import { SpriteImplementation } from "../engine/implementation/sprite.implementation";
import { RadarGauge } from "./gauges/radar-gauge";
import { radar } from "./dataObjects/radar";
import { SpaceMap } from "./gauges/space-map";
import Engine from "../engine/engine";
import { stringIndexed } from "../engine/interfaces/stringIndexed.interface";
import { GameElement } from "../engine/baseClasses/gameElement.class";
import { BaseSystem } from "../engine/baseClasses/System.class";
import { EventManager } from "../engine/eventManager/eventManager";
import { EventStoreItem } from "../engine/eventManager/eventStoreItem.interface";
import { eventHandlerRegistry } from "./eventHandlers/eventHandler.registry";


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

    buildGameElement(entityName: string, preset: stringIndexed) {
        let implementationProps: stringIndexed = [];
        Object.keys(preset).forEach(propName => {
            implementationProps[propName] = new GameElement(propName, preset[propName]);
        });
        const element = new GameElement(entityName, implementationProps);
        this.subscribeToEvents(element);
        return element;
    }

    subscribeToEvents(element: GameElement) {
        if (BaseSystem.has(element, "eventListener")) {
            const eventBaseData = element.get("eventListener").exportProps() as Array<stringIndexed>;       
              eventBaseData.forEach(event=>{
                    const eventStoreItem:EventStoreItem = {
                        type:event.event,
                        emiterID:event.emiterID||"",
                        emiterGroup:event.emiterGroup||"",
                        subscriber:element,
                        handler:eventHandlerRegistry[event.handler]
                    }   
                 EventManager.subscribe(eventStoreItem);
                });
        }
    }

    buildExperimental(gameObjects: stringIndexed) {
        let gameState: Array<GameElement> = [];
        for (let i in gameObjects) {
            gameState.push(this.buildGameElement(i, gameObjects[i]));
        }
        return gameState;
    }
}