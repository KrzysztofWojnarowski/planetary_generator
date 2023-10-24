import { GameObject } from "../interfaces/gameObject.interface";
import { Tank } from "../models/tank.model";
export class ExtraTankImplementation implements GameObject{
    _tankArray:Array<Tank>  = null;
    constructor(tankArray:Array<Tank>){
        this._tankArray = tankArray;

    }
}