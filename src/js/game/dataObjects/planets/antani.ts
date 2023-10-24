import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const Antani:stringIndexed={
    entity: {
        label: "Antani"
    },
    physicalBody: {
        position: [100000, 0],
        velocity: [0, -0.41],
        force: [0, 1.5],
        m: 1e-3,
        r: 70,
    },
    sprite: {
        imagePointer: "redDwarfSheet",
        frameCount: 50,
        dimension: [200, 200],
        size: [240, 240],
        frame: 0
    }
}