import Engine from "./engine.js";
import Physics from "./physics.js";
import Stage from "./stage.js";
import Camera from "./camera.js";
import Planets from "./planets.js";
function app() {
    let camera = new Camera()
    let engine = new Engine(new Physics(), new Planets);
    let stage = new Stage(document.querySelector("#canvas").getContext("2d"), camera);
    engine.init();
    engine.store.system.forEach(element => {
        stage.add(element);
    });
    stage.applyFill();
    stage.applyStroke();
    document.addEventListener("keypress", e => {
        e.preventDefault();
        switch (e.key) {
            case "w": camera.move([0, 10]);
                break;
            case "s": camera.move([0, -10]);
                break;
            case "a": camera.move([-10, 0]);
                break;
            case "d": camera.move([10, 0]);
                break;
            case "q": camera.zoomIn();
                break;
            case "e": camera.zoomOut();
                break;
            case "r": engine.restart();
            break;    


        }
    }
    );

    function animate() {
        window.requestAnimationFrame(redraw);

    }
    function redraw() {
        engine.update();
        stage.redraw(engine.store.system);
        animate();

    }
    animate();
}










window.addEventListener("DOMContentLoaded", app);