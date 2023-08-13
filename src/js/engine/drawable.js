export default class Drawable {
    position = [0, 0];
    size = [0, 0];
    dimension = [0,0];
    sprite = {};
    topLeft=[0,0];
    updateArgs=[];
    drawArgs=[];
    updateFunction=()=>{};
    bindSprite(sprite) {
        this.sprite = sprite;
    }
    bindUpdate(updateFunction,args){
        this.updateFunction = updateFunction;
        this.updateArgs = args;
    }
    bindDraw(drawFunction,args){
        this.drawFunction = drawFunction;
        this.drawArgs = args;
    }

    getSize() {
        return this.size;
    }
    setSize(size) {
        this.size = size;
    }
    update() {
        this.updateFunction(...this.updateArgs);
    }
    setPosition(position){
        this.position = position;
    }

    defaultDraw(context){
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

    draw(context) {
        typeof this.drawFunction==="function"? this.drawFunction(...this.drawArgs):this.defaultDraw(context);
    }
}

