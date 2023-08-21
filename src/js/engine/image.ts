export class Image {
    private image: HTMLImageElement= null;
    private _isLoaded = false;
       
    setImage(image: HTMLImageElement){
        this.image = image;
    }

    setLoaded(){
        this._isLoaded = true;
    }
    
    isLoaded(){
        return this._isLoaded;
    }
    
    getImage(){
        return this.image;
    }
}