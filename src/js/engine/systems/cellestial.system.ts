import { ImageLoaderManager } from "../image-loader-manager";
import CellestialImplementation from "../implementation/cellestial.implementation";

export const CellestialSystem= {

    draw:(cellestial: CellestialImplementation, imageLoader: ImageLoaderManager, context: CanvasRenderingContext2D) => {
        const sprite = cellestial.getSprite();
        const position = cellestial.getBody().getPosition();
        const fPos = [sprite.getFrame() * sprite.getDimension()[0], 0];
        const size = sprite.getSize();
        const dimension = sprite.getDimension();
        const imageData = imageLoader.getImage(cellestial.getSprite().getImagePointer());
        context.drawImage(imageData,
            fPos[0], fPos[1],
            dimension[0], dimension[1],
            position[0]-size[0]/2, position[1]-size[1]/2,
            size[0], size[1]);
    }
}