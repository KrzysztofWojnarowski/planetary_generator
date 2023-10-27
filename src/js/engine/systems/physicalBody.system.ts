
import { BaseSystem } from "../baseClasses/System.class";
import { GameElement } from "../baseClasses/gameElement.class";
import { PhysicsConfigModel } from "../models/PhysicsConfig.model";
import { PhysicsHelper } from "../helpers/physics.helper";
import { PhysicalBody } from "../models/physicalBody.model";

export abstract class PhysicalBodySystem extends BaseSystem {

    static config: PhysicsConfigModel;

    draw() { }

    static update(component: GameElement, ownerElement: GameElement, state: GameElement[]): void {

        let componentBody: PhysicalBody = component.exportProps() as PhysicalBody;
        state.forEach(item => {
            if (BaseSystem.has(item, "physicalBody")) {
                const neighbour: PhysicalBody = item.get("physicalBody").exportProps() as PhysicalBody;
                if (neighbour != componentBody) {
                    const newBody = PhysicalBodySystem.processPhysics(componentBody, neighbour);
                    ownerElement.set("physicalBody", newBody);
                }
            }
        });

    }
    static init(config: { dt: number, G: number }) {
        PhysicalBodySystem.config = config;
    }
    private static processPhysics(focused: PhysicalBody, neighbour: PhysicalBody): GameElement {
        const updatedBody = focused;
        updatedBody.force = PhysicsHelper.calculateForce(focused, neighbour, PhysicalBodySystem.config);
        updatedBody.velocity = PhysicsHelper.calculateSpeed(focused, PhysicalBodySystem.config);
        updatedBody.position = PhysicsHelper.calculatePosition(focused, PhysicalBodySystem.config);
        return new GameElement("physicalBody", updatedBody);
    }


}