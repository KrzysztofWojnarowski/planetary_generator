import Entity from "../../engine/entity";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Engine from "../../engine/engine";
import Camera from "../../engine/camera";

export class CounterGauge {
    engine: Engine = null;
    entity: Entity = null;
    drawable: Drawable = null;
    camera: Camera = null;
    eventSystem: EventSystem = null;
    counter: number = 0;

    constructor(engine: Engine) {
        this.engine = engine;
        this.entity = new Entity();
        this.drawable = new Drawable();
        this.eventSystem = new EventSystem();
        this.camera = engine.camera;

        // Set up the drawable
        this.drawable.draw = this.draw.bind(this);
    }

    update() {
        // No update needed for counter
    }

    draw() {
        const context = this.engine.context;
        const cp = this.camera.getPosition();
        
        // Calculate position in top right corner
        const newPosition = [
            Math.round(-cp[0] + window.innerWidth - 50),
            Math.round(-cp[1] + 30)
        ];
        
        context.save();
        context.font = "bold 24px Arial";
        context.fillStyle = "rgba(255, 255, 255, 0.8)";
        context.fillText(this.counter.toString(), newPosition[0], newPosition[1]);
        context.restore();
    }

    increment() {
        this.counter++;
    }
} 