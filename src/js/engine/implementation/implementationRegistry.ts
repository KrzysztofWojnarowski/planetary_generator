import { Sprite } from "../models/sprite.model";
import { EngineImplementation } from "./Engine.implementation";
import PhysicalBodyImplementation from "./physicalBody.implementation";
import ResourceExtractorImplementation from "./resourceExtractor.implementation";
import {SpriteImplementation} from "./sprite.implementation";
import { TankImplementation } from "./tank.implementation";
import { PhysicalBody } from "../models/physicalBody.model";
import { Tank } from "../models/tank.model";
import { Engine } from "../models/engine.model";
import { ResourceExtractor } from "../models/resourceExtractor.model";
export const ImplementationRegistry = {
    sprite:(sprite:Sprite)=>new SpriteImplementation(sprite),
    physicalBody:(physicalBody:PhysicalBody)=>new PhysicalBodyImplementation(physicalBody),
    fuelTank:(tank:Tank)=>new TankImplementation(tank),
    engine:(engine:Engine)=>new EngineImplementation(engine),
    resourceExtractor:(resourceExtractor:ResourceExtractor)=> new ResourceExtractorImplementation(resourceExtractor)
};