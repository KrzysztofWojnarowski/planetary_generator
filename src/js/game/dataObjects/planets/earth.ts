import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const Earth:stringIndexed = {
    entity: {
        label: "Earth",
        id:"Earthi001",
        group:"cellestials"
    },
    physicalBody: {
        position: [170000, 0],
        velocity: [0, 0.7],
        force: [0, 1.5],
        m: 1e-5,
        r: 100,
    },
    sprite: {
        imagePointer: "earthSheet",
        frameCount: 49,
        dimension: [100, 100],
        size: [240, 240],
        frame: 0
    }
}