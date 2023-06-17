export default class Sprite {

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
    getFrame(index, w, h) {
        return {
            x: w * index,
            y: 0,
            w: w,
            h: h
        }
    }

    setSize() { }
}