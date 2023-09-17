import { ImageLoaderManager } from "../image-loader-manager";
import SpriteImplementation from "../implementation/sprite.implementation";
import { Sprite } from "../models/sprite.model";
import { Vector } from "../models/vector.model";

export const drawingSystem = {
    draw:(context:CanvasRenderingContext2D,imageLoader:ImageLoaderManager,sprite:SpriteImplementation,position:Vector)=>{
        const imageData = imageLoader.getImage(sprite.getImagePointer());
        const spriteData  = sprite.getSprite();
        const framePosition = drawingSystem.getFramePosition(sprite.getSprite());     
        context.drawImage(imageData,
            framePosition[0], framePosition[1],
            spriteData.dimension[0], spriteData.dimension[1],
            position[0]-spriteData.size[0]/2, position[1]-spriteData.size[1]/2,
            spriteData.size[0], spriteData.size[1]);
    },
    getFramePosition:(sprite:Sprite)=>{     
            return  [
                sprite.frame%(sprite.framesInRow||1),
                Math.floor(sprite.frame / (sprite.framesInRow||1))
            ] as Vector;
        
    }
}