import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
export default class ThrottleMeter {
    constructor(engine) {
        let sprite = new Sprite();
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.position = new Position();
        sprite.setImage(engine.loader.images.gaugeSheet.getImage());
        this.drawable.bindSprite(sprite);
        this.drawable.dimension = [44, 44];
        this.drawable.size = [120, 120];
        this.drawable.topLeft=[290,210];
        this.drawable.bindUpdate(this.update,[this]);
        this.eventSystem = new EventSystem();
        this.step=1/4;
        this.camera = engine.camera;
    }
    
    bindOwner(owner) {
        this.owner = owner;
        this.step = (4/this.owner.getMesh().power);
    }

    update(self) {
        let frameIndex = Math.floor(self.owner.throttle*self.step);
        self.drawable.topLeft = [290+frameIndex*48,210];
        const cp = self.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0]+1350),
            Math.round(-cp[1]+450)
        ]
       self.drawable.setPosition(newPosition);
    }

}