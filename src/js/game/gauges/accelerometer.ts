import { GetDrawable } from './../../engine/models/get-drawable.mode';
import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import { Drawable } from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
import { Camera } from "../../engine/camera";
import Engine from "../../engine/engine";
import SpaceShip from "../ingameObjects/spaceship";
import { PositionCordinates } from "../../engine/models/position.model";
import { GetPositionCoordinates } from "../../engine/models/get-position-coordinates.model";

export class Accelerometer implements GetDrawable, GetPositionCoordinates {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    camera: Camera = null;
    position: Position = null;
    eventSystem: EventSystem = null;
    step = 1/4;
    owner: SpaceShip; // is ship
    energyBars = 0;
    rels: {
        step: number,
        camera: Camera,
        owner: any
    };

    constructor(engine: Engine) {
        this.engine = engine;
        this.entity = new Entity();
        this.drawable = this.getDrawable();
        this.position = new Position();
        this.eventSystem = new EventSystem();

        this.step=1/4;
        this.camera = engine.camera;
        this.owner = null;
        this.rels = {
            step: this.step,
            camera: this.camera,
            owner: this.owner
        }
    }
    
    bindOwner(owner: any) {
        this.owner = owner;
        this.step = (4 / this.owner.getMesh().maxSpeed);
    }

    update() {
        let ob = this.owner.getBody();
        let v = Math.sqrt(ob.vx*ob.vx + ob.vy*ob.vy);
        let frameIndex = Math.floor(v*this.step);
        this.drawable.topLeft = [869 - frameIndex * 48,68];
        this.drawable.setPosition(this.getPositionCoordinates());
    }

    getPositionCoordinates(): PositionCordinates {
        const cp = this.camera.getPosition();

        let newPosition: PositionCordinates = [
            Math.round(-cp[0]+90),
            Math.round(-cp[1]+700)
        ]
        return newPosition;
    }

    getDrawable(): Drawable { 
        return new Drawable()
            .setDemention([48, 7])
            .setSize([120, 30])
            .setTopLeft([869, 68])
            .bindSprite(
                new Sprite()
                    .setImage(this.engine.loader.images.gaugeSheet.getImage())
            );
    }
}