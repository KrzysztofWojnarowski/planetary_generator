import { Implementation } from "../baseClasses/Implementation.class";
import { Tank } from "../models/tank.model";
import { EntityImplementation } from "./entity.implementation";
import PhysicalBodyImplementation from "./physicalBody.implementation";
import ResourceExtractorImplementation from "./resourceExtractor.implementation";
import { SpriteImplementation } from "./sprite.implementation";
import { TankImplementation } from "./tank.implementation";


export default class SpaceshipImplementation extends Implementation {
    _entity: EntityImplementation = null;
    _physicalBody: PhysicalBodyImplementation = null;
    _sprite: SpriteImplementation = null;
    _resourceExtractor: ResourceExtractorImplementation = null;
    _fuelTank: TankImplementation = null;
    _extraTankArray: Array<Tank> = null;
    _engine: EntityImplementation = null;
    markForRemoval: Boolean = false;

    constructor(entity: EntityImplementation,
        physicalBody: PhysicalBodyImplementation,
        sprite: SpriteImplementation,
        resouceExtractor: ResourceExtractorImplementation,
        fuelTank: TankImplementation,
        extraTankArray: Array<Tank>,
        engine: EntityImplementation
    ) {
        super();
        this._entity = entity;
        this._physicalBody = physicalBody;
        this._sprite = sprite;
        this._engine = engine;
        this._extraTankArray = extraTankArray;
        this._fuelTank = fuelTank;
        this._resourceExtractor = resouceExtractor;
        this.markForRemoval = false;
    }
    getBody(): PhysicalBodyImplementation {
        return this._physicalBody;
    }
    getEntity(): EntityImplementation {
        return this._entity;
    }
    getSprite(): SpriteImplementation {
        return this._sprite;
    }
    setBody(body: PhysicalBodyImplementation) {
        this._physicalBody = body;
    }
    setEntity(entity: EntityImplementation) {
        this._entity = entity;
    }
    setSprite(sprite: SpriteImplementation) {
        this._sprite = sprite;
    }
    getFuelTank(): TankImplementation {
        return this._fuelTank
    }
    getEngine(): EntityImplementation {
        return this._engine;
    }
    getResourceExtractor(): ResourceExtractorImplementation {
        return this._resourceExtractor;
    }
}