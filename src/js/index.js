import Engine from "./engine.js"
function app(){
    let engine = new Engine();
    engine.init();
    window.requestAnimationFrame(()=>{

    });
}










window.addEventListener("DOMContentLoaded",app);