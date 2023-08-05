export default class Entity{
    #UUID = null;
    constructor(){
        this.#UUID = crypto.randomUUID();
    }

    getUUID(){
        return this.#UUID;
    }
}