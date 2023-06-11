import Physics from "./physics.js";
import Planets from "./planets.js";

export default class Engine {

   store = {
      context: {},
      system: [],
   }
   #physics = {};
   #planets = {};
   constructor(physics,planets) {
      this.#physics = physics;
      this.#planets = planets;
   }

   init() {
      this.restart();
      let canvas = document.querySelector("canvas");
      this.store.context = canvas.getContext("2d");
   }

   restart(){
      let planets = this.#planets;
      this.store.system = planets.buildSystem(3, 16);
   }

   applyPhysics() {

      return this.store.system.map(a => {
         let f = [0, 0];
       
         this.store.system.forEach(b => {
            if (a !== b) {
               f = this.#physics.vectorSum(f, this.#physics.calculateForce(a, b));
            }
         });
         let ret = Object.assign({}, a);
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
      this.store.system = this.applyPhysics(this.store.system);
   }
}