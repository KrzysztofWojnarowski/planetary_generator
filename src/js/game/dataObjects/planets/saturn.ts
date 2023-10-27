import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const Saturn:stringIndexed = {
    entity: {
        label: "Saturn",
        id:"Saturn001",
        group:"cellestials"
    },
    physicalBody: {
        position: [17000, 0],
        velocity: [0, 0.7],
        force: [0, 1.5],
        m: 1e-5,
        r: 100,
    },
    sprite: {
        imagePointer: "saturnSheet",
        frameCount: 50,
        dimension: [300, 300],
        size: [300, 300],
        frame: 0
    }

}