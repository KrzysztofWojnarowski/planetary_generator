//scripts for helper functions
const G = 0.01;

const body = {
    physicalBody: {
        position: [0, 0],
        velocity: [0, 0],
        force: [0, 0],
        m: 1000,
        r: 120,
    },
}

function getFirstCosmicVelocity(physicalBody){

    return Math.sqrt(G*physicalBody.m/physicalBody.r)
}
console.log(getFirstCosmicVelocity(body.physicalBody));