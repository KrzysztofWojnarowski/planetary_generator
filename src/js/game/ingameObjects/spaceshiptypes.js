export default {

    bascicCrousier:{
        sprite:{
            position:[237,647],
            sizeSource:[55,55],
            sizeDestination:[30,30]
        },
        energy:30000,
        energyCapacity:30000,
        effectiveRange:100,
        chargingSpeed:5,
        power:5,
        m:1e-4,
        r:3,
        maxSpeed:0.1,
        powerQuantum:1e-9

    },

    fastInterceptor: {
        sprite: {
            position: [237, 647],  // Using same sprite for now
            sizeSource: [55, 55],
            sizeDestination: [25, 25]  // Slightly smaller
        },
        energy: 20000,
        energyCapacity: 20000,
        effectiveRange: 80,
        chargingSpeed: 8,  // Faster charging
        power: 3,  // Less power
        m: 0.8e-4,  // Lighter
        r: 2.5,
        maxSpeed: 0.15,  // Faster
        powerQuantum: 1.2e-9  // More efficient
    },

    heavyCruiser: {
        sprite: {
            position: [0, 0],  // Changed to a different sprite position
            sizeSource: [319, 140],
            sizeDestination: [130, 55]  // Larger
        },
        energy: 45000,
        energyCapacity: 45000,
        effectiveRange: 120,
        chargingSpeed: 3,  // Slower charging
        power: 8,  // More power
        m: 1.5e-4,  // Heavier
        r: 15,
        maxSpeed: 0.07,  // Slower
        powerQuantum: 0.8e-9  // Less efficient
    },

    balancedFighter: {
        sprite: {
            position: [237, 647],  // Using same sprite for now
            sizeSource: [55, 55],
            sizeDestination: [30, 30]
        },
        energy: 35000,
        energyCapacity: 35000,
        effectiveRange: 110,
        chargingSpeed: 6,
        power: 6,
        m: 1.1e-4,
        r: 3,
        maxSpeed: 0.12,
        powerQuantum: 1.1e-9
    },

    supportShip: {
        sprite: {
            position: [237, 647],  // Using same sprite for now
            sizeSource: [55, 55],
            sizeDestination: [28, 28]
        },
        energy: 40000,
        energyCapacity: 40000,
        effectiveRange: 150,  // Longer range
        chargingSpeed: 7,  // Fast charging
        power: 4,  // Less power
        m: 1.2e-4,
        r: 3,
        maxSpeed: 0.09,
        powerQuantum: 1.3e-9  // Most efficient
    }

}