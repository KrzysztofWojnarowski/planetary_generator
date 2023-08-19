import { GetDrawable } from './../../engine/models/get-drawable.mode';
import { Entity } from "../../engine/entity";
import Sprite from "../../engine/sprite";
import { Drawable } from "../../engine/drawable";
import { EventSystem } from "../../engine/event-system";
import Position from "../../engine/position";
import Engine from "../../engine/engine";
import { Camera } from "../../engine/camera";
import Physics from "../../engine/physics";
import { PositionCordinates } from "../../engine/models/position.model";
import { GetPositionCoordinates } from "../../engine/models/get-position-coordinates.model";
import SpaceShip from '../ingameObjects/spaceship';

export class RadarGauge implements GetDrawable, GetPositionCoordinates {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    camera: Camera = null;
    position: Position = null;
    eventSystem: EventSystem = null;
    radarMap: Map<any, any> = new Map();
    radarStart = 0;
    owner: SpaceShip;

    constructor(engine: Engine) {
        this.engine = engine;
        this.entity = new Entity();
        this.drawable = this.getDrawable();
        this.position = new Position();
        this.camera = engine.camera;
        this.eventSystem = new EventSystem();
    }

    bindOwner(owner: any) {
        this.owner = owner;
    }

    update() {
        this.drawable.setPosition(this.getPositionCoordinates());
        let physics = this.engine.getPhysics() as Physics;
        this.radarMap = physics.getInRange(this.owner.getBody(), this.engine.getPhysicals(), 5000);
        if (Math.round(this.radarStart / (4 * Math.PI)) == 1) {
            this.radarStart = 0;
        } else {
            this.radarStart += 0.1;
        }
    }

    draw() {
        const context = this.engine.context;
        const ownerBody = this.owner.getBody();
        const d = this.drawable.topLeft;
        const size = this.drawable.size;
        const p = this.drawable.position;
        const dm = this.drawable.dimension;
        context.save();
        context.translate(p[0] + size[0], p[1] + size[1]);
        context.drawImage((this.drawable.sprite as Sprite).getImage(),
            d[0], d[1],
            dm[0], dm[1],
            0, 0,
            size[0], size[1]);
        context.beginPath();
        context.fillStyle = "rgba(100,200,100,0.5)";
        context.arc(size[0] * 0.5, size[1] * 0.5, 90, this.radarStart, 0.12 * Math.PI + this.radarStart);
        context.lineTo(size[0] * 0.5, size[1] * 0.5);
        context.fill();
        context.arc(size[0] * 0.5, size[1] * 0.5, 90, this.radarStart - Math.PI, 0.12 * Math.PI + this.radarStart);
        context.lineTo(size[0] * 0.5, size[1] * 0.5);
        context.clip();
        this.radarMap.forEach(e => {
            context.beginPath();
            context.fillStyle = "rgba(200,250,200,0.5)";
            context.arc(-(-e.x + ownerBody.x) * 0.01 + size[0] * 0.5, -(-e.y + ownerBody.y) * 0.01 + 0.5 * size[1], 2, 0, Math.PI * 2);
            context.fill();
        });
        context.restore();
    }

    getPositionCoordinates(): PositionCordinates {
        const cp = this.camera.getPosition();

        let newPosition: PositionCordinates = [
            Math.round(-cp[0] + 1100),
            Math.round(-cp[1] + 310)
        ];

        return newPosition;
    }

    getDrawable(): Drawable { 
        return new Drawable()
            .setDemention([40, 40])
            .setSize([200, 200])
            .setTopLeft([484, 772])
            .bindSprite(
                new Sprite()
                    .setImage(this.engine.loader.images.iconSheet.getImage())
            );
    }
}