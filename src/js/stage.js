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
        this.#context.clearRect(0,0,size[0], size[1]);
        this.#context.fillText(objects[4].fx+" / "+objects[4].fy,100,100);
        objects.forEach(e => {
            this.#context.beginPath();       
            let xs =( e.x - 5 );
            let ys =(e.y - 5);
            let w = 10;
            let h = 10;
            this.#context.fillStyle = e.type=="planet"?"blue":"red";
            this.#context.rect(zoom*(offset[0]+xs),zoom*(offset[1]+ys), zoom*w, zoom*h);
            this.#context.closePath();
            this.#context.fill();
        }
        )
    }


}