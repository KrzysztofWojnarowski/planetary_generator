import { GameElement } from "../baseClasses/gameElement.class";
import { GameElementFactory } from "../factory/gameElement.factory";
import { stringIndexed } from "../interfaces/stringIndexed.interface";

export abstract class StateManager {

    private static state: Array<GameElement> = [];

    static buildGameElementByType(componentType: string, componentList: Array<stringIndexed>) {
        const agregatedComponents: Array<GameElement> = []
        componentList.forEach(component => {
            const componentElement = GameElementFactory.build(componentType, component);
            agregatedComponents.push(componentElement);
        });
        return agregatedComponents;
    }

    static buildStateFromStringIndexedMap(gameObjects: stringIndexed) {
        for (let type in gameObjects) {
            StateManager.buildGameElementByType(type, gameObjects[type]).forEach(component => {
                StateManager.state.push(component);
            });
        }
    }

    static exportState(){
        return StateManager.state;
    }
    




}