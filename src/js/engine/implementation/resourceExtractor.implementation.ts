import { ResourceExtractor } from "../models/resourceExtractor.model";

export default class ResourceExtractorImplementation {

    _resourceExtractor:ResourceExtractor = null;

    constructor(resourceExtractor:ResourceExtractor){
        this._resourceExtractor = resourceExtractor;
    }
    getEffectiveRange():number{
        return this._resourceExtractor.effectiveRange;
    }
    setEffectiveRange(effectiveRange:number){
        this._resourceExtractor.effectiveRange = effectiveRange;
    }
    getChargingSpeed():number{
        return this._resourceExtractor.chargingSpeed;
    }
    setChargingSpeeed(chargingSpeed:number){
        this._resourceExtractor.chargingSpeed = chargingSpeed;
    }
    getAcceptedResources():Array<string>{
        return this._resourceExtractor.acceptedResources;
    }
    getCurrentResource():string{
        return this._resourceExtractor.currentResource;
    }
    setCurrentResource(resourceName:string){
        this._resourceExtractor.acceptedResources.includes(resourceName) 
        ?
        (this._resourceExtractor.currentResource=resourceName)
        :
        console.log("This resource Extractor can't harvest: "+resourceName);
    }
    getResourceTank():string{
        return this._resourceExtractor.resourceTank;
    }
    setResourceTank(resourceTankName:string){
        this._resourceExtractor.resourceTank = resourceTankName;
    }
}