import { Entity } from './../engine/entity';
import { Sprite } from "../engine/sprite";
import { Drawable } from "../engine/drawable";
import { EventSystem } from "../engine/event-system";
import { Position } from "../engine/position";
import Engine from "../engine/engine";
import { Camera } from '../engine/camera';
import { PositionCordinates } from '../engine/models/position.model';

export default class Range {
    drawable: Drawable;
    entity: Entity;
    position: Position;
    eventSystem: EventSystem; 
    step=1/4;
    camera: Camera;
    owner: any;

    constructor(engine: Engine) {
        let sprite = new Sprite();
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.position = new Position();
        sprite.setImage(engine.loader.images.iconSheet.getImage());
        this.drawable.bindSprite(sprite);
        this.drawable.dimension = [40, 40];
        this.drawable.size = [150, 150];
        this.drawable.topLeft=[485,772];
        this.eventSystem = new EventSystem();
        this.camera = engine.camera;
    }
    
    bindOwner(owner: any) {
        this.owner = owner;
       
    }

    update() {
        let ob = this.owner.getBody();
        let newPosition = [
          ob.x,
          ob.y
        ]
       this.drawable.setPosition(newPosition as PositionCordinates);
    }
}