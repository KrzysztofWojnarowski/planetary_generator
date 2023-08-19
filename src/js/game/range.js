import Entity from "../engine/entity";
import Sprite from "../engine/sprite";
import Drawable from "../engine/drawable";
import EventSystem from "../engine/event-system";
import Position from "../engine/position";
export default class Range {
    constructor(engine) {
        let sprite = new Sprite();
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.position = new Position();
        sprite.setImage(engine.loader.images.iconSheet.getImage());
        this.drawable.bindSprite(sprite);
        this.drawable.dimension = [40, 40];
        this.drawable.size = [150, 150];
        this.drawable.topLeft=[485,772];
        this.drawable.bindUpdate(this.update,[this]);
        this.eventSystem = new EventSystem();
        this.step=1/4;
        this.camera = engine.camera;
    }
    
    bindOwner(owner) {
        this.owner = owner;
       
    }

    update(self) {
        let ob = self.owner.getBody();
        let newPosition = [
          ob.x,
          ob.y
        ]
       self.drawable.setPosition(newPosition);
    }
    

}