import { GameElement } from "../baseClasses/gameElement.class";

export interface EventStoreItem{
    type:string,
    emiterID?:string,
    emiterGroup?:string,
    subscriber:GameElement,
    handler:void
}