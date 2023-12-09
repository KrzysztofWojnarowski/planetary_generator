export class Implementation{
    
    getHandler():string{
        return this.constructor.name.replace("Implementation","System");
    }
}