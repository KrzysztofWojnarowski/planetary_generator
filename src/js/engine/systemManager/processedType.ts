import { System } from "../interfaces/system.interface";
import { GameElement } from "../baseClasses/gameElement.class";

export type processedSystemComponents = {
    system: System;
    list: Array<GameElement>;
};
