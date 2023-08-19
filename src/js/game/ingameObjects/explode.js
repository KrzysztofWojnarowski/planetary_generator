import { EventSystem } from "../../engine/eventSystem";
import Sprite from "../../engine/sprite";
import { Animation } from "../../engine/animation";
import { Entity } from "../../engine/entity";

export default class Explode {
    frameRows = 6;
    framesInRow = 8;
    currentFrame = 0;
    dimension = [238,238];
    size = 100;
    url = "assets/explode.png";
    position = [400,400];
    constructor() {
        this.sprite = new Sprite();
        this.entity = new Entity();

        this.eventSystem = new EventSystem();
        this.eventSystem.registerEvent("onExplodeStart");
        this.eventSystem.registerEvent("onExplodeEnd");
        this.eventSystem.registerEvent("onExplodeEnd");
        this.animation = new Animation();
        this.animation.dimension = this.dimension;
        this.animation.framesInRow = this.framesInRow;
        this.animation.bindSprite(this.sprite);
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
        this.nextFrameIndex();

    }

    draw(context) {
        const framePosition = this.getFramePosition();
        const d  = this.dimension;
        context.drawImage(this.animation.sprite.getImage(),
        d[0]*framePosition[0],d[1]*framePosition[1],
        d[0],d[1],0,0,this.size,this.size);
    }







}