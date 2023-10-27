import { Implementation } from "../baseClasses/Implementation.class";
import { Tank } from "../models/tank.model";
export class ExtraTankImplementation extends Implementation {
    _tankArray: Array<Tank> = null;
    constructor(tankArray: Array<Tank>) {
        super();
        this._tankArray = tankArray;
    }
    getTankArray(): Array<Tank> {
        return this._tankArray;
    }
}