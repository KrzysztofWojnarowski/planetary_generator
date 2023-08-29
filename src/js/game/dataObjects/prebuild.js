export default [
    {
        cellestial: {
            entity: {
                label: "Sun"
            },
            physicalBody: {
                position: [0, 0],
                velocity: [0, 0],
                force: [0, 0],
                m: 100,
                r: 120,
            },
            sprite: {
                imagePointer: "sunSheet",
                frameCount: 49,
                dimension: [200, 200],
                size: [240,240],  
                frame:0
            }
        }
    }/*,
    {
        label: "Saturn",
        type: "planet",
        frameCount: 49,
        x: -250,
        y: 0,
        m: 0.000005,
        r: 37,
        image: "assets/6.png",
        gameImage: "saturnSheet",
        frameSize: [100, 100],
        vx: -0.0001,
        vy: 0.11
    },
    {
        label: "Earth",
        type: "planet",
        frameCount: 49,
        x: 1000,
        y: 0,
        m: 2e-4,
        r: 20,
        image: "assets/3.png",
        gameImage: "earthSheet",
        frameSize: [100, 100],
        vx: -0.0001,
        vy: 0.08
    },
    {
        label: "Mars",
        type: "planet",
        frameCount: 49,
        x: 100,
        y: 2100,
        m: 1e-5,
        r: 30,
        image: "assets/4.png",
        gameImage: "marsSheet",
        frameSize: [100, 100],
        vx: 0.08,
        vy: -0.009
    },
    {
        label: "Saturn",
        type: "planet",
        frameCount: 49,
        x: 100,
        y: 300,
        m: 0.000000000005,
        r: 70,
        image: "assets/5.png",
        gameImage: "saturnSheet",
        frameSize: [300, 300],
        vx: 0.01,
        vy: -0.0007
    }*/

];