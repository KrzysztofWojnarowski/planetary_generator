import { stringIndexed } from "../interfaces/stringIndexed.interface";

export class GameElement {
    props: stringIndexed = null;
    objectType: string = null;
    shallBeRemoved: boolean = false;

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
}