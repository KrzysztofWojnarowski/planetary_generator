import { Entity } from "../../engine/entity";
import { Sprite } from "../../engine/sprite";
import { Drawable } from "../../engine/drawable";
import { EventSystem } from "../../engine/event-system";
import { Position } from "../../engine/position";
import { Camera } from "../../engine/camera";
import Engine from "../../engine/engine";
import { PositionCordinates } from "../../engine/models/position.model";
import SpaceShip from "../ingameObjects/spaceship";
import { GetPositionCoordinates } from "../../engine/models/get-position-coordinates.model";

export class EnergyMeter implements GetPositionCoordinates {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    camera: Camera = null;
    position: Position = null;
    eventSystem: EventSystem = null;
    step = 1/4;
    owner: SpaceShip;
    energyBars = 0;

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
        let mesh  = this.owner.getMesh();
        let energyRatio = 100 / mesh.energyCapacity;
        this.energyBars = Math.round(mesh.energy * energyRatio);

        this.drawable.setPosition(this.getPositionCoordinates());
    }

    draw(): void {
        const context = this.engine.context;
        const d = this.drawable.topLeft;
        const size = this.drawable.size;
        const p = this.drawable.position;
        const dm = this.drawable.dimension;

        for ( let i=0; i < this.energyBars; i++){
            context.drawImage((this.drawable.sprite as Sprite).getImage(),
            d[0],d[1],
            dm[0],dm[1],
            p[0]+i*size[0]*0.3,p[1]+size[1],
            size[0],size[1]);
        
        }
    }

    getPositionCoordinates(): PositionCordinates {
        const cp = this.camera.getPosition();

        let newPosition: PositionCordinates = [
            Math.round(-cp[0]+30),
            Math.round(-cp[1]+10)
        ];

        return newPosition;
    }

    private getDrawable(): Drawable {
        return new Drawable()
            .setDemention([10, 8])
            .setSize([20,28])
            .setTopLeft([255,102])
            .bindSprite(
                new Sprite()
                    .setImage(this.engine.loader.images.gaugeSheet.getImage())
            );
    }
}