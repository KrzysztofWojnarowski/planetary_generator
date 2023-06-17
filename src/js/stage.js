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
    setBackground(background){
        this.#background = background;
    }

    drawBackground(){
        const background = this.#background;
        const backgroundImage = background.getImage();
        const position = background.position;
        const size = background.size
        const context = this.#context;
        context.fillRect(0,0,size[0],size[1]);
        context.drawImage(backgroundImage,position[0],position[1],size[0],size[1]);
    }

    redraw(objects) {
        let context = this.#context;
        context.reset();
        this.drawBackground();
        let camera = this.camera;
        let offset = camera.position;
        let zoom = camera.zoom;
        context.scale(zoom, zoom);
        context.translate(offset[0], offset[1]);
        objects.forEach(e => {
            e.draw(context);
        }
        )
    }


}