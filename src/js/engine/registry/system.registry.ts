import { BaseSystem } from "../baseClasses/BaseSystem.class";
import { CellestialSystem } from "../systems/cellestial.system";
import { PhysicalBodySystem } from "../systems/physicalBody.system";
import { SpriteSystem } from "../baseSystems/sprite.system";
import { TankSystem } from "../systems/tank.system";
import { EventSystem } from "../systems/event.system";

export const SystemRegistry:Array<BaseSystem> = [
    new EventSystem(),  new PhysicalBodySystem(),
    new SpriteSystem()
];


