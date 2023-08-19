import Celestial from "./ingameObjects/celestial";
import { Sprite } from "../engine/sprite";
import SpaceShip from "./ingameObjects/spaceship";
import { ImageLoaderManager } from "../engine/image-loader-manager";
import gameImages from "./gameImages";

export default class Builder {
    #planets = {};
    constructor(planets) {
        this.#planets = planets;
    }

    buildAssets(){
        const loader = new ImageLoaderManager();
        loader.setAssetList(gameImages);
        loader.loadImages();
        return loader;
    }

    build(presets) {
        let planet = this.#planets.spawnEmpty(presets.type);
        planet.x = presets.x;
        planet.y = presets.y;
        planet.m = presets.m;
        planet.vx = presets.vx;
        planet.vy = presets.vy;
        planet.m = presets.m;
        planet.r = presets.r;
        let sprite = new Sprite();
        sprite.load(presets.image).then(image => {
            sprite.setImage(image);
            sprite.setLoaded();
        });
        let celestial = new Celestial(sprite,planet);
        celestial.setFrameCount(presets.frameCount);
        celestial.setFrameSize(presets.frameSize);
        return celestial;

    }

    async buildBackground(background){
        const backgroundImage = await background.load()
        background.setImage(backgroundImage);
        background.setLoaded(true);
        return background;
    }
    

    buildShip(){
        let ship = new SpaceShip();
        ship.load().then(image=>{
            ship.setImage(image);
            ship.setLoaded(true);
        });
        return ship;

    }
}