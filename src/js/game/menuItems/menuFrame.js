import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
export default class MenuFrame {
    constructor(engine) {
        let sprite = new Sprite();
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.position = new Position();
        sprite.setImage(engine.loader.images.gaugeSheet.getImage());
        this.drawable.bindSprite(sprite);
        this.drawable.dimension = [32, 31];
        this.drawable.size = [820, 625];
        this.drawable.topLeft = [447, 48];
        this.drawable.bindUpdate(this.update, [this]);
        this.eventSystem = new EventSystem();
        this.frame = 0;
        this.tick = 0;
        this.camera = engine.camera;
    }

    update(self) {
        self.tick++;
        if (self.tick % 5 == 0) {
            self.frame++;
            self.frame = self.frame > 3 ? 0 : self.frame;
        }
        self.drawable.topLeft = [448 + self.frame * 32, 48];
        const cp = self.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0] + 750),
            Math.round(-cp[1] + 395)
        ];
        self.drawable.setPosition(newPosition);
    }

}