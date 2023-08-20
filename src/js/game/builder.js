import Celestial from "./ingameObjects/celestial";
import Sprite from "../engine/sprite";
import SpaceShip from "./ingameObjects/spaceship";
import ImageLoader from "../engine/imageLoader";
import gameImages from "./gameImages";
import PhysicalBody from "../engine/physicalbody";
import CellestialImplementation from "../engine/implementation/cellestial.implementation";
import EntityImplementation from "../engine/implementation/entity.implementation";
import PhysicalBodyImplementation from "../engine/implementation/physicalBody.implementation";
import SpriteImplementation from "../engine/implementation/sprite.implementation";


export default class Builder {

    buildAssets() {
        const loader = new ImageLoader();
        loader.setAssetList(gameImages);
        loader.loadImages();
        return loader;
    }


    build(presets, engine) {
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
        engine.eventHandlingSystem.addListener("onCollided", () => celestial.markForRemoval = true);
        return cellestialInstance;
    }

    buildBackground(background) {
        background.load().then(image => {
            background.setImage(image);
            background.setLoaded(true);
        });
        return background;
    }


    buildShip() {
        let ship = new SpaceShip();
        ship.load().then(image => {
            ship.setImage(image);
            ship.setLoaded(true);
        });
        return ship;

    }
}