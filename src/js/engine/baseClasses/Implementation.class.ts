export class Implementation{
    [x: string]: any;
    getHandler():string{
        return this.constructor.name.replace("Implementation","System");
    }
}