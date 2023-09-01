import EntityImplementation from "./entity.implementation";
import PhysicalBodyImplementation from "./physicalBody.implementation";
import SpriteImplementation from "./sprite.implementation";


export default class CellestialImplementation {
    _entity: EntityImplementation = null;
    _physicalBody: PhysicalBodyImplementation = null;
    _sprite: SpriteImplementation = null;
    markForRemoval:Boolean = null;
    constructor(entity: EntityImplementation,
        physicalBody: PhysicalBodyImplementation,
        sprite: SpriteImplementation) {
        this._entity = entity;
        this._physicalBody = physicalBody;
        this._sprite = sprite;
        this.markForRemoval = false;
    }
    getBody(): PhysicalBodyImplementation {
        return this._physicalBody;
    }
    getEntity():EntityImplementation{
        return this._entity;
    }
    getSprite():SpriteImplementation{
        return this._sprite;
    }
    setBody(body:PhysicalBodyImplementation){
        this._physicalBody = body;
    }
    setEntity(entity:EntityImplementation){
        this._entity = entity;
    }
    setSprite(sprite:SpriteImplementation){
        this._sprite = sprite;
    }


}