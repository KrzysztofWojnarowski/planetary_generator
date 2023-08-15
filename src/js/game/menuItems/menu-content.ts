import Entity from "../../engine/entity";
import Drawable from "../../engine/drawable";
import Sprite from "../../engine/sprite";
import Engine from "../../engine/engine";

export interface CoordinatesSizeDimension {
    dimension: [number, number];
    size: [number, number];
    topLeft: [number, number];
}

export class MenuContent {
    drawable: Drawable = null;
    entity: Entity = null;

    constructor(engine: Engine) {
        this.entity = new Entity();
        this.drawable = new Drawable();

        this.drawable.position = [10, 10];
        this.drawable.bindUpdate(this.update, [this, engine]);
        this.drawable.bindDraw(this.draw, [this, engine]);

        let sprite = new Sprite();
        sprite.setImage(engine.loader.images.gaugeSheet.getImage());
        this.drawable.bindSprite(sprite);
    }

    update(self: MenuContent, engine: Engine) {
        const cp = engine.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0] + 750),
            Math.round(-cp[1] + 400)
        ];
        self.drawable.setPosition(newPosition);
    }

    draw(self: MenuContent, engine: Engine) {
        const context = engine.context;
        context.save();
        // TODO: What is 'this' when the function is invoked? 
        context.translate((this as any).position[0], (this as any).position[1]);
        context.beginPath();
        context.fillStyle = "rgba(50,25,25,0.8)";
        context.rect(-400, -300, 800, 600);
        context.fill();
        context.closePath();
        for(let i=0;i<4;i++){
            self.drawImage(i*Math.PI/2, context, [-350+350*(i%2==0?0:1),100*(i<2?0:1)], self,self.arrowCooridinates);
        } 
        self.drawImage(0,context,[-350,-200],self,self.buttonCoordinates);
        self.drawImage(0,context,[-350,-100],self,self.buttonCoordinates);
        context.translate(100,100);
        context.beginPath();
        context.font="bold 30px Courier";
        context.fillStyle="rgba(50,90,30,1)";
        context.fillText(self.text.accelerate,-380,-65);
        context.fillText(self.text.break,-380,35);
        context.fillText(self.text.rotateRight,-30,-65);
        context.fillText(self.text.rotateLeft,-30,35);
        context.fillText(self.text.pauseToggle,-380,-165);
        context.fillText(self.text.newGame,-380,-265);

        context.restore();
    }

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

    text={
        rotateLeft:"Rotate Left",
        rotateRight:"Rotate Right",
        accelerate:"Accelerate",
        break:"Break",
        pauseToggle:"Press Esc to pause/restore the game",
        newGame:"Press Space for new Game"
    }

    drawImage(angle: number, context: CanvasRenderingContext2D, position: [number, number], self: MenuContent, coordinatesSizeDimension: CoordinatesSizeDimension) {
        let { topLeft, size, dimension } = coordinatesSizeDimension;
        context.save();
        context.translate(position[0]+size[0]/2, position[1]+size[1]/2);
        context.rotate(angle);
        context.translate(-size[0]/2, -size[1]/2);

        context.drawImage((this.drawable.sprite as Sprite).getImage(),
            topLeft[0], topLeft[1],
            dimension[0], dimension[1],
            0, 0,
            size[0], size[1]);
        context.restore();

    }

}