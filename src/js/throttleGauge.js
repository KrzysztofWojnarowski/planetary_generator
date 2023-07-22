export default class ThrottleGauge{

    observed = {};
    setObserved(ship){
        this.observed = ship;
    }
    draw(context){
        context.fillStyle = "rgba(200,200,200,0.9)";
        context.fillText(this.observed.getThrottle(),100,10);
    }
    update(system){
        return system;
    }
}