import { EventSystem } from "../event-system";
import { stringIndexed } from "../interfaces/stringIndexed.interface";
import { CellestialSystem } from "../systems/cellestial.system";
import { PhysicalBodySystem } from "../systems/physicalBody.system";
import { SpriteSystem } from "../systems/sprite.system";
import { TankSystem } from "../systems/tank.system";

export const SystemRegistry:stringIndexed = {
    "PhysicalBodySystem":PhysicalBodySystem,
    "CellestialSystem":CellestialSystem,
    "SpriteSystem":SpriteSystem,
    "TankSystem":TankSystem,
    "EventSystem":EventSystem

}