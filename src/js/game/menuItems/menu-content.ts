import { GetDrawable } from './../../engine/models/get-drawable.mode';
import { Entity } from "../../engine/entity";
import { Drawable } from "../../engine/drawable";
import { Sprite } from "../../engine/sprite";
import Engine from "../../engine/engine";
import { GetPositionCoordinates } from "../../engine/models/get-position-coordinates.model";
import { PositionCordinates } from "../../engine/models/position.model";

export interface CoordinatesSizeDimension {
    dimension: [number, number];
    size: [number, number];
    topLeft: [number, number];
}

export class MenuContent implements GetDrawable, GetPositionCoordinates {
    drawable: Drawable = null;
    entity: Entity = null;
    context: CanvasRenderingContext2D = null; 
    engine: Engine = null;

    arrowCooridinates: CoordinatesSizeDimension = {
        topLeft: [257, 34],
        size: [50, 50],
        dimension: [14, 12],
    }

    buttonCoordinates: CoordinatesSizeDimension ={
        topLeft:[196,32],
        size:[50,50],
        dimension:[18,16]
    }

    text = {
        rotateLeft:"Rotate Left",
        rotateRight:"Rotate Right",
        accelerate:"Accelerate",
        break:"Break",
        pauseToggle:"Press Esc to pause/restore the game",
        newGame:"Press Space for new Game"
    }

    constructor(engine: Engine) {
        this.engine = engine;

        this.entity = new Entity();
        this.drawable = this.getDrawable();
        this.context = engine.context;
    }

    update() {
        this.drawable.setPosition(this.getPositionCoordinates());
    }

    draw() {
        this.context.save();
        this.context.translate(this.drawable.position[0], this.drawable.position[1]);
        this.context.beginPath();
        this.context.fillStyle = "rgba(50,25,25,0.8)";
        this.context.rect(-400, -300, 800, 600);
        this.context.fill();
        this.context.closePath();

        for(let i=0;i<4;i++){
            this.drawImage(i*Math.PI/2, [-350+350*(i%2==0?0:1),100*(i<2?0:1)], this.arrowCooridinates);
        }
        
        this.drawImage(0,[-350,-200], this.buttonCoordinates);
        this.drawImage(0,[-350,-100], this.buttonCoordinates);
        this.context.translate(100,100);
        this.context.beginPath();
        this.context.font="bold 30px Courier";
        this.context.fillStyle="rgba(50,90,30,1)";
        this.context.fillText(this.text.accelerate,-380,-65);
        this.context.fillText(this.text.break,-380,35);
        this.context.fillText(this.text.rotateRight,-30,-65);
        this.context.fillText(this.text.rotateLeft,-30,35);
        this.context.fillText(this.text.pauseToggle,-380,-165);
        this.context.fillText(this.text.newGame,-380,-265);
        this.context.restore();
    }

    drawImage(angle: number, position: [number, number], coordinatesSizeDimension: CoordinatesSizeDimension) {
        let { topLeft, size, dimension } = coordinatesSizeDimension;
        this.context.save();
        this.context.translate(position[0]+size[0]/2, position[1]+size[1]/2);
        this.context.rotate(angle);
        this.context.translate(-size[0]/2, -size[1]/2);

        this.context.drawImage((this.drawable.sprite as Sprite).getImage(),
            topLeft[0], topLeft[1],
            dimension[0], dimension[1],
            0, 0,
            size[0], size[1]);
        this.context.restore();

    }

    drawText(context: CanvasRenderingContext2D, text: string, x: number, y: number): void {
        context.font = "bold 30px Courier";
        context.fillStyle = "rgba(50,90,30,1)";
        context.fillText(text, x, y);
    }

    getPositionCoordinates(): PositionCordinates {
        const cameraPosition = this.engine.camera.getPosition();
        let newPosition = [
            Math.round(-cameraPosition[0] + 750),
            Math.round(-cameraPosition[1] + 400)
        ];
        return newPosition as PositionCordinates;
    }

    getDrawable(): Drawable { 
        return new Drawable()
            .setPosition([10, 10])
            .bindSprite(
                new Sprite()
                    .setImage(this.engine.loader.images.gaugeSheet.getImage())
            );
    }
}