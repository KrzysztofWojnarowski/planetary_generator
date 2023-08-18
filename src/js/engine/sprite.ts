import { ImageLoader } from "./image-loader";

export default class Sprite {
    image: HTMLImageElement = null;

    _spriteImage: HTMLImageElement = null;
    _isLoaded = false;

    frameRows = 1;
    framesInRow = 1;
    currentFrame = 0;

    bindImage(image: HTMLImageElement){
        this.image = image;
        this._isLoaded = true;
    }
       
    async load(url: string) {
        return await ImageLoader.load(url);
    }
    setImage(image: HTMLImageElement){
        this._spriteImage = image;
        return this;
    }
    setLoaded(){
        this._isLoaded = true;
    }
    isLoaded(){
        return this.isLoaded;
    }
    getImage(){
        return this._spriteImage;
    }
    getFrame(index: number, w: number, h: number) {
        return {
            x: w * index,
            y: 0,
            w: w,
            h: h
        }
    }

    setSize() { }
}