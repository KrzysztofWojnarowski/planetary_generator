import { Entity } from "../models/entity.model";

export default class EntityImplementation{
    _entity:Entity;
    constructor(entity:Entity){
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