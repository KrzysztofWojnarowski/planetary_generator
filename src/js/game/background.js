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
    setImage(image) {
        this.#image = image;
    }
    setLoaded(loaded) {
        this.#isLoaded = loaded;
    }
    move(vector) {
        this.position = vector;
    }
//@TODO: figure out more generic rules, and put magic numbers to config
    draw(context) {
        const backgroundImage = this.getImage();
        const position = this.position;
        const size = this.size
        context.fillRect(0, 0, size[0], size[1]);
        context.drawImage(backgroundImage, position[0], position[1], size[0], size[1], 0, 0, 6000, 6000);
    }
    update(shipBody){
        this.move([500+0.5*shipBody.x,500+0.5*shipBody.y]);
    }
}