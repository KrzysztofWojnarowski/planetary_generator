import { EventSystem } from "./event-system";
import { Image } from "./image";
import { ImageLoader } from "./image-loader";

export class ImageLoaderManager {
    eventSystem: EventSystem = null;
    images: { [key: string]: Image } = {}
    imageList: { [key: string]: string } = null

    constructor() {
        this.eventSystem = new EventSystem(this);
        this.eventSystem.registerEvent("onImagesReady");
    }

    setAssetList(imageList: { [key: string]: string }) {
        this.imageList = imageList;
    }

    async loadImages() {
        const imageLoadingPromises = Object.keys(this.imageList).map(async (imageName) => {
            const url: string = this.imageList[imageName];
            try {
                const image = await ImageLoader.load(url);
                const gameImage = new Image();
                gameImage.setImage(image);
                gameImage.setLoaded();
                console.log(`Loaded: ${imageName}`);
                this.images[imageName] = gameImage;
            } catch (error) {
                console.error(`Error loading image: ${imageName}`);
            }
        });

        await Promise.all(imageLoadingPromises);

        this.eventSystem.triggerEvent("onImagesReady", this);
    }

    getGameImages() {
        return this.images;
    }
    getImage(imagePointer:string){
        return this.images[imagePointer].getImage();
    }

}
