import { ImageLoaderManager } from "../image-loader-manager";
import { GameObject } from "../interfaces/gameObject.interface";
import { stringIndexed } from "../interfaces/stringIndexed.interface";
import { System } from "../interfaces/system.interface";
import { Vector } from "../models/vector.model";
import { Implementation } from "./Implementation.class";
import { GameElement } from "./gameElement.class";

export abstract class BaseSystem  {
    static update(component: GameElement, ownerElement:GameElement, state:Array<GameElement>): void {
        console.warn(`This system has no update implementation for ${component.constructor.name}`);
    }
    draw(gameObject: GameObject, position: Vector, loader: ImageLoaderManager, context: CanvasRenderingContext2D): void {

    }
    static init(params:stringIndexed){
       
    }

    static has(gameObject:GameElement,property:string):boolean{
        return typeof gameObject.get(property) !="undefined";
    }

}