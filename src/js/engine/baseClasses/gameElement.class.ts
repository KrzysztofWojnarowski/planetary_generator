import { stringIndexed } from "../interfaces/stringIndexed.interface";

export class GameElement {
    props: stringIndexed = null;
    objectType: string = null;
    shallBeRemoved: boolean = false;
    rawData:stringIndexed;

    constructor(objectType: string, props: stringIndexed) {
        this.props = props;
        this.objectType = objectType;
    }
    get(prop: string) {
        return this.props[prop];
    }
    set(propName: string, value: any) {
        this.props[propName] = value;
    }
    getHandler(): string {
        const objectType = this.objectType;
        return objectType.charAt(0).toUpperCase() + objectType.slice(1) + "System";
    }
    exportProps() {
        return this.props;

    }
    query(path: string) {
        const queryArray: Array<string> = path.split("/");
        let returnComponent: GameElement = null;
        queryArray.forEach((prop, index) => {
            if (index == 0) {
                returnComponent = this.get(prop);
            } else {
                returnComponent = returnComponent.get(prop);
            }
        });
        return returnComponent;
    }
    has( property: string): boolean {
        return typeof this.get(property) != "undefined";
    }
    getRaw(){
        return this.rawData;
    }
}