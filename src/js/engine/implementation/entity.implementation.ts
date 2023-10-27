import { Implementation } from "../baseClasses/Implementation.class";
import { Entity } from "../models/entity.model";

export class EntityImplementation extends Implementation{
    _entity:Entity;
    constructor(entity:Entity){
        super();
        this._entity = entity;
    }
    getEntity():Entity{
        return this._entity;
    }
    getUUID():String{
        return this._entity.UUID;
    }
    getLabel():String{
        return this._entity.label;
    }
    setLabel(label:String){
        this._entity.label = label;
    }
    setUUID(UUID:String){
        this._entity.UUID = UUID;
    }
}