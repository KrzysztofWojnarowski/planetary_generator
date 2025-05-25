import SpaceShip from "./spaceship";
import EventSystem from "../../engine/eventSystem";
import Explode from "./explode";

export default class EnemyShip extends SpaceShip {
    constructor() {
        super();
        // Set fixed position
        this.position = [0, 1900];
        this.body.x = this.position[0];
        this.body.y = this.position[1];
        
        // Set velocity to 0
        this.body.vx = 0;
        this.body.vy = 0;
        
        // Set radius to 30
        this.body.r = 30;
        
        // Add health
        this.health = 3;
        
        // Create new empty event system
        this.eventSystem = new EventSystem(this);
        this.eventSystem.registerEvent("onCollided");
        this.eventSystem.registerEvent("onUpdate");
        
        // Add event listeners
        this.eventSystem.addListener("onUpdate", (ship, engine) => {
            this.engine = engine;
            this.update(engine.getPhysics());
        });
        
        // Override update to prevent any movement
        this.update = (physics) => {
            // Keep position fixed
            this.body.x = this.position[0];
            this.body.y = this.position[1];
            this.body.vx = 0;
            this.body.vy = 0;
        };

        // Override collision handling to prevent collisions
        this.onCollision = () => {
            // Do nothing - this prevents collisions from affecting the ship
        };

        // Override shoot method to do nothing
        this.shoot = () => {
            // Do nothing - prevents shooting
        };

        // Override keyboard state handling
        this.handleKeyboardState = () => {
            // Do nothing - prevents keyboard input
        };

        // Override key press/release handlers
        this.keyPressed = () => {};
        this.keyReleased = () => {};
    }

    // Override draw method to change circle color to red
    draw(context) {
        context.save();
        const body = this.getBody();
        context.translate(body.x, body.y);
        context.rotate(this.rotation);
        
        // Use public methods instead of private fields
        const mesh = this.getMesh();
        const sprite = mesh.sprite;
        const [x, y] = sprite.position;
        const [w, h] = sprite.sizeSource;
        const [dw, dh] = sprite.sizeDestination;
        
        context.beginPath();
        context.strokeStyle = "rgba(255,0,0,0.2)";  // Changed to red
        context.fillStyle = "rgba(255,0,0,0.1)";    // Changed to red
        context.arc(-0.5 * dw + 10, -0.5 * dh + 20, mesh.effectiveRange + 35, 0, 2 * Math.PI);
        this.drawChargingCircle(context);
        context.drawImage(this.getImage(), x, y, w, h, -0.5 * dw, -0.5 * dh, dw, dh);
        context.restore();
    }

    // Helper method to create explosion
    createExplosion() {
        if (!this.engine) {
            console.error('Engine not available for explosion');
            return;
        }

        try {
            console.log('Creating explosion at position:', this.body.x, this.body.y);
            let explosion = new Explode();
            
            // Get the explosion image from the engine's loader
            const gameImages = this.engine.loader.getGameImages();
            if (!gameImages || !gameImages.explosionSheet) {
                console.error('Explosion sheet not available');
                return;
            }
            
            explosion.sprite.setImage(gameImages.explosionSheet.getImage());
            explosion.animation.position = [this.body.x, this.body.y];
            explosion.animation.size = [200, 200];
            
            if (this.engine.store && this.engine.store.system) {
                this.engine.store.system.push(explosion);
                this.engine.registerAnimation(explosion);
                console.log('Explosion added to game system');
            }
        } catch (error) {
            console.error('Error creating explosion:', error);
        }
    }

    // Add method to handle laser hits
    handleLaserHit() {
        console.log('Enemy ship hit! Health:', this.health);
        this.health--;
        if (this.health <= 0) {
            console.log('Enemy ship destroyed! Creating explosion...');
            this.createExplosion();
            this.body.markForRemoval = true;
        }
    }

    // Override onCollision to create explosion on collision
    onCollision(e, f, g) {
        console.log('Enemy ship collided! Creating explosion...');
        this.createExplosion();
        this.body.markForRemoval = true;
    }

    // Override onUpdate to ensure engine reference is set
    onUpdate(e, engine) {
        this.engine = engine;
        this.update(engine.getPhysics());
    }
} 