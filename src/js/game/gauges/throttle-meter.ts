import { Entity } from "../../engine/entity";
import Sprite from "../../engine/sprite";
import { Drawable } from "../../engine/drawable";
import { EventSystem } from "../../engine/event-system";
import Position from "../../engine/position";
import Engine from "../../engine/engine";
import { Camera } from "../../engine/camera";
import SpaceShip from "../ingameObjects/spaceship";
import { PositionCordinates } from "../../engine/models/position.model";
import { GetPositionCoordinates } from "../../engine/models/get-position-coordinates.model";
import { GetDrawable } from "../../engine/models/get-drawable.mode";

export class ThrottleMeter implements GetDrawable, GetPositionCoordinates {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    camera: Camera = null;
    position: Position = null;
    eventSystem: EventSystem = null;
    step = 1/4;
    owner: SpaceShip;

    constructor(engine: Engine) {
        this.engine = engine;
        this.entity = new Entity();
        this.drawable = this.getDrawable();
        this.position = new Position();
        this.eventSystem = new EventSystem();
        this.camera = engine.camera;
    }
    
    bindOwner(owner: any) {
        this.owner = owner;
        this.step = (4 / this.owner.getMesh().power);
    }

    update() {
        let frameIndex = Math.floor(this.owner.throttle * this.step);
        this.drawable.topLeft = [290 + frameIndex * 48,210];

        this.drawable.setPosition(this.getPositionCoordinates());
    }

    getPositionCoordinates(): PositionCordinates {
        const cp = this.camera.getPosition();
        
        let newPosition: PositionCordinates = [
            Math.round(-cp[0]+1350),
            Math.round(-cp[1]+450)
        ];

        return newPosition;
    }

    getDrawable(): Drawable { 
        return new Drawable()
            .setDemention([44, 44])
            .setSize([120, 120])
            .setTopLeft([290, 20])
            .bindSprite(
                new Sprite()
                    .setImage(this.engine.loader.images.gaugeSheet.getImage())
            );
    }
}