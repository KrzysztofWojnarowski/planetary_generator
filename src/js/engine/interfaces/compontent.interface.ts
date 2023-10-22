export interface Component{
    getUUID():string,
    children:Map<string,Component>,
    getChildren():Map<string,Component>,
    getChildByUUID(uuid:string):Component,
    addChild(child:Component):Component,
    removeChild(uuid:string):Component,

}