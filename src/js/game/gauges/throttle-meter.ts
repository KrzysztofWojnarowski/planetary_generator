import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
import Engine from "../../engine/engine";
import { Camera } from "../../engine/camera";
import SpaceShip from "../ingameObjects/spaceship";

export class ThrottleMeter {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    camera: Camera = null;
    position: Position = null;
    eventSystem: EventSystem = null;
    step = 1/4;
    owner: SpaceShip; // is ship

    constructor(engine: Engine) {
        this.engine = engine;
        let sprite = new Sprite();
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.position = new Position();
        sprite.setImage(engine.loader.images.gaugeSheet.getImage());
        this.drawable.bindSprite(sprite);
        this.drawable.dimension = [44, 44];
        this.drawable.size = [120, 120];
        this.drawable.topLeft = [290,210];
        this.eventSystem = new EventSystem();
        this.camera = engine.camera;
    }
    
    bindOwner(owner: any) {
        this.owner = owner;
        this.step = (4/this.owner.getMesh().power);
    }

    update() {
        let frameIndex = Math.floor(this.owner.throttle * this.step);
        this.drawable.topLeft = [290 + frameIndex * 48,210];

        const cp = this.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0]+1350),
            Math.round(-cp[1]+450)
        ]
       this.drawable.setPosition(newPosition);
    }

}