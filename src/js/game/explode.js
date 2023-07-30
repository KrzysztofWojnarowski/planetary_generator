import EventSystem from "../engine/eventSystem";
import Sprite from "../engine/sprite";
export default class Explode {

    frameRows = 6;
    framesInRow = 8;
    currentFrame = 0;
    dimension = [238,238];
    url = "assets/explode.png";
    position = [400,400];
    constructor() {
        this.sprite = new Sprite();
        this.eventSystem = new EventSystem();
        this.eventSystem.registerEvent("onExplodeStart");
        this.eventSystem.registerEvent("onExplodeEnd");
        this.eventSystem.registerEvent("onExplodeEnd");

    }


    getFramePosition() {
        return [
            this.currentFrame%this.framesInRow,
            Math.floor(this.currentFrame / this.framesInRow)
        ]
    }
    nextFrameIndex() {
        this.currentFrame++;
    }

    update() {

        switch (this.currentFrame){
            case 0:this.eventSystem.triggerEvent()
        }
        this.nextFrameIndex();

    }

    draw(context) {
        const framePosition = this.getFramePosition();
        const d  = this.dimension;
        console.log(framePosition);
        context.drawImage(this.sprite.getImage(),
        d[0]*framePosition[0],d[1]*framePosition[1],
        d[0],d[1],0,0,100,100);
    }







}