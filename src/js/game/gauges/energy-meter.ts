import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
import Camera from "../../engine/camera";
import Engine from "../../engine/engine";

export class EnergyMeter {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    camera: Camera = null;
    position: Position = null;
    eventSystem: EventSystem = null;
    step = 1/4;
    owner: any; // is ship
    energyBars = 0;

    constructor(engine: Engine) {
        this.engine = engine;
        let sprite = new Sprite();
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.position = new Position();
        this.camera = engine.camera;
        sprite.setImage(engine.loader.images.gaugeSheet.getImage());
        this.drawable.bindSprite(sprite);
        this.drawable.dimension = [10, 8];
        this.drawable.size = [20,28];
        this.drawable.topLeft=[255,102];
        this.eventSystem = new EventSystem();
    }
    
    bindOwner(owner: any) {
        this.owner = owner;
    }

    update() {
        let mesh  = this.owner.getMesh();
        let energyRatio = 100/mesh.energyCapacity;
        this.energyBars = Math.round(mesh.energy*energyRatio);
        const cp = this.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0]+30),
            Math.round(-cp[1]+10)
        ]
       this.drawable.setPosition(newPosition);
    }

    draw(){
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

}