export default class PngImage{
    #spriteImage = {};
    #isLoaded = false;
       
    load(url) {
        return new Promise(resolve => {
            const image = new Image();
            image.addEventListener("load", (e) => {
                resolve(image);
            });

            image.src = url;
        });

    }
    setImage(image){
        this.#spriteImage = image;
    }
    setLoaded(){
        this.#isLoaded = true;
    }
    isLoaded(){
        return this.#isLoaded;
    }
    getImage(){
        return this.#spriteImage;
    }

}