import EventSystem from "../../engine/eventSystem";
import PhysicalBody from "../../engine/physicalbody";
import spaceshiptypes from "./spaceshiptypes.js";
import Explode from "./explode";
import Entity from "../../engine/entity";

export default class SpaceShip {
    keyboardState = {
        arrowUp: false,
        arrowDown: false,
        arrowLeft: false,
        arrowRight: false
    }
    url = "assets/pngegg.png";
    #isLoaded = false;
    #image = {};
    #mesh = spaceshiptypes.bascicCrousier;
    position = [100, 1900];
    velocity = [0, 0];
    rotation = Math.PI / 2;
    force = 0;
    body = new PhysicalBody();
    throttle = 0;
    powerQuantum = 1e-18;
    throttleFactor = 0;
    physics = {};
    constructor() {
        this.entity = new Entity();
        this.body.m = this.#mesh.m;
        this.body.x = this.position[0];
        this.body.y = this.position[1];
        this.body.r = this.#mesh.r;
        this.vx = 0;
        this.vy = 0;
        this.maxSpeed = this.#mesh.maxSpeed;
        this.powerQuantum = this.#mesh.powerQuantum;
        this.eventSystem = new EventSystem(this);
        this.eventSystem.registerEvent("onCollided");
        this.eventSystem.addListener("onCollided", this.onCollision);
        this.eventSystem.addListener("onRemove", this.onRemove);
        this.eventSystem.addListener("onUpdate", (ship, engine) => {
            this.engine = engine;
            ship.update(engine.getPhysics());
            ship.updateChargeEnergy(ship, engine);
            engine.background.onUpdate(this);
        });

        // Initialize mouse position
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        // Initialize lasers array
        this.lasers = [];

        // Add mouse move listener
        const canvas = document.querySelector('#canvas');
        if (canvas) {
            canvas.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                this.lastMouseX = this.mouseX;
                this.lastMouseY = this.mouseY;
                this.mouseX = e.clientX - rect.left;
                this.mouseY = e.clientY - rect.top;
            });

            // Add mouse click listener for shooting
            canvas.addEventListener('click', (e) => {
                this.shoot();
            });
        }
    }

    onRemove(e, s) {
        e.getBody().markForRemoval = true;
    }
    onUpdate(e, s) {
        e.update(s.getPhysics());
    }

    getBody() {
        return this.body;
    }

    setBody(body) {
        this.body.fromObject(body);
    }

    load() {
        let url = this.url;
        return new Promise(resolve => {
            const image = new Image();
            image.addEventListener("load", (e) => {
                resolve(image);
            });
            image.src = url;
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

    drawChargingCircle(context) {
        this.isCharging ? context.fill() : context.stroke();
    }

    draw(context) {
        context.save();
        const body = this.getBody();
        context.translate(body.x, body.y);
        context.rotate(this.rotation);
        let sprite = this.#mesh.sprite;
        let [x, y] = sprite.position;
        let [w, h] = sprite.sizeSource;
        let [dw, dh] = sprite.sizeDestination;
        context.beginPath();
        context.strokeStyle = "rgba(0,200,150,0.2)";
        context.fillStyle = "rgba(0,200,150,0.1)";
        context.arc(-0.5 * dw + 10, -0.5 * dh + 20, this.getMesh().effectiveRange + 35, 0, 2 * Math.PI);
        this.drawChargingCircle(context);
        context.drawImage(this.#image, x, y, w, h, -0.5 * dw, -0.5 * dh, dw, dh);
        context.restore();

        // Draw active lasers
        if (this.lasers && this.lasers.length > 0) {
            console.log('Drawing lasers:', this.lasers.length);
            this.lasers.forEach((laser, index) => {
                if (laser.active) {
                    context.save();
                    // Draw from the center of the spaceship
                    context.translate(laser.x, laser.y);
                    context.rotate(laser.angle);
                    
                    // Draw red laser beam
                    context.beginPath();
                    context.strokeStyle = 'red';
                    context.lineWidth = laser.width;
                    context.moveTo(0, 0);
                    context.lineTo(laser.length, 0);
                    context.stroke();
                    context.restore();
                }
            });
        }
    }
    //TODO - use sprite instead of this nasty hack
    getSprite() {
        return this;
    }

    updatheThrottelEnergy() {
        let mesh = this.getMesh();
        if (mesh.energy > 0 && mesh.energy < mesh.energyCapacity) {
            mesh.energy -= this.throttle;
        }
        if (mesh.energy < 0) {
            mesh.energy = 0;
            this.throttle = 0;
        }
    }
    hasEnergy() {
        return this.getMesh().energy > 0;
    }

    throttleUp() {
        
        if (!this.hasEnergy()) return;
        if (this.#mesh.power > this.throttle)
            this.throttle += 0.5;
        else
            this.throttle = this.#mesh.power;
    }

    throttleDown() {
        if (!this.hasEnergy()) this.throttle = 0;
        this.throttle *= 0.4;

    }
    turnLeft() {
        this.rotation -= 0.03;
    }
    turnRight() {
        this.rotation += 0.03;
    }

    throttleRelax() {
        if (!this.hasEnergy()) this.throttle = 0;
        if (this.throttle < 0.01)
            this.throttle = 0;
        else
            this.throttle *= 0.9;
    }

    getMesh() {
        return this.#mesh;
    }

    chargeMap(ship, engine) {
        let system = engine.store.physical;
        let physics = engine.getPhysics();
        return physics.getInRange(ship.getBody(), system, ship.getMesh().effectiveRange);
    }

    chargeFromObject(object) {
        return object.m * this.getMesh().chargingSpeed;
    }

    updateChargeEnergy(ship, engine) {
        let chargeMap = this.chargeMap(ship, engine);
        let mesh = ship.getMesh();
        chargeMap.forEach(e => {
            let energyAdditon = this.chargeFromObject(e);
            if (energyAdditon + mesh.energy < mesh.energyCapacity) {
                mesh.energy += energyAdditon;
            }
        });
        this.isCharging = chargeMap.size > 0;
    }

    update(physics) {
        this.handleKeyboardState();
        this.updatheThrottelEnergy();
        
        // Calculate angle to mouse
        if (this.mouseX !== undefined && this.mouseY !== undefined && this.engine) {
            const camera = this.engine.camera;
            if (camera) {
                const cameraPos = camera.getPosition();
                const cameraDim = camera.getDimension();
                
                // Get spaceship position relative to window
                const shipX = cameraPos[0] + cameraDim[0]/2 + this.body.x;
                const shipY = this.body.y + cameraPos[1] + cameraDim[1]/2;
                
                // Calculate angle between spaceship and mouse
                const dx = this.mouseX - shipX + cameraDim[0]/2;
                const dy = this.mouseY - shipY + cameraDim[1]/2;
                const targetAngle = Math.atan2(dy, dx);
                
                // Only update rotation if mouse has moved
                if (this.mouseX !== this.lastMouseX || this.mouseY !== this.lastMouseY) {
                    this.rotation = targetAngle;
                }
            }
        }

        // Update laser positions
        if (this.lasers && this.lasers.length > 0) {
            const currentTime = Date.now();
            this.lasers.forEach((laser, index) => {
                if (laser.active) {
                    // Update laser position
                    laser.x += Math.cos(laser.angle) * laser.speed;
                    laser.y += Math.sin(laser.angle) * laser.speed;
                    
                    // Deactivate laser after 500ms
                    if (currentTime - laser.createdAt > 500) {
                        laser.active = false;
                        console.log('Laser deactivated after 500ms:', index);
                    }
                }
            });
            
            // Remove inactive lasers
            this.lasers = this.lasers.filter(laser => laser.active);
        }

        let throttleFactor = this.throttle * this.powerQuantum;
        this.body.fx += throttleFactor * Math.cos(this.rotation);
        this.body.fy += throttleFactor * Math.sin(this.rotation);
        let v = physics.calculateSpeed(this.getBody());
        this.body.vx = Math.abs(v[0]) > this.maxSpeed ? this.maxSpeed * (v[0] / Math.abs(v[0])) : v[0];
        this.body.vy = Math.abs(v[1]) > this.maxSpeed ? this.maxSpeed * (v[1] / Math.abs(v[1])) : v[1];
        let p = physics.calculatePosition(this.getBody());
        this.body.x = p[0];
        this.body.y = p[1];
    }
    onCollision(e, f, g) {
        e.body.markForRemoval = true;
        let explosion = new Explode();
        const body = e.getBody();
        explosion.sprite.setImage(g.loader.getGameImages().explosionSheet.getImage());
        explosion.animation.position = [
            body.x, body.y
        ];
        explosion.animation.size = [200, 200];
        g.store.system.push(explosion);
        g.registerAnimation(explosion);
    }

    getThrottle() {
        return this.throttle;
    }

    handleKeyboardState() {
        this.keyboardState.arrowUp && this.throttleUp();
        !this.keyboardState.arrowUp && this.throttleRelax();
        this.keyboardState.arrowDown && this.throttleDown();
        this.keyboardState.arrowLeft && this.turnLeft();
        this.keyboardState.arrowRight && this.turnRight();
    }

    keyPressed(key) {
        !this.keyboardState[key] && (this.keyboardState[key] = true);
    }

    keyReleased(key) {
        this.keyboardState[key] && (this.keyboardState[key] = false);
    }

    handleArrowUpPress() {
        this.keyPressed("arrowUp");
    }
    handleArrowDownPress() {
        this.keyPressed("arrowDown");
    }
    handleArrowLeftPress() {
        this.keyPressed("arrowLeft");
    }
    handleArrowRightPress() {
        this.keyPressed("arrowRight");
    }
    handleArrowUpRelease() {
        this.keyReleased("arrowUp");
    }
    handleArrowDownRelease() {
        this.keyReleased("arrowDown");
    }
    handleArrowLeftRelease() {
        this.keyReleased("arrowLeft");
    }
    handleArrowRightRelease() {
        this.keyReleased("arrowRight");
    }

    shoot() {
        if (!this.engine) return;

        // Create laser beam
        const laser = {
            x: this.body.x,
            y: this.body.y,
            angle: this.rotation,
            length: 100,
            width: 2,
            speed: 10,
            active: true,
            createdAt: Date.now() // Add timestamp when laser is created
        };

        // Add laser to our lasers array
        this.lasers.push(laser);
        console.log('Laser shot:', laser);
        console.log('Total lasers:', this.lasers.length);
    }
}