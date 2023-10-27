import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const SashaBelli: stringIndexed = {

    entity: {
        label: "Sasha Belli",
        id:"Sasha001",
        group:"cellestials"
    },
    physicalBody: {
        position: [84000, 0],
        velocity: [0, 0.91],
        force: [0, 0],
        m: 1e-5,
        r: 250,
    },
    sprite: {
        imagePointer: "moonSheet",
        frameCount: 49,
        dimension: [100, 100],
        size: [600, 600],
        frame: 0
    }
}