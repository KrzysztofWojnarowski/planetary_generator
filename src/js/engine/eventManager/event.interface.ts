import { GameElement } from "../baseClasses/gameElement.class";
import { stringIndexed } from "../interfaces/stringIndexed.interface";

export interface Event{
    name:string,
    trigger:GameElement
    params:stringIndexed
}