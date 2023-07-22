import ThrottleGauge from "./ThrottleGauge";
import RadarGauge from "./radarGauge";

export default class Hud {

    watchList = [];
    gaugeList = []

    constructor(camera) {
        this.camera = camera;
        this.windowSize = camera.getDimension();
    }
    draw(context) {
        let [w, h] = this.windowSize;
        let [x, y] = this.camera.getPosition();
        context.translate(-x, -y);
        context.fillStyle = "rgba(80,60,60,0.5)";
        context.fillRect(0, 0, w, 100);
        this.gaugeList.forEach(e => {
           e.draw(context);
        });

    }
    watch(object) {
        this.watchList.push(object);
    }
    watchSystem(system){
        let radar = new RadarGauge();
        let throttleGauge = new ThrottleGauge();
        system.forEach(e=>{
            switch (e.constructor.name){
                case "SpaceShip":
                    radar.setObserved(e);
                    throttleGauge.setObserved(e);
                break;
                
            }
            this.gaugeList = [radar,throttleGauge];
        });
    }
    update(system){
        this.gaugeList.forEach(e=>{
            e.update(system);
        });
    }
}