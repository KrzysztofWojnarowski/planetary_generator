import { Entity } from "../engine/entity";
import { EventSystem } from "../engine/event-system";
import { ImageLoader } from "../engine/image-loader";
import SpaceShip from "./ingame-objects/spaceship";

export default class Background {
    position = [0, 0];
    size = [2000, 2000];
    url = "assets/background.png";
    _isLoaded = false;
    image: HTMLImageElement;
    eventSystem: EventSystem;
    entity: Entity;

    constructor(){
        this.eventSystem = new EventSystem(this);
        this.eventSystem.registerEvent("onUpdate");
        this.entity = new Entity();
    }

    load() {     
        let url = this.url;
        return ImageLoader.load(url);
    }

    isLoaded() {
        return this._isLoaded;
    }
    
    getImage(): HTMLImageElement {
        return this.image;
    }
    
    setImage(image: HTMLImageElement) {
        this.image = image;
    }
    
    setLoaded(loaded: boolean) {
        this._isLoaded = loaded;
    }
    
    move(vector: [number, number]) {
        this.position = vector;
    }
    
    draw(context: CanvasRenderingContext2D) {
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
    
    onUpdate(ship: SpaceShip){
        const shipBody = ship.getBody();
        this.move([5+0.7*shipBody.position[0],5+0.7*shipBody.position[1]]);

    }
}