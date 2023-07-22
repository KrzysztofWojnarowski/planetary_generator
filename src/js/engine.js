import Physics from "./physics.js";
import Planets from "./planets.js";

export default class Engine {

   store = {
      context: {},
      system: [],
   }
   #physics = {};
   #effectManager ={};
   constructor(physics,effectManager) {
      this.#physics = physics;
      this.#effectManager = effectManager;
   }

   getPhysics(){
      return this.#physics;
   }

   init(canvas,system) {
      this.restart();
      this.store.context = canvas;
      this.loadSystem(system);
   }

   loadSystem(system){
      this.store.system = system;
   }

   restart(){
      
   }

   applyPhysics() {
      return this.store.system.map(celestialPrim => {
         let a = celestialPrim.getBody();
         let f = [0,0];    
         let ret = Object.assign({}, a);
         ret.markForRemoval=false;
         this.store.system.forEach(celestialSec => {
            let b =celestialSec.getBody();
            if (a !== b) {
               let mutated = this.#effectManager.applyCollision(a,b);
               ret = mutated[0];
               f = this.#physics.vectorSum(f, this.#physics.calculateForce(a, b));
            }
         });
         ret.fx = f[0];
         ret.fy = f[1];
         let newPosition = this.#physics.calculatePosition(ret);
         let newVelocity = this.#physics.calculateSpeed(ret);
         ret.x=newPosition[0];
         ret.y= newPosition[1];
         ret.vx= newVelocity[0];
         ret.vy = newVelocity[1];
         celestialPrim.setBody(ret);
         return celestialPrim;
      });
   }
   update() {
      let system = this.applyPhysics(this.store.system);
      system.forEach(c=>{
         let shallStay = !c.getBody().markForRemoval;
         let es = c.eventSystem;
         shallStay?es.triggerEvent("onUpdate",this):es.triggerEvent("onRemove",this);
      });
      this.store.system = system.filter(c=>!c.getBody().markForRemoval);
      
      
   }
}