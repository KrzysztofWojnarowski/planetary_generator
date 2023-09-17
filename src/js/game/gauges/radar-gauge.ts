import { GetDrawable } from './../../engine/models/get-drawable.mode';
import { Entity } from "../../engine/entity";
import { Sprite } from "../../engine/sprite";
import { Drawable } from "../../engine/drawable";
import { EventSystem } from "../../engine/event-system";
import { Position } from "../../engine/position";
import Engine from "../../engine/engine";
import { Camera } from "../../engine/camera";
import { Physics } from "../../engine/physics";
import { PositionCordinates } from "../../engine/models/position.model";
import { GetPositionCoordinates } from "../../engine/models/get-position-coordinates.model";
import SpaceShip from '../ingame-objects/spaceship';
import SpriteImplementation from '../../engine/implementation/sprite.implementation';

export class RadarGauge implements GetDrawable, GetPositionCoordinates {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    sprite: SpriteImplementation = null;
    camera: Camera = null;
    position: Position = null;
    eventSystem: EventSystem = null;
    radarMap: Map<any, any> = new Map();
    radarStart = 0;
    owner: SpaceShip;
    scale: number;
    range: number;

    constructor(presets: any, engine: Engine) {
        this.engine = engine;
        this.entity = new Entity();
        this.sprite = new SpriteImplementation(presets.sprite);
        this.position = new Position();
        this.eventSystem = new EventSystem();
        this.scale = presets.params.scale;
        this.range = presets.params.range;
    }
    useCamera(camera: Camera) {
        this.camera = camera;
    }

    bindOwner(owner: any) {
        this.owner = owner;
    }

    update() {
        this.drawable.setPosition(this.getPositionCoordinates());
        let physics = this.engine.getPhysics() as Physics;
        this.radarMap = physics.getInRange(this.owner.getBody().getBody(), this.engine.getPhysicals(), 500000000);
        if (Math.round(this.radarStart / (4 * Math.PI)) == 1) {
            this.radarStart = 0;
        } else {
            this.radarStart += 0.1;
        }
    }

    draw() {
        const context = this.engine.context;
        const position = this.owner.getBody().getPosition();
        const d = this.drawable.topLeft;
        const size = this.drawable.size;
        const p = this.drawable.position;
        const dm = this.drawable.dimension;
        const scale = this.scale;
        context.save();
        context.translate(p[0] + size[0], p[1] + size[1]);
        context.drawImage(this.drawable.sprite.getImage(),
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
            context.arc(-(-e.position[0] + position[0]) * scale + size[0] * 0.5, -(-e.position[1] + position[1]) * scale + 0.5 * size[1], 2, 0, Math.PI * 2);
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

    setDrawable(drawable: Drawable) {
        this.drawable = drawable;
    }

    getDrawable(): Drawable {
        const image = this.engine.loader.getImage(this.sprite.getImagePointer());
        const drawable = new Drawable()
            .setDemention(this.sprite.getDimension())
            .setSize(this.sprite.getSize())
            .setTopLeft(this.sprite.getPosition())
            .bindSprite(
                new Sprite()
                    .setImage(image)
            );
        return drawable;
    }
}