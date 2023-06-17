export default class Camera {

    position = [5000, 5000];
    zoom = 0.1;
    angle =[0,Math.PI/2];

    constructor(config = {
        position:[0,0],
        zoom:1,
        angle:[0,Math.PI/2]
    }){
        this.position = config.position;
        this.zoom = config.zoom;
        this.angle = config.angle;
    }


    move(vector) {
        this.position[0] += vector[0];
        this.position[1] += vector[1];
    }
    zoomIn() {
        this.zoom *= 2;
    }

    zoomOut() {
        this.zoom *= 0.5
    }

    rotate(angle){
        this.angle = [this.angle[0]+angle[0],this.angle[1]+angle[1]];
    }

    moveTo(x,y){
        this.position = [x,y];
    }
    

}