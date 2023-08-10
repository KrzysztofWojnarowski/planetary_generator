import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
export default class Accelerometer {
    constructor(engine) {
        let sprite = new Sprite();
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.position = new Position();
        sprite.setImage(engine.loader.images.gaugeSheet.getImage());
        this.drawable.bindSprite(sprite);
        this.drawable.dimension = [48, 7];
        this.drawable.size = [120, 30];
        this.drawable.topLeft=[869,68];
        this.drawable.bindUpdate(this.update,[this]);
        this.eventSystem = new EventSystem();
        this.step=1/4;
        this.camera = engine.camera;
        this.owner = {};
        this.rels={
            step:this.step,
            camera:this.camera,
            owner:this.owner
        }
    }
    
    bindOwner(owner) {
        this.owner = owner;
        this.step = (4/this.owner.getMesh().maxSpeed);
    }

    update(self) {
        let ob = self.owner.getBody();
        let v= Math.sqrt(ob.vx*ob.vx + ob.vy*ob.vy);
        let frameIndex = Math.floor(v*self.step);
        this.topLeft = [869-frameIndex*48,68];
        const cp = self.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0]+90),
            Math.round(-cp[1]+700)
        ]
       this.setPosition(newPosition);
    }

}