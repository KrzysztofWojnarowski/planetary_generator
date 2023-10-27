import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const Sun:stringIndexed = {
    entity: {
        label: "Sun",
        id:"Sun001",
        group:"cellestials"
    },
    physicalBody: {
        position: [0, 0],
        velocity: [0, 0],
        force: [0, 0],
        m: 5000,
        r: 520,
    },
    sprite: {
        imagePointer: "sunSheet",
        frameCount: 49,
        dimension: [200, 200],
        size: [1700, 1700],
        frame: 0
    }
}