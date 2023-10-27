import { GameObject } from "./gameObject.interface";
import { Vector } from "../models/vector.model";
import { ImageLoaderManager } from "../image-loader-manager";
import { GameElement } from "../baseClasses/gameElement.class";
import { stringIndexed } from "./stringIndexed.interface";
import { Implementation } from "../baseClasses/Implementation.class";

export interface System  {
    update(gameElement:Implementation,element:GameElement,state:Array<GameElement>):void;
    draw(gameObject:GameObject,
        position:Vector,
        loader:ImageLoaderManager,
        context:CanvasRenderingContext2D):void;
         
}