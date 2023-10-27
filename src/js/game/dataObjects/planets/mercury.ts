import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const Mercury:stringIndexed = {
    entity: {
        label: "Mercury",
        id:"Mercury001",
        group:"cellestials"
    },
    physicalBody: {
        position: [70000, 0],
        velocity: [0, 1],
        force: [0, 0],
        m: 1e-2,
        r: 80,
    },
    sprite: {
        imagePointer: "moonSheet",
        frameCount: 49,
        dimension: [100, 100],
        size: [150, 150],
        frame: 0
    }
}
