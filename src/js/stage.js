export default class Stage {

    container = [];
    #context = {};
    #background = {};
    camera = {};
    constructor(context, camera) {
        this.#context = context;
        this.camera = camera;
    }

    add(object) {
        this.container.push(object);
    };
    remove(object) {
        return this.container.filter((e, i) => e === object && this.container.splice(i, 1));
    }
    isLoaded(system) {
        return system.reduce((e, f) => e && f.getSprite().isLoaded(), true);

    }
    setBackground(background) {
        this.#background = background;
    }
    redraw(objects) {
        let context = this.#context;
        context.reset();
        this.#background.draw(context);
        let camera = this.camera;
        let offset = camera.position;
        context.translate(offset[0], offset[1]);
        objects.forEach(e => {
            e.draw(context);
        }
        )
    }


}