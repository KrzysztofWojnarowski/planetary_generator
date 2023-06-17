import Engine from "./engine.js";
import Physics from "./physics.js";
import Stage from "./stage.js";
import Camera from "./camera.js";
import Planets from "./planets.js";
import Config from "./config.js";
import Random from "lm_random/random";
import EffectManager from "./effectManager.js";
import Effects from "./effects.js";
import assetList from "./assetList.js";
import Sprite from "./sprite.js";
import prebuild from "./prebuild.js";
import Builder from "./builder.js";
import Background from "./background.js";


function app() {
    const config = new Config();
    let random = new Random();
    random.seed(0.5);
    random.warmUp();
    let camera = new Camera(config.camera);
    let physics = new Physics(config.physics);
    let planets = new Planets(random);
    let effects = new Effects();
    let effectManager = new EffectManager(physics, effects);
    let engine = new Engine(physics, planets, effectManager);
    let canvas = document.querySelector("#canvas").getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let stage = new Stage(canvas, camera);
    let builder = new Builder(planets);
    let system = [];
    prebuild.forEach(element => {
        system.push(builder.build(element));

    });

    engine.init(canvas, system);
    engine.store.system.forEach(element => {
        stage.add(element);
    });

    let background = new Background();
    
    stage.setBackground(builder.buildBackground(background));


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
            case "z": camera.rotate([0, 0.1]);
                break;
            case "x": camera.rotate([0.1, 0]);
                break;
        }
    }
    );

    function animate() {
        window.requestAnimationFrame(redraw);

    }
    function redraw() {
        if (stage.isLoaded(engine.store.system)&&background.isLoaded()) {
            engine.update();

            stage.redraw(engine.store.system);
        }else{
            console.log("loading");
        }
        animate();

    }
    animate();
}










window.addEventListener("DOMContentLoaded", app);