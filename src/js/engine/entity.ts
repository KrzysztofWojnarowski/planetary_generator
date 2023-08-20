export default class Entity{
    UUID:String = null;
    label:String = null;
    constructor(){
        this.UUID = crypto.randomUUID();
    }

    getUUID():String{
        return this.UUID;
    }
    setLabel(label:String){
        this.label = label;
    }
    getLabel():String{
        return this.label;
    }
}