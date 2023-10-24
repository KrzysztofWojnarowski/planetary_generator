import { stringIndexed } from "../interfaces/stringIndexed.interface";

export class GameElement{
    props:stringIndexed = null;
    objectType:string = null;

    constructor(objectType:string,props:stringIndexed){
        this.props = props;
        this.objectType = objectType;
    }
    get(prop:string){
        return this.props[prop];
    }
    set(propName:string,value:stringIndexed){
        this.props[propName] = value;
    }
}