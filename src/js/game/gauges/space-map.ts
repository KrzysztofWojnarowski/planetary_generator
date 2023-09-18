import { spaceMap } from "../../engine/models/space-map.model";
import { Vector } from "../../engine/models/vector.model";

export class SpaceMap{
    
    observableArray:Map<string,Vector> =null;
    shallDraw:boolean = false;
    scale:number = 1;
    range:number =1;
    tick:number = 0;
    constructor(mapData:spaceMap){
        this.scale = mapData.scale;
        this.range = mapData.range;
        this.observableArray = new Map();
    }
    draw(context:CanvasRenderingContext2D){
        if (!this.shallDraw) return;
        context.save();
        context.beginPath();
        context.resetTransform();
        context.fillStyle = "rgba(255,255,255,1)";
        context.fillRect(0,0,1000,1000);
        context.fillStyle = "rgba(100,25,55,1)";

        this.observableArray.forEach((position)=>{
            const [x,y] = [...position];
            context.moveTo(500+x*this.scale,400+y*this.scale);
            context.arc(500+x*this.scale,400+y*this.scale,5,0,Math.PI*2);
        });
        context.fill();
        context.restore();
    }
    addToMap(object:any){
       
        const position = object.getBody().getPosition();
        this.observableArray.set(object.getEntity().getUUID(),position);
    }

    update(system:Array<any>){
        this.tick++;
        if(this.tick%10===0)
        {
            this.clearMap();
            system.forEach(e=>this.addToMap(e));
        }
    }

    removeFromMap(object:any){
        this.observableArray.delete(object.getEntity().getUUID());
    }
    clearMap(){
        this.observableArray.clear();
    }
}