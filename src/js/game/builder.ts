import SpaceShip from "./ingame-objects/spaceship";
import { ImageLoaderManager } from "../engine/image-loader-manager";
import { gameImages } from "./game-images";
import Background from "./background";
import CellestialImplementation from "../engine/implementation/cellestial.implementation";
import EntityImplementation from "../engine/implementation/entity.implementation";
import PhysicalBodyImplementation from "../engine/implementation/physicalBody.implementation";
import SpriteImplementation from "../engine/implementation/sprite.implementation";
import Engine from "../engine/engine";


export class Builder {
    buildAssets(){
        const loader = new ImageLoaderManager();
        loader.setAssetList(gameImages);
        loader.loadImages();
        return loader;
    }

    build(presets:any, engine:any) {
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

    async buildBackground(background: Background){
        const backgroundImage = await background.load()
        background.setImage(backgroundImage);
        background.setLoaded(true);
        return background;
    }
    
    buildShip(){
        let ship = new SpaceShip();
        ship.load().then((image: HTMLImageElement)=>{
            ship.setImage(image);
            ship.setLoaded(true);
        });
        return ship;
    }
}