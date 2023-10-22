import { SpriteImplementation } from "../implementation/sprite.implementation";
import { ImageLoaderManager } from "../image-loader-manager";
import { Vector } from "../models/vector.model";
import { System } from "../interfaces/system.interface";
export class SpriteSystem implements System {
    draw(sprite: SpriteImplementation,
        position: Vector,
        imageLoader: ImageLoaderManager,
        context: CanvasRenderingContext2D) {
        const fPos = [sprite.getFrame() * sprite.getDimension()[0], 0];
        const size = sprite.getSize();
        const dimension = sprite.getDimension();
        const imageData = imageLoader.getImage(sprite.getImagePointer());
        context.drawImage(imageData,
            fPos[0], fPos[1],
            dimension[0], dimension[1],
            position[0] - size[0] / 2, position[1] - size[1] / 2,
            size[0], size[1]);
    };

    update(sprite: SpriteImplementation) {
        const frameCount = sprite.getFrameCount();
        let frame = sprite.getFrame();
        sprite.setFrame(++frame % frameCount);
    }


} 