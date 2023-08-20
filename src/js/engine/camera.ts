import { PositionCordinates } from "./models/position.model";
import { Vector } from "./models/vector.model";

export type CameraTarget = any;

export class Camera {
    position: PositionCordinates = [5000, 5000];
    zoom = 0.1;
    angle = [0, Math.PI / 2];
    target: CameraTarget = null;
    width = 0;
    height = 0;
    velocity = [0, 0];
    allowedRange = [this.width*0.2,this.height*0.2];

    constructor(config = {
        position: [0, 0],
        zoom: 1,
        angle: [0, Math.PI / 2]
    }) {
        this.position = config.position as PositionCordinates;
        this.zoom = config.zoom;
        this.angle = config.angle;
    }
    setVisibleWindow(w: number, h: number) {
        this.width = w;
        this.height = h;
        this.setAllowedRange();
    }

    setAllowedRange(){
       this.allowedRange = [this.width*0.2,this.height*0.2];
    }

    move(vector: Vector) {
        this.position[0] += vector[0];
        this.position[1] += vector[1];
    }
    zoomIn() {
        this.zoom *= 2;
    }

    zoomOut() {
        this.zoom *= 0.5
    }

    rotate(angle: [number, number]) {
        this.angle = [this.angle[0] + angle[0], this.angle[1] + angle[1]];
    }

    moveTo(x: number, y: number) {
        this.position = [x, y];
    }

    lockOn(target: CameraTarget) {
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
        const target = this.target.getBody().position;
        return [
            this.position[0] + target[0]-this.width/2,
            this.position[1] + target[1]-this.height/2
        ];
    }
    getPosition(){
        return this.position;
    }
    getDimension(){
        return [
            this.width,
            this.height
        ]
    }
}