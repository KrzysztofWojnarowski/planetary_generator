import Entity from "../engine/entity";
import EventSystem from "../engine/eventSystem";
import { ImageLoader } from "../engine/image-loader";

export default class Background {
    position = [0, 0];
    size = [2000, 2000];
    url = "assets/background.png";
    #isLoaded = false;
    #image = {};

    constructor(){
        this.eventSystem = new EventSystem(this);
        this.eventSystem.registerEvent("onUpdate",this.onUpdate);
        this.entity = new Entity();
    }

    load() {    
        let url = this.url;
        return ImageLoader.load(url);
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
    draw(context) {
        const backgroundImage = this.getImage();
        const position = this.position;
        const size = this.size;
        context.save();
        context.fillRect(0, 0, size[0], size[1]);
        context.translate(-position[0]%6000,-position[1]%6000);
        for(let k=-1;k<2;k++){
            for(let j=-1;j<2;j++){
                context.drawImage(backgroundImage,0,0,size[0],size[1],j*6000,k*6000,6000,6000);
            }
        }
        context.restore();
    }
    onUpdate(ship){
        const shipBody = ship.getBody();
        this.move([5+0.7*shipBody.x,5+0.7*shipBody.y]);

    }
}