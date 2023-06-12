export default class Stage {

    container = [];
    #context = {};
    #size = [2000, 2000];
    #stroke = "#ffddaa";
    #fill = "ff4455";
    camera = {};
    constructor(context,camera) {
        this.#context = context;
        this.camera = camera;
    }
    setSize(w, h) {
        this.#size = [x, y];
    }
    setStroke(stroke) {
        this.#stroke = stroke;
    }
    setFill(fill) {
        this.#fill = fill;
    }  
    applyStroke() {
        this.#context.strokeStyle = this.#stroke;
    }
    applyFill() {
        this.#context.fillStyle = this.#fill;
    }
    add(object) {
        this.container.push(object);
    };
    remove(object) {
        return this.container.filter((e, i) => e === object && this.container.splice(i, 1));
    }
    redraw(objects) {
        let size = this.#size;
        let camera = this.camera;
        let offset = camera.position;
        let zoom = camera.zoom;
        let angle = camera.angle;
        this.#context.clearRect(0,0,size[0], size[1]);
        objects.forEach(e => {
            this.#context.beginPath(); 
            let radius = e.r;
            e.type==="star"&&camera.moveTo(800-e.x,400-e.y);

            this.#context.fillStyle = e.type=="planet"?"blue":"red";
            this.#context.arc(Math.cos(angle[0])*zoom*(offset[0]+e.x),Math.sin(angle[1])*zoom*(offset[1]+e.y),zoom*radius, 0,Math.PI*2);
            this.#context.closePath();
            this.#context.fill();
        }
        )
    }


}