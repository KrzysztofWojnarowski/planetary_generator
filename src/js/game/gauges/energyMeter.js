import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
export default class EnergyMeter {
    constructor(engine) {
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
        this.drawable.bindUpdate(this.update,[this]);
        this.drawable.bindDraw(this.draw,[this,engine]);
        this.eventSystem = new EventSystem();
        this.energyBars=0;
    }
    
    bindOwner(owner) {
        this.owner = owner;
    }

    update(self) {
        let mesh  = self.owner.getMesh();
        let energyRatio = 100/mesh.energyCapacity;
        self.energyBars = Math.round(mesh.energy*energyRatio);
        const cp = self.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0]+30),
            Math.round(-cp[1]+10)
        ]
       self.drawable.setPosition(newPosition);
    }

    draw(self,engine){
        const context = engine.context;
        const ownerBody = self.owner.getBody();
        const d = this.topLeft;
        const size = this.size;
        const p = this.position;
        const dm = this.dimension;
        for ( let i=0;i<self.energyBars;i++){
            context.drawImage(this.sprite.getImage(),
            d[0],d[1],
            dm[0],dm[1],
            p[0]+i*size[0]*0.3,p[1]+size[1],
            size[0],size[1]);
        
        }
    }

}