import { PositionCordinates } from "./models/position.model";
import { Size } from "./models/size.model";
import { Vector } from "./models/vector.model";
import { Sprite } from "./sprite";

export class Drawable {
    position = [0, 0];
    size = [0, 0];
    dimension = [0,0];
    sprite: Sprite = null;
    topLeft=[0,0];
    updateArgs: any=[];
    drawArgs: any=[];

    bindSprite(sprite: Sprite): Drawable {
        this.sprite = sprite;
        return this;
    }

    getSize() {
        return this.size;
    }
    
    setSize(size: Vector) {
        this.size = size;
        return this;
    }

    setPosition(position: PositionCordinates){
        this.position = position;
        return this;
    }

    setDemention(dimension: Vector): Drawable {
        this.dimension = dimension;
        return this;
    }

    setTopLeft(topLeft:Vector): Drawable {
        this.topLeft = topLeft;
        return this;
    }

    defaultDraw(context: CanvasRenderingContext2D){
        const d = this.topLeft;
        const size = this.size;
        const p = this.position;
        const dm = this.dimension;
        context.save();
        context.drawImage(this.sprite.getImage(),
            d[0], d[1],
            dm[0], dm[1],p[0]-0.5*size[0],p[1]-0.5*size[1], size[0], size[1]);
        context.restore();
    }
}

