import { Engine } from "../models/engine.model";
export class EngineImplementation {
    _engine: Engine = null;
    constructor(engine: Engine) {
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