export default class Background {
    position = [0, 0];
    size = [2000, 2000];
    url = "assets/background.png";
    #isLoaded = false;
    #image = {};

   
    load() {
        let url = this.url;
        return new Promise(resolve => {
            const image = new Image();
            image.addEventListener("load", (e) => {
                resolve(image);
            });
            image.src = url;
        });
        
    }
    isLoaded() {
        return this.#isLoaded;
    }
    getImage() {
        return this.#image;
    }
    setImage(image){
        this.#image = image;
    }
    setLoaded(loaded){
        this.#isLoaded=loaded;
    }

}