import { Size } from "./models/size.model";
import Sprite from "./sprite";

export class Animation {
    position = [0, 0];
    size: Size = [0, 0];
    dimension = [0,0];
    sprite: Sprite = null;
    postUpdates: Function[] = [];
    framesInRow = 0;
    currentFrame = 0;

    bindSprite(sprite: Sprite) {
        this.sprite = sprite;
    }

    bindUpdateDecorator(decorator: Function) {
        this.postUpdates.push(decorator);
    }

    nextFrameIndex() {
        this.currentFrame++;
    }


    getFramePosition() {
        return [
            this.currentFrame % this.framesInRow,
            Math.floor(this.currentFrame / this.framesInRow)
        ]
    }

    getSize() {
        return this.size;
    }
    setSize(size: Size) {
        this.size = size;
    }
    update() {
        this.nextFrameIndex();
    }

    draw(context: CanvasRenderingContext2D) {
        const framePosition = this.getFramePosition();
        const d = this.dimension;
        const size = this.size;
        const p = this.position;
        context.save();
        context.drawImage(this.sprite.getImage(),
            d[0] * framePosition[0], d[1] * framePosition[1],
            d[0], d[1],p[0]-0.5*size[0],p[1]-0.5*size[1], size[0], size[1]);
        context.restore();
    }
}

