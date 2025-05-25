import SpaceShip from "./spaceship";
import EventSystem from "../../engine/eventSystem";
import Explode from "./explode";
import spaceshiptypes from "./spaceshiptypes";

export default class EnemyShip extends SpaceShip {
    constructor() {
        super();
        // Set initial position
        this.position = [0, 1900];
        this.body.x = this.position[0];
        this.body.y = this.position[1];
        
        // Set initial velocity
        this.body.vx = 0;
        this.body.vy = 0;
        
        // Set radius
        this.body.r = 30;
        
        // Add health
        this.health = 30;
        
        // Override the mesh with heavy cruiser type
        const heavyCruiserMesh = JSON.parse(JSON.stringify(spaceshiptypes.heavyCruiser));
        this.setMesh(heavyCruiserMesh);
        
        // Set constant energy level for enemy
        this.getMesh().energy = 100;
        this.getMesh().energyCapacity = 100;
        
        // Initialize lasers array
        this.lasers = [];
        
        // Add delay timer
        this.startTime = Date.now();
        this.delayTime = 5000; // 2 seconds delay
        this.isActive = false;
        
        // Load the ship image
        this.load().then(image => {
            this.setImage(image);
            this.setLoaded(true);
        });
        
        // AI state
        this.targetPosition = null;
        this.lastDecisionTime = 0;
        this.decisionInterval = 50;
        this.lastShootTime = 0;
        this.shootCooldown = 500;
        this.safeDistance = 200;
        this.orbitTarget = null;
        this.orbitRadius = 1500;
        this.orbitAngle = 0;
        this.avoidanceRadius = 1000;  // Increased from 800 to 1000
        this.avoidanceForce = 4.0;    // Increased from 2.0 to 4.0
        this.avoidanceLookAhead = 600; // Increased from 400 to 600
        this.shipAvoidanceRadius = 600;  // Increased from 400 to 600
        this.shipAvoidanceForce = 3.0;   // Increased from 1.5 to 3.0
        this.minSafeDistance = 300;      // Increased from 150 to 300
        this.emergencyAvoidanceRadius = 400;  // Increased from 250 to 400
        this.emergencyAvoidanceForce = 4.0;   // Increased from 2.0 to 4.0
        this.planetEmergencyRadius = 600;     // Increased from 400 to 600
        this.planetEmergencyForce = 5.0;      // Increased from 3.0 to 5.0
        this.maxSpeed = 0.03;  // Reduced from 0.05 to 0.03
        this.lastAvoidanceDx = 0;
        this.lastAvoidanceDy = 0;
        this.avoidanceSmoothing = 0.2;
        this.minMovementThreshold = 0.1;
        this.idealDistance = 500;
        
        // Position history for better prediction
        this.positionHistory = [];
        this.maxHistoryFrames = 120;
        this.predictionFrames = 30;
        
        // Store last known player position and velocity for prediction
        this.lastPlayerPos = null;
        this.lastPlayerVel = null;
        
        // Hit tracking and learning
        this.lastHitTime = 0;
        this.hitReward = 1000;  // High reward for hitting
        this.missPenalty = 50;  // Small penalty for missing
        this.currentReward = 0;
        this.learningRate = 0.1;  // How quickly the enemy learns
        this.shootConfidence = 0.5;  // Initial confidence in shooting
        this.minShootConfidence = 0.3;  // Minimum confidence to shoot
        this.maxShootConfidence = 0.9;  // Maximum confidence to shoot
        this.successfulShots = 0;
        this.totalShots = 0;
        this.shotHistory = [];  // Keep track of last 10 shots
        this.maxShotHistory = 10;
        
        // Create new empty event system
        this.eventSystem = new EventSystem(this);
        this.eventSystem.registerEvent("onCollided");
        this.eventSystem.registerEvent("onUpdate");
        
        // Add event listeners
        this.eventSystem.addListener("onUpdate", (ship, engine) => {
            this.engine = engine;
            this.update(engine.getPhysics());
        });
        
        // Override collision handling
        this.onCollision = (other) => {
            if (other.constructor.name === 'Planet') {
                if (other.isStar) {
                    // Handle star collision like spaceship
                    console.log('Enemy ship collided with star!');
                    this.createExplosion();
                    this.body.markForRemoval = true;
                } else {
                    // Handle regular planet collision
                    console.log('Enemy ship collided with planet!');
                    this.createExplosion();
                    this.body.markForRemoval = true;
                }
            }
        };

        // Override update to handle laser updates and rewards
        this.update = (physics) => {
            const currentTime = Date.now();
            
            // Check if delay period is over
            if (!this.isActive && currentTime - this.startTime >= this.delayTime) {
                this.isActive = true;
                console.log('Enemy ship activated after delay');
            }
            
            // Check if marked for removal
            if (this.body.markForRemoval) {
                return;
            }
            
            // Apply basic physics and bounds checking regardless of active state
            this.applyPhysics(physics);
            this.keepWithinBounds();
            
            // Only make decisions and take actions if active
            if (this.isActive) {
                // Make decisions very frequently for better control
                if (currentTime - this.lastDecisionTime > this.decisionInterval) {
                    this.makeDecision();
                    this.lastDecisionTime = currentTime;
                }
                
                // Execute current decision
                this.executeDecision();
                
                // Maintain constant energy level
                this.getMesh().energy = 100;

                // Update laser positions and check for collisions
                if (this.lasers && this.lasers.length > 0) {
                    this.lasers = this.lasers.filter(laser => {
                        if (!laser.active) return false;

                        // Update laser position
                        laser.x += Math.cos(laser.angle) * laser.speed;
                        laser.y += Math.sin(laser.angle) * laser.speed;
                        
                        // Check for collisions with player ship
                        if (this.engine && this.engine.store && this.engine.store.system) {
                            for (const obj of this.engine.store.system) {
                                if (obj instanceof SpaceShip && obj.constructor.name === 'SpaceShip' && obj !== this) {
                                    const dx = laser.x - obj.body.x;
                                    const dy = laser.y - obj.body.y;
                                    const distance = Math.sqrt(dx * dx + dy * dy);
                                    
                                    if (distance < obj.body.r) {
                                        console.log('Enemy laser hit player ship!');
                                        this.lastHitTime = currentTime;
                                        this.currentReward += this.hitReward;
                                        this.successfulShots++;
                                        console.log('Hit reward:', this.hitReward, 'Total reward:', this.currentReward);
                                        
                                        // Update learning based on successful hit
                                        this.updateLearningFromHit(laser);
                                        
                                        // Call player's handleLaserHit method
                                        obj.handleLaserHit();
                                        return false; // Remove this laser
                                    }
                                }
                            }
                        }
                        
                        // Remove laser after 500ms
                        if (currentTime - laser.createdAt > 500) {
                            if (!laser.hit) {
                                this.currentReward -= this.missPenalty;
                                console.log('Miss penalty:', this.missPenalty, 'Total reward:', this.currentReward);
                                
                                // Update learning based on miss
                                this.updateLearningFromMiss(laser);
                            }
                            return false;
                        }
                        
                        return true; // Keep laser if no collision and not expired
                    });
                }

                // Try to shoot at player if in range
                if (this.targetPosition) {
                    const dx = this.targetPosition[0] - this.body.x;
                    const dy = this.targetPosition[1] - this.body.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 800) {
                        this.shoot();
                    }
                }
            }
        };

        // Override shoot method to implement AI shooting with improved prediction and learning
        this.shoot = () => {
            const currentTime = Date.now();
            if (this.targetPosition && currentTime - this.lastShootTime > this.shootCooldown) {
                // Get predicted position using historical data
                const predictedPos = this.predictPlayerPosition();
                const targetPos = predictedPos || this.targetPosition;
                
                // Calculate angle to predicted position
                const dx = targetPos[0] - this.body.x;
                const dy = targetPos[1] - this.body.y;
                const angleToTarget = Math.atan2(dy, dx);
                
                // Only shoot if we're reasonably aligned with the target (within 30 degrees)
                const angleDiff = Math.abs(this.rotation - angleToTarget);
                if (angleDiff < Math.PI / 6) { // 30 degrees
                    // Calculate distance to target
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Update shooting confidence based on history
                    this.updateShootConfidence();
                    
                    // Decide whether to shoot based on confidence and distance
                    const shouldShoot = this.shootConfidence > this.minShootConfidence && 
                                      distance < 800;  // Removed safe distance check
                    
                    if (shouldShoot) {
                        this.rotation = angleToTarget;
                        
                        // Create laser beam
                        const laser = {
                            x: this.body.x,
                            y: this.body.y,
                            angle: this.rotation,
                            length: 100,
                            width: 2,
                            speed: 10,
                            active: true,
                            createdAt: currentTime,
                            hit: false,
                            predictedPos: targetPos,  // Store predicted position for learning
                            actualPos: this.targetPosition  // Store actual position for learning
                        };

                        // Add laser to our lasers array
                        this.lasers.push(laser);
                        this.lastShootTime = currentTime;
                        this.totalShots++;
                        
                        // Add to shot history
                        this.shotHistory.push({
                            predictedPos: targetPos,
                            actualPos: this.targetPosition,
                            distance: distance,
                            angle: angleToTarget,
                            timestamp: currentTime
                        });
                        
                        // Keep history at max length
                        if (this.shotHistory.length > this.maxShotHistory) {
                            this.shotHistory.shift();
                        }
                        
                        console.log('Enemy shooting with confidence:', this.shootConfidence.toFixed(2));
                    }
                }
            }
        };

        // Update shooting confidence based on history
        this.updateShootConfidence = () => {
            if (this.shotHistory.length === 0) return;
            
            // Calculate success rate from history
            const recentSuccesses = this.shotHistory.filter(shot => {
                const dx = shot.predictedPos[0] - shot.actualPos[0];
                const dy = shot.predictedPos[1] - shot.actualPos[1];
                const predictionError = Math.sqrt(dx * dx + dy * dy);
                return predictionError < 50;  // Consider a shot successful if prediction error is less than 50 pixels
            }).length;
            
            const successRate = recentSuccesses / this.shotHistory.length;
            
            // Update confidence using learning rate
            this.shootConfidence = this.shootConfidence * (1 - this.learningRate) + 
                                 successRate * this.learningRate;
            
            // Clamp confidence between min and max
            this.shootConfidence = Math.max(this.minShootConfidence, 
                                          Math.min(this.maxShootConfidence, this.shootConfidence));
            
            console.log('Updated shoot confidence:', this.shootConfidence.toFixed(2), 
                       'Success rate:', (successRate * 100).toFixed(1) + '%');
        };

        // Override energy consumption methods
        this.consumeEnergy = (amount) => {
            // Do nothing - enemy has infinite energy
            return true;
        };

        this.canConsumeEnergy = (amount) => {
            // Always return true - enemy can always use energy
            return true;
        };

        // Override keyboard state handling - not needed for AI
        this.handleKeyboardState = () => {};
        this.keyPressed = () => {};
        this.keyReleased = () => {};
    }

    // Find nearest star
    findNearestStar() {
        if (!this.engine || !this.engine.store || !this.engine.store.system) return null;
        
        const stars = this.engine.store.system.filter(obj => 
            obj.constructor.name === 'Planet' && obj.isStar
        );

        let nearestStar = null;
        let minDistance = Infinity;

        for (const star of stars) {
            const dx = this.body.x - star.body.x;
            const dy = this.body.y - star.body.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestStar = star;
            }
        }

        return nearestStar;
    }

    // AI decision making
    makeDecision() {
        if (!this.engine) return;

        // Find player ship
        const playerShip = this.findPlayerShip();
        if (playerShip) {
            // Add current position to history
            this.positionHistory.push({
                x: playerShip.body.x,
                y: playerShip.body.y,
                time: Date.now()
            });
            
            // Keep history at max length
            if (this.positionHistory.length > this.maxHistoryFrames) {
                this.positionHistory.shift();
            }
            
            // Update target position
            this.targetPosition = [playerShip.body.x, playerShip.body.y];
        }

        // Only consider orbital mechanics if we're too far from the player
        const nearestStar = this.findNearestStar();
        if (nearestStar && this.targetPosition) {
            const dx = this.targetPosition[0] - this.body.x;
            const dy = this.targetPosition[1] - this.body.y;
            const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);
            
            // If we're too far from the player, use star for positioning
            if (distanceToPlayer > 1000) {
                const starDx = this.body.x - nearestStar.body.x;
                const starDy = this.body.y - nearestStar.body.y;
                const distanceToStar = Math.sqrt(starDx * starDx + starDy * starDy);
                
                // If we're too close to the star, move away
                if (distanceToStar < this.orbitRadius * 0.8) {
                    this.orbitTarget = null;
                }
                // Try to enter orbit if we're at a good distance
                else if (distanceToStar > this.orbitRadius * 0.8 && distanceToStar < this.orbitRadius * 1.2) {
                    this.orbitTarget = nearestStar;
                    this.orbitAngle = Math.atan2(starDy, starDx);
                }
            } else {
                // If we're close to the player, abandon orbital mechanics
                this.orbitTarget = null;
            }
        }
    }

    // Execute current decision
    executeDecision() {
        if (!this.targetPosition) return;

        // Calculate distance to player
        const dx = this.targetPosition[0] - this.body.x;
        const dy = this.targetPosition[1] - this.body.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate avoidance force from nearby planets and player
        let avoidDx = 0;
        let avoidDy = 0;
        
        if (this.engine && this.engine.store && this.engine.store.system) {
            // Handle planet avoidance
            const planets = this.engine.store.system.filter(obj => 
                obj.constructor.name === 'Planet' && !obj.isStar
            );

            // Calculate look-ahead position
            const lookAheadX = this.body.x + Math.cos(this.rotation) * this.avoidanceLookAhead;
            const lookAheadY = this.body.y + Math.sin(this.rotation) * this.avoidanceLookAhead;

            // Planet avoidance
            for (const planet of planets) {
                const currentDx = this.body.x - planet.body.x;
                const currentDy = this.body.y - planet.body.y;
                const currentDistance = Math.sqrt(currentDx * currentDx + currentDy * currentDy);

                const lookAheadDx = lookAheadX - planet.body.x;
                const lookAheadDy = lookAheadY - planet.body.y;
                const lookAheadDistance = Math.sqrt(lookAheadDx * lookAheadDx + lookAheadDy * lookAheadDy);

                const planetDistance = Math.min(currentDistance, lookAheadDistance);
                const planetDx = planetDistance === currentDistance ? currentDx : lookAheadDx;
                const planetDy = planetDistance === currentDistance ? currentDy : lookAheadDy;

                if (planetDistance < this.avoidanceRadius) {
                    // Calculate avoidance force with stronger falloff
                    const force = this.avoidanceForce * Math.pow(1 - planetDistance / this.avoidanceRadius, 2);
                    const angle = Math.atan2(planetDy, planetDx);
                    
                    // Add perpendicular component to steer around the planet
                    const perpendicularAngle = angle + Math.PI/2;
                    avoidDx += Math.cos(perpendicularAngle) * force * 2.0;
                    avoidDy += Math.sin(perpendicularAngle) * force * 2.0;

                    // If very close, add strong direct avoidance
                    if (planetDistance < this.planetEmergencyRadius) {
                        const emergencyForce = this.planetEmergencyForce * Math.pow(1 - planetDistance / this.planetEmergencyRadius, 2);
                        avoidDx += Math.cos(angle) * emergencyForce * 3.0;
                        avoidDy += Math.sin(angle) * emergencyForce * 3.0;
                    }
                }
            }

            // Player avoidance
            const playerShip = this.findPlayerShip();
            if (playerShip) {
                const playerDx = this.body.x - playerShip.body.x;
                const playerDy = this.body.y - playerShip.body.y;
                const playerDistance = Math.sqrt(playerDx * playerDx + playerDy * playerDy);

                if (playerDistance < this.shipAvoidanceRadius) {
                    const force = this.shipAvoidanceForce * (1 - playerDistance / this.shipAvoidanceRadius);
                    const angle = Math.atan2(playerDy, playerDx);
                    
                    // Add perpendicular component to steer around the player
                    const perpendicularAngle = angle + Math.PI/2;
                    avoidDx += Math.cos(perpendicularAngle) * force * 2.0;
                    avoidDy += Math.sin(perpendicularAngle) * force * 2.0;

                    // If too close, add direct avoidance
                    if (playerDistance < this.minSafeDistance) {
                        const emergencyForce = this.emergencyAvoidanceForce * (1 - playerDistance / this.minSafeDistance);
                        avoidDx += Math.cos(angle) * emergencyForce * 3.0;
                        avoidDy += Math.sin(angle) * emergencyForce * 3.0;
                    }
                }
            }
        }

        // Smooth avoidance forces
        avoidDx = this.lastAvoidanceDx * (1 - this.avoidanceSmoothing) + avoidDx * this.avoidanceSmoothing;
        avoidDy = this.lastAvoidanceDy * (1 - this.avoidanceSmoothing) + avoidDy * this.avoidanceSmoothing;
        this.lastAvoidanceDx = avoidDx;
        this.lastAvoidanceDy = avoidDy;

        // Calculate desired movement direction
        let targetX = this.targetPosition[0];
        let targetY = this.targetPosition[1];

        // Add avoidance force to target position
        targetX += avoidDx * 3000;
        targetY += avoidDy * 3000;

        // Calculate direction to adjusted target
        const moveDx = targetX - this.body.x;
        const moveDy = targetY - this.body.y;
        const moveAngle = Math.atan2(moveDy, moveDx);

        // Only update rotation if movement is significant
        const movementMagnitude = Math.sqrt(moveDx * moveDx + moveDy * moveDy);
        if (movementMagnitude > this.minMovementThreshold) {
            this.rotation = moveAngle;
        }

        // Adjust thrust based on distance to player
        let thrustForce;
        if (distance > this.idealDistance * 1.5) {
            thrustForce = 0.2;  // Reduced from 0.3 to 0.2
        } else if (distance < this.idealDistance * 0.5) {
            thrustForce = 0.05;  // Reduced from 0.1 to 0.05
        } else {
            thrustForce = 0.15;  // Reduced from 0.2 to 0.15
        }

        // Apply thrust
        this.body.vx += Math.cos(moveAngle) * thrustForce;
        this.body.vy += Math.sin(moveAngle) * thrustForce;

        // Apply additional avoidance force
        if (Math.abs(avoidDx) > 0 || Math.abs(avoidDy) > 0) {
            this.body.vx += avoidDx * this.avoidanceForce * 1.5;  // Reduced from 2.0 to 1.5
            this.body.vy += avoidDy * this.avoidanceForce * 1.5;
        }
    }

    // Apply physics forces
    applyPhysics(physics) {
        if (!physics) return;

        // Apply gravity from planets
        const planets = this.engine.store.system.filter(obj => 
            obj.constructor.name === 'Planet'
        );

        for (const planet of planets) {
            const dx = planet.body.x - this.body.x;
            const dy = planet.body.y - this.body.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                const force = physics.G * planet.body.m / (distance * distance);
                const angle = Math.atan2(dy, dx);
                
                this.body.vx += force * Math.cos(angle);
                this.body.vy += force * Math.sin(angle);
            }
        }

        // Apply velocity limits
        const currentSpeed = Math.sqrt(this.body.vx * this.body.vx + this.body.vy * this.body.vy);
        if (currentSpeed > this.maxSpeed) {
            const scale = this.maxSpeed / currentSpeed;
            this.body.vx *= scale;
            this.body.vy *= scale;
        }
    }

    // Keep ship within bounds
    keepWithinBounds() {
        const bounds = 2000;
        const margin = 100;

        // X bounds
        if (this.body.x < -bounds + margin) {
            this.body.x = -bounds + margin;
            this.body.vx = Math.abs(this.body.vx);
        } else if (this.body.x > bounds - margin) {
            this.body.x = bounds - margin;
            this.body.vx = -Math.abs(this.body.vx);
        }

        // Y bounds
        if (this.body.y < -bounds + margin) {
            this.body.y = -bounds + margin;
            this.body.vy = Math.abs(this.body.vy);
        } else if (this.body.y > bounds - margin) {
            this.body.y = bounds - margin;
            this.body.vy = -Math.abs(this.body.vy);
        }
    }

    // Find player ship
    findPlayerShip() {
        if (!this.engine || !this.engine.store || !this.engine.store.system) return null;
        
        return this.engine.store.system.find(obj => 
            obj.constructor.name === 'SpaceShip' && 
            obj !== this
        );
    }

    // Override draw method to include laser drawing
    draw(context) {
        super.draw(context);
        
        // Draw active lasers
        if (this.lasers && this.lasers.length > 0) {
            this.lasers.forEach((laser) => {
                if (laser.active) {
                    context.save();
                    context.translate(laser.x, laser.y);
                    context.rotate(laser.angle);
                    
                    // Draw green laser beam
                    context.beginPath();
                    context.strokeStyle = 'lime';
                    context.lineWidth = laser.width;
                    context.moveTo(0, 0);
                    context.lineTo(laser.length, 0);
                    context.stroke();
                    context.restore();
                }
            });
        }
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
        
        // Create small explosion at hit point
        this.createSmallExplosion();
        
        if (this.health <= 0) {
            console.log('Enemy ship destroyed! Creating explosion...');
            this.createExplosion();
            this.body.markForRemoval = true;
        }
    }

    // Helper method to create small explosion
    createSmallExplosion() {
        if (!this.engine) {
            console.error('Engine not available for explosion');
            return;
        }

        try {
            let explosion = new Explode();
            
            const gameImages = this.engine.loader.getGameImages();
            if (!gameImages || !gameImages.explosionSheet) {
                console.error('Explosion sheet not available');
                return;
            }
            
            explosion.sprite.setImage(gameImages.explosionSheet.getImage());
            explosion.animation.position = [this.body.x, this.body.y];
            explosion.animation.size = [30, 30];  // Increased to 30px explosion
            
            if (this.engine.store && this.engine.store.system) {
                this.engine.store.system.push(explosion);
                this.engine.registerAnimation(explosion);
            }
        } catch (error) {
            console.error('Error creating small explosion:', error);
        }
    }

    // Predict player position using historical data
    predictPlayerPosition() {
        if (this.positionHistory.length < 2) return null;
        
        // Calculate average velocity from history
        let totalVx = 0;
        let totalVy = 0;
        let count = 0;
        
        // Use last 120 frames of history
        const historyLength = Math.min(this.positionHistory.length, this.maxHistoryFrames);
        for (let i = 1; i < historyLength; i++) {
            const prev = this.positionHistory[i - 1];
            const curr = this.positionHistory[i];
            totalVx += curr.x - prev.x;
            totalVy += curr.y - prev.y;
            count++;
        }
        
        // Calculate average velocity
        const avgVx = totalVx / count;
        const avgVy = totalVy / count;
        
        // Get latest position
        const latestPos = this.positionHistory[this.positionHistory.length - 1];
        
        // Predict future position
        const predictedX = latestPos.x + (avgVx * this.predictionFrames);
        const predictedY = latestPos.y + (avgVy * this.predictionFrames);
        
        return [predictedX, predictedY];
    }

    // Update learning from successful hit
    updateLearningFromHit(laser) {
        // Calculate prediction accuracy
        const dx = laser.predictedPos[0] - laser.actualPos[0];
        const dy = laser.predictedPos[1] - laser.actualPos[1];
        const predictionError = Math.sqrt(dx * dx + dy * dy);
        
        // Update prediction frames based on accuracy
        if (predictionError < 30) {
            // If prediction was very accurate, increase prediction frames
            this.predictionFrames = Math.min(this.predictionFrames + 1, 60);
        } else if (predictionError > 100) {
            // If prediction was poor, decrease prediction frames
            this.predictionFrames = Math.max(this.predictionFrames - 1, 10);
        }
        
        console.log('Learning from hit - Prediction error:', predictionError.toFixed(1),
                   'New prediction frames:', this.predictionFrames);
    }

    // Update learning from miss
    updateLearningFromMiss(laser) {
        // Calculate prediction accuracy
        const dx = laser.predictedPos[0] - laser.actualPos[0];
        const dy = laser.predictedPos[1] - laser.actualPos[1];
        const predictionError = Math.sqrt(dx * dx + dy * dy);
        
        // If miss was due to poor prediction, adjust prediction frames
        if (predictionError > 100) {
            this.predictionFrames = Math.max(this.predictionFrames - 2, 10);
            console.log('Learning from miss - Prediction error:', predictionError.toFixed(1),
                       'New prediction frames:', this.predictionFrames);
        }
    }
} 