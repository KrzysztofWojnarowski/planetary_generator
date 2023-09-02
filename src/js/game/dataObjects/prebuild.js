export default [
    /*Star*/
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
    },
    /*planets*/
    {
        cellestial: {
        entity: {
            label: "Mercury"
        },
        physicalBody: {
            position: [2000, 0],
            velocity: [0, 0.5],
            force: [0, 0],
            m: 1,
            r: 10,
        },
        sprite: {
            imagePointer: "moonSheet",
            frameCount: 49,
            dimension: [100, 100],
            size: [240,240],  
            frame:0
        }
    }
}

];