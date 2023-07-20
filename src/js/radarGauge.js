export default class RadarGauge{

    observed = {};
    obstacles =[];
    setObserved(ship){
        this.observed = ship.getBody();
    }
    addObstacle(obstacle){
        this.obstacles.push(obstacle.getBody());
    }
    draw(context){
        this.drawRadar(context);
        context.translate(150,150);
        context.beginPath();
        context.strokeStyle="red";
        this.obstacles.forEach(e=>this.drawObstacle(context,e));
        context.stroke();
    }

    getRelativePosition(obstacle){

        return [
            -this.observed.x+obstacle.x,
            -this.observed.y+obstacle.y
        ]
    }

    inRange(obstacle,range){
        const r = this.getRelativePosition(obstacle);
        return Math.abs(r[0])<range && Math.abs(r[1])<range;   
    }

    drawRadar(context){
        context.translate(1200,100);
        context.fillStyle="rgba(120,200,120,0.5)";
        context.fillRect(0,0,300,300);
        context.beginPath();
        context.strokeStyle = "yellow";
        context.arc(150,150,125,0,Math.PI*2);
        context.moveTo(150,150);
        context.arc(150,150,1,0,Math.PI*2);
        context.stroke();


    }

    setOwner(spaceship){
        this.owner = spaceship.getBody();
    }

    drawObstacle(context,obstacle){
        //@TODO: Put radar range as constant into config
        let obstaclePosition = this.getRelativePosition(obstacle);
        //@TODO: Put radarScale as constant into config
        let scale = 0.08;
        if (this.inRange(obstacle,1000000)){
            context.moveTo(obstaclePosition[0]*scale,obstaclePosition[1]*scale);
            context.arc(obstaclePosition[0]*scale,obstaclePosition[1]*scale,1,0,2*Math.PI);
        }
    }



}