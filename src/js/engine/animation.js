export default class Animation {

    position = [0, 0];
    size = [0, 0];
    dimension = [0,0];
    sprite = {};
    postUpdates = [];
    framesInRow = 0;
    currentFrame = 0;

    bindSprite(sprite) {
        this.sprite = sprite;
    }

    bindUpdateDecorator(decorator) {
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
    setSize(size) {
        this.size = size;
    }
    update() {
        this.nextFrameIndex();
    }

    draw(context) {
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

