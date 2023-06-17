import Physics from "./physics.js";
import Planets from "./planets.js";

export default class Engine {

   store = {
      context: {},
      system: [],
   }
   #physics = {};
   #planets = {};
   #effectManager ={};
   constructor(physics,planets,effectManager) {
      this.#physics = physics;
      this.#planets = planets;
      this.#effectManager = effectManager;
   }

   init() {
      this.restart();
      let canvas = document.querySelector("canvas");
      this.store.context = canvas.getContext("2d");
   }

   restart(){
      let planets = this.#planets;
      this.store.system = planets.buildSystem(1, 19,100);
   }

   applyPhysics() {
      return this.store.system.map(a => {
         let f = [0, 0];    
         let ret = Object.assign({}, a);
         ret.markForRemoval=false;
         this.store.system.forEach(b => {
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
         return ret;
      });
   }
   update() {
      let system = this.applyPhysics(this.store.system);
      this.store.system = system.filter(c=>!c.markForRemoval);
      
      
   }
}