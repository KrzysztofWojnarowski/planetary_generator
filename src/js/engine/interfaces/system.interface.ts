import { GameObject } from "./gameObject.interface";
import { Vector } from "../models/vector.model";
import { ImageLoaderManager } from "../image-loader-manager";

export interface System  {
    update(gameObject:GameObject,gameObjects:Array<GameObject>):void;
    draw(gameObject:GameObject,
        position:Vector,
        loader:ImageLoaderManager,
        context:CanvasRenderingContext2D):void;
}