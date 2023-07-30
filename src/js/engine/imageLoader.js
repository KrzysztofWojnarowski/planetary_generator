import EventSystem from "./eventSystem";
import PngImage from "./pngImage";

export default class ImageLoader {

    imageList = {}
    images = {}

    constructor(){
        this.eventSystem = new EventSystem(this);
        this.eventSystem.registerEvent("onImagesReady");
    }
    setAssetList(imageList) {
        this.imageList = imageList;
    }

    loadImages(){
        Object.keys(this.imageList).forEach(element => {
            let gameImage = new PngImage();
            const url = this.imageList[element];
            gameImage.load(url).then(image=>{
                gameImage.setImage(image);
                gameImage.setLoaded();
                console.log(`Loaded: ${element}`);
                if (this.isReady()){
                    console.log(this);
                    this.eventSystem.triggerEvent("onImagesReady",this);
                }
            });
            this.images[element] = gameImage;
        });
    }
    isReady(){
       let k =  Object.keys(this.images).filter(element=>{
            return !this.images[element].isLoaded()
        })
        return k.length==0;
    }

    getGameImages(){
        return this.images;
    }

}