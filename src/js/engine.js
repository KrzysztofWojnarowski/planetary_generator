import Physics from "./engine/physics.js";
import Planets from "./planets.js";

export default class Engine {

   store = {
      context: {},
      system: [],
   }
   #physics = {};
   physicsTargets = [];
   effectManager = {};
   constructor(physics, effectManager) {
      this.#physics = physics;
      this.effectManager = effectManager;
   }

   getPhysics() {
      return this.#physics;
   }

   init(canvas, system) {
      this.restart();
      this.store.context = canvas;
      this.loadSystem(system);
   }

   loadSystem(system) {
      this.store.system = system;
   }

   restart() {

   }

   applyPhysics() {
      return this.store.system.map(celestialPrim => {
         let a = celestialPrim.getBody();
         let f = [0, 0];
         let ret = Object.assign({}, a);
         this.store.system.forEach(celestialSec => {
            let b = celestialSec.getBody();
            if (celestialPrim!=celestialSec){
               this.physicsTargets = [celestialPrim,celestialSec,ret];
               if(this.#physics.isCollision(a,b)){
                  celestialPrim.eventSystem.triggerEvent("onCollided",this);
               }else{
                 f = this.#physics.vectorSum(f, this.#physics.calculateForce(a, b));
                 
               }
            }
         });
         a.fx = f[0];
         a.fy = f[1];
         let newPosition = this.#physics.calculatePosition(ret);
         let newVelocity = this.#physics.calculateSpeed(ret);
         a.x = newPosition[0];
         a.y = newPosition[1];
         a.vx = newVelocity[0];
         a.vy = newVelocity[1];
         celestialPrim.eventSystem.triggerEvent("onUpdate", this);
         return celestialPrim;
      });
   }
   update() {
      let system = this.applyPhysics(this.store.system);
      this.store.system = system.filter(c => !c.getBody().markForRemoval);


   }
}