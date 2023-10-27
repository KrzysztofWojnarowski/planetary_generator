import { SpriteImplementation } from "../implementation/sprite.implementation";
import { ImageLoaderManager } from "../image-loader-manager";
import { Vector } from "../models/vector.model";
import { System } from "../interfaces/system.interface";
import { GameElement } from "../baseClasses/gameElement.class";
import { BaseSystem } from "../baseClasses/System.class";
import { Implementation } from "../baseClasses/Implementation.class";
export abstract class SpriteSystem  extends BaseSystem {
    draw(sprite: GameElement,
        position: Vector,
        imageLoader: ImageLoaderManager,
        context: CanvasRenderingContext2D) {
            
       const fPos = [sprite.get("frame") * sprite.get("dimension")[0], 0];
        const size = sprite.get("size");
        const dimension = sprite.get("dimension");
        const imageData = imageLoader.getImage(sprite.get("imagePointer"));
        context.drawImage(imageData,
            fPos[0], fPos[1],
            dimension[0], dimension[1],
            position[0] - size[0] / 2, position[1] - size[1] / 2,
            size[0], size[1]); 
    };

    static update(sprite: GameElement,component:GameElement,state:Array<GameElement>) {
     //   console.log(sprite);
      const frameCount = sprite.get("frameCount");
        let frame = sprite.get("frame");
        sprite.set("frame",++frame % frameCount);
        console.log(sprite,sprite.get("frame"));
    }
    


} 