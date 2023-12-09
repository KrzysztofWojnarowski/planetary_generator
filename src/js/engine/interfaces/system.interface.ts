import { GameElement } from "../baseClasses/gameElement.class";

export interface System {
    handles:Array<string>;
    name:string;
    state:GameElement;
    update(element:GameElement,localState:Array<GameElement>): GameElement;  
    delegate():{[k:string]:Array<GameElement>}; 
    setState(element:GameElement):void;
}