import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const Venus: stringIndexed = {
    entity: {
        label: "Venus",
        id:"Venus001",
        group:"cellestials"
    },
    physicalBody: {
        position: [47000, -100],
        velocity: [0, -1],
        force: [0, 0],
        m: 3e-1,
        r: 200,
    },
    sprite: {
        imagePointer: "marsSheet",
        frameCount: 49,
        dimension: [100, 100],
        size: [440, 440],
        frame: 0
    }

}