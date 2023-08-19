import { GetDrawable } from './../../engine/models/get-drawable.mode';
import { Entity } from "../../engine/entity";
import Sprite from "../../engine/sprite";
import { Drawable } from "../../engine/drawable";
import { EventSystem } from "../../engine/event-system";
import Position from "../../engine/position";
import Engine from "../../engine/engine";
import { Camera } from "../../engine/camera";
import { GetPositionCoordinates } from "../../engine/models/get-position-coordinates.model";
import { PositionCordinates } from "../../engine/models/position.model";

export interface MenuSettings {
    dimension: [number, number];
    size: [number, number];
    topLeft: [number, number];
}

export class MenuFrame implements GetDrawable, GetPositionCoordinates {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    eventSystem: EventSystem = null;
    camera: Camera = null;
    position: Position = null;
    frame = 0;
    tick = 0;

    // Default configuration suitable for Desktop View only 1600/800 px
    // 820 / 1600 = x / screenWidth
    // x = 820 /1600 * screenWidth;
    private defaultMenuSettings: MenuSettings = {
        dimension: [32, 31],
        size: [820, 625],
        topLeft: [447, 48],
    };

    private scale = {
        dimension: [32/1600, 31/800],
        size: [820/1600, 625/800],
        topLeft: [447/1600, 48/800],
    }

    constructor(engine: Engine, screenSize?: [number, number]) {
        this.engine = engine;
        this.camera = engine.camera;

        this.entity = new Entity();
        this.drawable = this.getDrawable();
        this.position = new Position();

        this.eventSystem = new EventSystem();
    }

    update(): void {
        this.tick++;

        if (this.tick % 5 == 0) {
            this.frame++;
            this.frame = this.frame > 3 ? 0 : this.frame;
        }
        this.drawable.topLeft = [448 + this.frame * 32, 48];

        this.drawable.setPosition(this.getPositionCoordinates());
    }

    getPositionCoordinates(): PositionCordinates {
        const cp = this.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0] + 750),
            Math.round(-cp[1] + 395)
        ];

        return newPosition as PositionCordinates;
    }
    
    getDrawable(): Drawable { 
        return new Drawable()
            .setDemention(this.defaultMenuSettings.dimension)
            .setSize(this.defaultMenuSettings.size)
            .setTopLeft(this.defaultMenuSettings.topLeft)
            .bindSprite(
                new Sprite()
                    .setImage(this.engine.loader.images.gaugeSheet.getImage())
            );
    }
}