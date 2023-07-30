export default class Animation {

    position = [0, 0];
    size = [0, 0];
    dimension = [0,0];
    sprite = {};
    postUpdates = [];

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
        this.postUpdates.forEach(e => e(this));
    }

    draw(context) {
        const framePosition = this.getFramePosition();
        const d = this.dimension;
        const size = this.size;
        const p = this.position;
        context.drawImage(this.sprite.getImage(),
            d[0] * framePosition[0], d[1] * framePosition[1],
            d[0], d[1],0,0, size[0], size[1]);
    }
}

