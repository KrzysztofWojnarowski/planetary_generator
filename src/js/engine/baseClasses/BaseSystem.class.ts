import { System } from "../interfaces/system.interface";
import { processedSystemComponents } from "../systemManager/processedType";

import { GameElement } from "./gameElement.class";

export class BaseSystem implements System {
    handles: Array<string>;
    name: string;
    state:GameElement;
    constructor() {
        this.handles = [];
    }
    update(element: GameElement, localState: GameElement[]): GameElement {
        throw new Error("Method not implemented.");
    }
    delegate(): { [k: string]: Array<GameElement> } {
        return {};
    }
    setState(element:GameElement):GameElement{
        return this.state = element;
    }
    useState():GameElement{
        return this.state;
    }

}
