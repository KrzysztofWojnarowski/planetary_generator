import { Implementation } from "../baseClasses/Implementation.class";
import { Engine } from "../models/engine.model";
export class EngineImplementation extends Implementation {
    _engine: Engine = null;
    constructor(engine: Engine) {
        super();
        this._engine = engine;
    }
    getEngine(): Engine {
        return this._engine;
    }
    getPower(): number {
        return this._engine.power;
    }
    getMaxSpeed(): number {
        return this._engine.maxSpeed;
    }
    getPowerQuantum(): number {
        return this._engine.powerQuantum;
    }

}