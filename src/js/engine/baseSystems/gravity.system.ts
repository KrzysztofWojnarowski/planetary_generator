import { BaseSystem } from "../baseClasses/BaseSystem.class";
import { GameElement } from "../baseClasses/gameElement.class";
import { PhysicsHelper } from "../helpers/physics.helper";
import { PhysicalBody } from "../models/physicalBody.model";

export class GravitySystem extends BaseSystem {
    constructor() {
        super();
        this.handles = ["physicalBody"];
    }

    update(element: GameElement, list: Array<GameElement>): GameElement {

        return element;
    }



}