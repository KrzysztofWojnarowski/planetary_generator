import { Celestial } from "./ingame-objects/celestial";
import { Sprite } from "../engine/sprite";
import SpaceShip from "./ingame-objects/spaceship";
import { ImageLoaderManager } from "../engine/image-loader-manager";
import { gameImages } from "./game-images";
import { Planets } from "./ingame-objects/planets";
import Background from "./background";

export class Builder {
    planets: Planets = null;;
    constructor(planets: Planets) {
        this.planets = planets;
    }

    buildAssets(){
        const loader = new ImageLoaderManager();
        loader.setAssetList(gameImages);
        loader.loadImages();
        return loader;
    }

    build(presets: any) {
        let planet = this.planets.spawnEmpty(presets.type);
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