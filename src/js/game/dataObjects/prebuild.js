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
                m: 5000,
                r: 520,
            },
            sprite: {
                imagePointer: "sunSheet",
                frameCount: 49,
                dimension: [200, 200],
                size: [1700, 1700],
                frame: 0
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
                position: [70000, 0],
                velocity: [0, 1],
                force: [0, 0],
                m: 1e-2,
                r: 80,
            },
            sprite: {
                imagePointer: "moonSheet",
                frameCount: 49,
                dimension: [100, 100],
                size: [150, 150],
                frame: 0
            }
        }
    },

    {
        cellestial: {
            entity: {
                label: "Venus"
            },
            physicalBody: {
                position: [47000, -100],
                velocity: [0, -1],
                force: [0, 0],
                m: 3e-1,
                r: 200,
            },
            sprite: {
                imagePointer: "marsSheet",
                frameCount: 49,
                dimension: [100, 100],
                size: [440, 440],
                frame: 0
            }
        }
    },
    {
        cellestial: {
            entity: {
                label: "Earth"
            },
            physicalBody: {
                position: [170000, 0],
                velocity: [0, 0.7],
                force: [0, 1.5],
                m: 1e-5,
                r: 100,
            },
            sprite: {
                imagePointer: "earthSheet",
                frameCount: 49,
                dimension: [100, 100],
                size: [240, 240],
                frame: 0
            }
        }
    },
    {
        cellestial: {
            entity: {
                label: "Saturn"
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
    },
    {
        cellestial: {
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
    },
    {
        cellestial: {
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
    },
    {
        cellestial: {
            entity: {
                label: "Beta Calumni"
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
    },
    {
        cellestial: {
            entity: {
                label: "Sasha Belli"
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
    }





];