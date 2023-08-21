export class Entity {
    private UUID: string = null;

    constructor(){
        // How expensive is it on comutation when copering UUID? 
        // Would't it be better to index enteties from 0 and hold the number of enteties in engine?
        this.UUID = crypto.randomUUID();
    }

    getUUID(){
        return this.UUID;
    }
}