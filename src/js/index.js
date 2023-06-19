import Engine from "./engine.js";
import Physics from "./physics.js";
import Stage from "./stage.js";
import Camera from "./camera.js";
import Planets from "./planets.js";
import Config from "./config.js";
import Random from "lm_random/random";
import EffectManager from "./effectManager.js";
import Effects from "./effects.js";
import prebuild from "./prebuild.js";
import Builder from "./builder.js";
import Background from "./background.js";
import KeyboardHandler from "./keyboardHandler.js";


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
    let engine = new Engine(physics, effectManager);
    let canvasDom = document.querySelector("#canvas");

    camera.moveTo(
        window.innerWidth / 2,
        window.innerHeight / 2

    );
    let canvas = canvasDom.getContext("2d");

    canvas.canvas.width = window.innerWidth;
    canvas.canvas.height = window.innerHeight;
    let stage = new Stage(canvas, camera);
    let builder = new Builder(planets);
    let system = [];
    prebuild.forEach(element => {
        system.push(builder.build(element));

    });
    let ship = builder.buildShip();
    system.push(ship);
    engine.init(canvas, system);
    engine.store.system.forEach(element => {
        stage.add(element);
    });

    let background = new Background();

    stage.setBackground(builder.buildBackground(background));

   let keyboardHandler = new KeyboardHandler();
   keyboardHandler.bindCameraKeys(camera,document);
   keyboardHandler.bindShipKeys(ship,document);
    camera.lockOn(ship.getBody());



    function animate() {
        window.requestAnimationFrame(redraw);

    }
    function redraw() {
        if (stage.isLoaded(engine.store.system) && background.isLoaded()&&ship.isLoaded()) {
            engine.update();
            ship.update(physics);
            camera.update();

            stage.redraw(engine.store.system.concat([ship]));
        } else {
            console.log("loading");
        }
        animate();

    }
    animate();
}
window.addEventListener("DOMContentLoaded", app);