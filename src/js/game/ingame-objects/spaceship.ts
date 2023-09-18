import { Entity } from './../../engine/entity';
import { EventSystem } from "../../engine/event-system";
import { spaceshiptypes } from "../dataObjects/spaceshiptypes";
import Explode from "./explode";
import Engine from '../../engine/engine';
import { Physics } from '../../engine/physics';
import PhysicalBodyImplementation from "../../engine/implementation/physicalBody.implementation";
export default class SpaceShip {
    private keyboardState:  { [key: string]: boolean } = {
        arrowUp: false,
        arrowDown: false,
        arrowLeft: false,
        arrowRight: false
    };
    private url = "assets/pngegg.png";
    private _isLoaded = false;
    private image: HTMLImageElement | {} = {};
    private mesh = spaceshiptypes.bascicCrousier;
    private rotation = Math.PI / 2;
    private body:PhysicalBodyImplementation = null;
    public throttle = 0;
    private powerQuantum = 1e-18;
    private eventSystem: EventSystem;
    private _body : PhysicalBodyImplementation;
    entity: Entity = null;
    
    maxSpeed:number;
    isCharging: boolean;

    constructor() {
        this.body = new PhysicalBodyImplementation(this.mesh.physicalBody);
        this.entity = new Entity();
        this.maxSpeed = this.mesh.maxSpeed;
        this.powerQuantum = this.mesh.powerQuantum;
        this.eventSystem = new EventSystem(this);
        this.eventSystem.registerEvent("onCollided");
        this.eventSystem.addListener("onCollided", this.onCollision);
        this.eventSystem.addListener("onRemove", this.onRemove);
        this.eventSystem.addListener("onUpdate", (ship, engine) => {
            ship.update(engine.getPhysics());
            ship.updateChargeEnergy(ship, engine);
            engine.background.onUpdate(this);
        });
    }

    onRemove(e: any, s: any) {
        e.getBody().markForRemoval = true;
    }
    onUpdate(e: any, s: any) {
        e.update(s.getPhysics());
    }

    getBody() {
        return this.body;
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
        return this.isLoaded;
    }
    getImage() {
        return this.image;
    }
    setImage(image: HTMLImageElement) {
        this.image = image;
    }
    setLoaded(loaded: boolean) {
        this._isLoaded = loaded;
    }

    drawChargingCircle(context: CanvasRenderingContext2D) {
        this.isCharging ? context.fill() : context.stroke();
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();
        const position = this.getBody().getPosition();
        context.translate(position[0], position[1]);
        context.rotate(this.rotation);
        let sprite = this.mesh.sprite;
        let [x, y] = sprite.position;
        let [w, h] = sprite.sizeSource;
        let [dw, dh] = sprite.sizeDestination;
        context.beginPath();
        context.strokeStyle = "rgba(0,200,150,0.2)";
        context.fillStyle = "rgba(0,200,150,0.1)";
        context.arc(-0.5 * dw + 10, -0.5 * dh + 20, this.getMesh().effectiveRange + 35, 0, 2 * Math.PI);
        this.drawChargingCircle(context);
        context.drawImage(this.image as HTMLImageElement, x, y, w, h, -0.5 * dw, -0.5 * dh, dw, dh);
        context.restore();
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
        if (this.mesh.power > this.throttle)
            this.throttle += 0.5;
        else
            this.throttle = this.mesh.power;
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
        return this.mesh;
    }

    chargeMap(ship: SpaceShip, engine: Engine) {
        let system = engine.store.physical;
        let physics = engine.getPhysics() as Physics;
        return physics.getInRange(ship.getBody().getBody(), system, ship.getMesh().effectiveRange);
    }

    chargeFromObject(object: any) {
        return 8*Math.exp(object.m/this.getMesh().chargingSpeed);
    }

    updateChargeEnergy(ship: SpaceShip, engine: Engine) {
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

    //TODO: Come up with something more reasonable
    update(physics: Physics) {
        this.handleKeyboardState();
        this.updatheThrottelEnergy();
        let throttleFactor = this.throttle * this.powerQuantum;
        let body = this.getBody().getBody();
        body.force[0] += throttleFactor * Math.cos(this.rotation);
        body.force[1] += throttleFactor * Math.sin(this.rotation);
        let v = physics.calculateSpeed(this.getBody().getBody());
        body.velocity[0] = Math.abs(v[0]) > this.maxSpeed ? this.maxSpeed * (v[0] / Math.abs(v[0])) : v[0];
        body.velocity[1] = Math.abs(v[1]) > this.maxSpeed ? this.maxSpeed * (v[1] / Math.abs(v[1])) : v[1];
        let p = physics.calculatePosition(this.getBody().getBody());
        body.position = p;


    }
    onCollision(e: any, f: any, g: Engine) {
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
    getEntity(){
        return this.entity;
    }

    handleKeyboardState() {
        this.keyboardState.arrowUp && this.throttleUp();
        !this.keyboardState.arrowUp && this.throttleRelax();
        this.keyboardState.arrowDown && this.throttleDown();
        this.keyboardState.arrowLeft && this.turnLeft();
        this.keyboardState.arrowRight && this.turnRight();
    }

    keyPressed(key: string) {
        !this.keyboardState[key] && (this.keyboardState[key] = true);
    }

    keyReleased(key: string) {
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
}