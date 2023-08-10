export default class Canvas{

    context = {}
    dimension=[0,0];
    htmlElement = {};

    constructor(htmlElement){
          this.context = htmlElement.getContext("2d");
    }
    setDimension(w,h){
        this.context.canvas.width=w;
        this.context.canvas.height = h;
    }
    getDimension(){
        return [
            this.context.canvas.width,
            this.context.canvas.height
        ]
    }
    getContext(){
        return this.context;
    }
}