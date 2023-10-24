import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const GattoGrandi:stringIndexed = {
    entity: {
        label: "Gatto Grandi"
    },
    physicalBody: {
        position: [25000, 0],
        velocity: [0, -1.1],
        force: [0, 1.5],
        m: 1e-5,
        r: 240,
    },
    sprite: {
        imagePointer: "redGiantSheet",
        frameCount: 50,
        dimension: [200, 200],
        size: [700, 700],
        frame: 0
    }
}