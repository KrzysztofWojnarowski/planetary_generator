import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
export default class RadarGauge {
    constructor(engine) {
        let sprite = new Sprite();
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.position = new Position();
        this.camera = engine.camera;
        sprite.setImage(engine.loader.images.iconSheet.getImage());
        this.drawable.bindSprite(sprite);
        this.drawable.dimension = [40, 40];
        this.drawable.size = [200, 200];
        this.drawable.topLeft = [484, 772];
        this.drawable.bindUpdate(this.update, [this, engine]);
        this.drawable.bindDraw(this.draw, [this, engine]);
        this.eventSystem = new EventSystem();
        this.radarMap = new Map();
        this.radarStart = 0;
    }

    bindOwner(owner) {
        this.owner = owner;
    }

    update(self, engine) {
        const cp = self.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0] + 1100),
            Math.round(-cp[1] + 310)
        ]
        self.drawable.setPosition(newPosition);
        let physics = engine.getPhysics();
        self.radarMap = physics.getInRange(self.owner.getBody(), engine.getPhysicals(), 5000);
        if (Math.round(self.radarStart / (4 * Math.PI)) == 1) {
            self.radarStart = 0;
        } else {
            self.radarStart += 0.1;
        }
    }

    draw(self, engine) {
        const context = engine.context;
        const ownerBody = self.owner.getBody();
        const d = this.topLeft;
        const size = this.size;
        const p = this.position;
        const dm = this.dimension;
        context.save();
        context.translate(p[0] + size[0], p[1] + size[1]);
        context.drawImage(this.sprite.getImage(),
            d[0], d[1],
            dm[0], dm[1],
            0, 0,
            size[0], size[1]);
        context.beginPath();
        context.fillStyle = "rgba(100,200,100,0.5)";
        context.arc(size[0] * 0.5, size[1] * 0.5, 90, self.radarStart, 0.12 * Math.PI + self.radarStart);
        context.lineTo(size[0] * 0.5, size[1] * 0.5);
        context.fill();
        context.arc(size[0] * 0.5, size[1] * 0.5, 90, self.radarStart - Math.PI, 0.12 * Math.PI + self.radarStart);
        context.lineTo(size[0] * 0.5, size[1] * 0.5);
        context.clip();
        self.radarMap.forEach(e => {
            context.beginPath();
            context.fillStyle = "rgba(200,250,200,0.5)";
            context.arc(-(-e.x + ownerBody.x) * 0.01 + size[0] * 0.5, -(-e.y + ownerBody.y) * 0.01 + 0.5 * size[1], 2, 0, Math.PI * 2);
            context.fill();
        });
        context.restore();

    }

}