import { Tank } from "../models/tank.model";

export class TankImplementation{

    _tank:Tank = null;
    constructor(tank:Tank){
        this._tank = tank;
    }
    getLevel():number{
        return this._tank.level;
    }
    setLevel(level:number){
        this._tank.level = level;
    }
    getCapacity(){
        return this._tank.capacity;
    }
    getFuelType():string{
        return this._tank.fuelType;
    }

}