import Planets from "./planets.js";

export default class Engine {

   store = {
      context: {},
      system: {},
   }

   init() {
      let planets = new Planets();
      let canvas = document.querySelector("canvas");
      this.store.context = canvas.getContext("2d");
      this.store.system = planets.buildSystem(2, 12);
      console.log(this.store);
   }

   animate() { }
   update() { }
}