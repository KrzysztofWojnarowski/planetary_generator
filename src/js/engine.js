import Physics from "./engine/physics.js";
import Planets from "./planets.js";

export default class Engine {

   store = {
      system: [],
      physical: new Map(),
      animation: [],
      eventQueue: new Map()
   }
   #physics = {};
   constructor(physics) {
      this.#physics = physics;
   }

   registerPhysical(object) {
      if (typeof object.getBody === "function") {
         this.store.physical.set(object.entity.getUUID(), object.getBody());
      }
   }
   queueEvent(entityUUID, event, params) {
      this.store.eventQueue.set(crypto.randomUUID(), { uuid: entityUUID, event: event, params: params });
   }

   processEvents() {
      this.store.eventQueue.forEach((v, k) => {
         let element = this.store.system.find(e => e.entity.getUUID() === v.uuid);
         element.eventSystem.triggerEvent(v.event, ...v.params);
         this.store.eventQueue.delete(k);

      });
   }

   removePhysical(uuid) {
      this.store.physical.delete(uuid);
   }

   removeFromSystem(uuid) {
      this.store.system = this.store.system.filter(e => {
         return !(e.entity.getUUID() == uuid);
      });
   }

   removeMarked() {
      this.store.physical.forEach((e, k) => {
         if (e.markForRemoval == true) {
            this.removePhysical(k);
            this.removeFromSystem(k);
         }
      });
   }

   registerAnimation(object) {
      if (typeof object.animation === "object") {
         this.store.animation.push(object.animation);
      }
   }

   getParentOfPhysical(physical) {
      return this.store.system.find(e => e.getBody() == physical);
   }

   getByUUID(uuid) {
      return this.store.system.find(e => e.entity.getUUID == uuid);
   }

   updateAnimations() {
      this.store.animation.forEach(e => e.update());
   }

   setLoader(loader) {
      this.loader = loader;
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

   setStage(stage) {
      this.stage = stage;
   }
   getStage() {
      return this.stage;
   }


   restart() {

   }
   bindBackground(background) {
      this.background = background;
   }

   bindCamera(camera) {
      this.camera = camera;
   }
   bindContext(context) {
      this.context = context;
   }



   update() {
      this.store.physical.forEach((e, k) => {
         this.processPhysical(e);
         this.queueEvent(k, "onUpdate", [this]);
      });
      this.updateAnimations();
      this.processEvents();
      this.removeMarked();
   }
   processPhysical(e) {
      const physics = this.#physics;
      let physical = this.store.physical;
      physics.applyGravity(e, physical);
      let colliders = physics.getCollisions(e, physical);
      colliders.forEach((collider) => {
         physics.applyNonElasticCollision(e, collider);
         this.queueEvent(this.getParentOfPhysical(e).entity.getUUID(), "onCollided", [this.getParentOfPhysical(collider), this]);
      });

   }
   redraw() {
      let objects = this.store.system;
      let context = this.context;
      context.reset();
      this.background.draw(context);
      let camera = this.camera;
      let offset = camera.position;
      context.translate(offset[0], offset[1]);
      objects.forEach(e => {
         e.draw(context);
      });
      this.store.animation.forEach(e => e.draw(this.context));
   }




}