import { PhysicalBody } from "../models/physicalBody.model";
import { Vector } from "../models/vector.model";

export default class PhysicalBodyImplementation{
    _physicalBody:PhysicalBody;
    constructor(physicalBody:PhysicalBody){
        this._physicalBody = physicalBody;
    }
    getBody():PhysicalBody{
        return this._physicalBody;
    }
    getPosition():Vector{
        return this._physicalBody.position
    }
    getVelocity():Vector{
        return this._physicalBody.velocity;
    }
    getForce():Vector{
        return this._physicalBody.force;
    }
    getMass():number{
        return this._physicalBody.m;
    }
    getRadius():number{
        return this._physicalBody.r;
    }
    setPosition(position:Vector){
        this._physicalBody.position = position;
    }
    setVelocity(velocity:Vector){
        this._physicalBody.velocity = velocity;
    }
    setForce(force:Vector){
        this._physicalBody.force = force;
    }
    setMass(mass:number){
        this._physicalBody.m = mass;
    }
    setRadius(radius:number){
        this._physicalBody.r = radius;
    }
}