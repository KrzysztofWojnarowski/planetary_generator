export class Position {
    position = [0,0];

    getPosition(){
        return this.position
    }
    
    setPosition(position: [number, number]){
        this.position = position;
    }
}