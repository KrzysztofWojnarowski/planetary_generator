import { stringIndexed } from "../../../engine/interfaces/stringIndexed.interface";

export const basicCruiser:stringIndexed={
    sprite: {
        position: [237, 647],
        sizeSource: [55, 55],
        sizeDestination: [30, 30]
    },

    physicalBody: {
        position: [47000, 700],
        velocity: [0, -0.1],
        force: [0, 0],
        r: 3,
        m: 1e-17

    },
    staticCharacteristics: {
        title:"Ship Description",
        description: "This is basic crouiser ship type. Used for exploration of the space.",

    },
    resourceExtractor: {
        effectiveRange: 100,
        chargingSpeed: 1e4,
        acceptedResources: ["Energy", "QuantumOre"],
        currentResource: "Energy",
        resourceTank: "fuelTank"
    },
    fuelTank: {
        fuelType: "Energy",
        level: 6000,
        capacity: 30000
    },
    extraTankArray: [
        {
            fuelType: "QuantumOre",
            level: 200,
            capacity: 1200
        }
    ],
    engine: {
        power: 5,
        maxSpeed: 1.8,
        powerQuantum: 4e-21
    }
}