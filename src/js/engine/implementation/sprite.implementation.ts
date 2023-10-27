import { Implementation } from "../baseClasses/Implementation.class";
import { Sprite } from "../models/sprite.model";
import { Vector } from "../models/vector.model";

export  class SpriteImplementation extends Implementation{
    _sprite:Sprite;
    constructor(sprite:Sprite){
        super();
        this._sprite = sprite;
    }
    getSprite():Sprite{
        return this._sprite;
    }
    getImagePointer():string{
        return this._sprite.imagePointer;
    }
    getDimension():Vector{
        return this._sprite.dimension;
    }
    getSize():Vector{
        return this._sprite.size;
    }
    getPosition():Vector{
        return this._sprite.position;
    }
    getFrame():number{
        return this._sprite.frame;
    }
    setImagePointer(imagePointer:string){
        this._sprite.imagePointer = imagePointer;
    }
    setDimension(dimension:Vector){
        this._sprite.dimension = dimension;
    }
    setSize(size:Vector){
        this._sprite.size = size;
    }
    setPosition(position:Vector){
        this._sprite.position = position;
    }
    setFrame(frame:number){
        this._sprite.frame = frame;
    }
    getFrameCount():number{
        return this._sprite.frameCount;
    }
    setFrameCount(frameCount:number){
        this._sprite.frameCount = frameCount;
    }
}