import Engine from "./engine.js";
import Physics from "./physics.js";
import Stage from "./stage.js";
import Camera from "./camera.js";
import Planets from "./planets.js";
import Config from "./config.js";
import Random from "lm_random/random";

function app() {
    const config = new Config();
    let random = new Random();
    random.seed(0.5);
    random.warmUp();
    let camera = new Camera(config.camera);
    let engine = new Engine(new Physics(config.physics), new Planets(random));
    let stage = new Stage(document.querySelector("#canvas").getContext("2d"), camera);
    engine.init();
    engine.store.system.forEach(element => {
        stage.add(element);
    });
    console.log(engine.store.system);
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
            case "z":camera.rotate([0,0.1]);
            break;
            case "x":camera.rotate([0.1,0]);
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