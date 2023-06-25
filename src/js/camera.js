export default class Camera {

    position = [5000, 5000];
    zoom = 0.1;
    angle = [0, Math.PI / 2];
    target = {};
    width = 0;
    height = 0;
    velocity = [0, 0];
    allowedRange = [this.width*0.4,this.height*0.4];


    constructor(config = {
        position: [0, 0],
        zoom: 1,
        angle: [0, Math.PI / 2]
    }) {
        this.position = config.position;
        this.zoom = config.zoom;
        this.angle = config.angle;
    }
    setVisibleWindow(w, h) {
        this.width = w;
        this.height = h;
        this.setAllowedRange();
    }

    setAllowedRange(){
       this.allowedRange = [this.width*0.4,this.height*0.4];
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

    rotate(angle) {
        this.angle = [this.angle[0] + angle[0], this.angle[1] + angle[1]];
    }

    moveTo(x, y) {
        this.position = [x, y];
    }

    lockOn(target) {
        this.target = target;
    }

    update() {
        let range = this.getRange();
        let cameraPosition = this.position;
        if (range[0]>this.allowedRange[0]){
            cameraPosition = [
                cameraPosition[0] +(this.allowedRange[0]-range[0]),
                cameraPosition[1]
            ]
        }
        if (range[0]<-this.allowedRange[0]){
            cameraPosition = [
                cameraPosition[0] +(-this.allowedRange[0]-range[0]),
                cameraPosition[1]
            ]
        }

        if (range[1]<-this.allowedRange[1]){
            cameraPosition = [
                cameraPosition[0],
                cameraPosition[1] +(-this.allowedRange[1]-range[1]),
            ]
        }
        if (range[1]>this.allowedRange[1]){
            cameraPosition = [
                cameraPosition[0],
                cameraPosition[1] +(this.allowedRange[1]-range[1]),
            ]
        }

        
        this.moveTo(cameraPosition[0], cameraPosition[1]);
    }

    getRange() {
        return [
            this.position[0] + this.target.x-this.width/2,
            this.position[1] + this.target.y-this.height/2
        ];
    }



}