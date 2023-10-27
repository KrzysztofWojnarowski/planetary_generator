import { EngineImplementation } from "./Engine.implementation";
import PhysicalBodyImplementation from "./physicalBody.implementation";
import ResourceExtractorImplementation from "./resourceExtractor.implementation";
import { SpriteImplementation } from "./sprite.implementation";
import { TankImplementation } from "./tank.implementation";
import { stringIndexed } from "../interfaces/stringIndexed.interface";
import {EntityImplementation} from "./entity.implementation";
import { staticCharacteristicsImplementation } from "./staticCharacteristics.implementation";
import { ExtraTankImplementation } from "./extraTank.implementation";
export const ImplementationRegistry: stringIndexed = {
    "entity": EntityImplementation,
    "sprite": SpriteImplementation,
    "physicalBody": PhysicalBodyImplementation,
    "fuelTank": TankImplementation,
    "engine": EngineImplementation,
    "resourceExtractor": ResourceExtractorImplementation,
    "staticCharacteristics": staticCharacteristicsImplementation,
    "extraTankArray":ExtraTankImplementation

}