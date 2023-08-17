import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
import Camera from "../../engine/camera";
import Engine from "../../engine/engine";

export class Accelerometer {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    camera: Camera = null;
    position: Position = null;
    eventSystem: EventSystem = null;
    step = 1/4;
    owner: any; // is ship
    energyBars = 0;
    rels: {
        step: number,
        camera: Camera,
        owner: any
    };

    constructor(engine: Engine) {
        let sprite = new Sprite();
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.position = new Position();
        sprite.setImage(engine.loader.images.gaugeSheet.getImage());
        this.drawable.bindSprite(sprite);
        this.drawable.dimension = [48, 7];
        this.drawable.size = [120, 30];
        this.drawable.topLeft=[869,68];
        this.eventSystem = new EventSystem();
        this.step=1/4;
        this.camera = engine.camera;
        this.owner = {};
        this.rels = {
            step: this.step,
            camera: this.camera,
            owner: this.owner
        }
    }
    
    bindOwner(owner: any) {
        this.owner = owner;
        this.step = (4/this.owner.getMesh().maxSpeed);
    }

    update() {
        let ob = this.owner.getBody();
        let v= Math.sqrt(ob.vx*ob.vx + ob.vy*ob.vy);
        let frameIndex = Math.floor(v*this.step);
        this.drawable.topLeft = [869 - frameIndex * 48,68];
        const cp = this.camera.getPosition();

        let newPosition = [
            Math.round(-cp[0]+90),
            Math.round(-cp[1]+700)
        ]

       this.drawable.setPosition(newPosition);
    }

}