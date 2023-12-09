export class Config {
    camera = {
        position: [0, 0],
        zoom: 1,
        angle: [0, Math.PI / 2]
    }
    system={
        planetCount:12,
        starCount:2,
        moonCount:0
    }
    physics={
        G:1e-4,
        dt:3
    }
   static PhysicalBodySystem={
        G:1e-4,
        dt:3
    }
    windowSize=[1200,800]

}