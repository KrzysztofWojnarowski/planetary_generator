import { stringIndexed } from "../../engine/interfaces/stringIndexed.interface";
import { basicCruiser } from "./spaceships/basicCruiser";
import { Sun } from "./planets/sun";
import { Mercury } from "./planets/mercury";
import { Saturn } from "./planets/saturn";
import { Earth } from "./planets/earth";
import { GattoGrandi } from "./planets/gattoGrandi";
import { Calumni } from "./planets/calumni";
import { Venus } from "./planets/venus";
import { SashaBelli } from "./planets/sashaBelli";
import { Antani } from "./planets/antani";
export const gameElements:stringIndexed = {
    mainStar:Sun,
    planetMercury:Mercury,
    planetSaturn:Saturn,
    planetEarth:Earth,
    planetGatoo:GattoGrandi,
    planetKalumni:Calumni,
    planetVenus:Venus,
    planetSasha:SashaBelli,
    planetAntani:Antani,
    spaceShip:basicCruiser
    
}