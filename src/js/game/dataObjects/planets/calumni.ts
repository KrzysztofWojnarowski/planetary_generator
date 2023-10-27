import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const Calumni:stringIndexed= {
    entity: {
        label: "Beta Calumni",
        id:"Calumni001",
        group:"cellestials"
    },
    physicalBody: {
        position: [64000, 0],
        velocity: [0, -0.81],
        force: [0, 0],
        m: 1e-6,
        r: 70,
    },
    sprite: {
        imagePointer: "blackHoleSheet",
        frameCount: 49,
        dimension: [200, 200],
        size: [440, 440],
        frame: 0
    }
}