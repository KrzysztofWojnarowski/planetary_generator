import PhysicalBody from "../../engine/physicalbody";
import EventSystem from "../../engine/eventSystem";
import Entity from "../../engine/entity";

export default class Planet {
    constructor(x, y, size, planetType) {
        this.entity = new Entity();
        this.body = new PhysicalBody();
        this.body.x = x;
        this.body.y = y;
        this.body.m = size * 1000; // Mass proportional to size
        this.size = size;
        this.planetType = planetType;
        this.url = `assets/${planetType}.png`;
        this.#isLoaded = false;
        this.#image = {};
        
        // Initialize event system
        this.eventSystem = new EventSystem(this);
        this.eventSystem.addListener("onUpdate", (planet, engine) => {
            this.engine = engine;
            planet.update(engine.getPhysics());
        });
    }

    #isLoaded = false;
    #image = {};

    load() {
        return new Promise(resolve => {
            const image = new Image();
            image.addEventListener("load", (e) => {
                resolve(image);
            });
            image.src = this.url;
        });
    }

    isLoaded() {
        return this.#isLoaded;
    }

    getImage() {
        return this.#image;
    }

    setImage(image) {
        this.#image = image;
    }

    setLoaded(loaded) {
        this.#isLoaded = loaded;
    }

    draw(context) {
        context.save();
        const body = this.getBody();
        context.translate(body.x, body.y);
        
        // Draw planet
        const size = this.size * 2; // Double the size for better visibility
        context.drawImage(this.#image, -size/2, -size/2, size, size);
        
        context.restore();
    }

    getBody() {
        return this.body;
    }

    update(physics) {
        // Planets don't move, they just stay in place
        // But they can be affected by gravity from other objects
    }
} 