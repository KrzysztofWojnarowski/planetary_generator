import { GameElement } from "../baseClasses/gameElement.class";
import { stringIndexed } from "../interfaces/stringIndexed.interface";

export abstract class GameElementFactory {
    static build(compontnType: string, data: stringIndexed) {
        let complexComponent = new GameElement(compontnType, data);

        Object.keys(data).forEach(element => {
            if (typeof data[element] == "object") {
                complexComponent.set(element, GameElementFactory.build(element, data[element]));
            }
        });
        return complexComponent;
    }
}