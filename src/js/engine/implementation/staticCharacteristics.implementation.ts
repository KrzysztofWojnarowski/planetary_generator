import { Implementation } from "../baseClasses/Implementation.class";
import { GameObject } from "../interfaces/gameObject.interface";
import { StaticCharacteristics } from "../models/staticCharacteristics.model";

export class staticCharacteristicsImplementation extends Implementation{
    _staticCharacteristics:StaticCharacteristics;
    constructor(staticCharacteristics:StaticCharacteristics){
        super();
        this._staticCharacteristics = staticCharacteristics;
    }
    getTitle():string{return this._staticCharacteristics.title}
    getDescription():string{return this._staticCharacteristics.description}
    getStaticCharasteristics():StaticCharacteristics{return this._staticCharacteristics}

}
