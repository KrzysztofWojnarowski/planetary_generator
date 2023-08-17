export default class Engine {
   builder = null;

   store = {
      system: [],
      physical: new Map(),
      animation: [],
      drawable:[],
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
         console.log(v,k);
         let element = this.store.system.find(e => e.entity.getUUID() === v.uuid);
         element.eventSystem.triggerEvent(v.event, ...v.params);
         this.store.eventQueue.delete(k);

      });
   }

   getPhysicals(){
      return this.store.physical;
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

   registerDrawable(object) {
      if (typeof object.drawable === "object") {
         this.store.drawable.push(object);
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
   updateDrawables() {
      this.store.drawable.forEach(e => e.update.apply(e));
   }

   setLoader(loader) {
      this.loader = loader;
   }

   getPhysics() {
      return this.#physics;
   }

   loadSystem(system) {
      this.store.system = system;
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
      this.updateDrawables();
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
      this.store.drawable.forEach(e => {
         if(typeof e.draw == 'function') {
            e.draw.apply(e)
         }
      });
   }

   async assemble(assemblingFunction) {
      await assemblingFunction(this)
   }
}