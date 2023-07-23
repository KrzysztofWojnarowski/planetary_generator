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
import Canvas from "./canvas.js";
import Hud from "./hud.js";
import SpaceShip from "./spaceship.js";


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
    let canvas = new Canvas(document.querySelector("#canvas"));
    canvas.setDimension(
        window.innerWidth,
        window.innerHeight
    );

    const canvasDimension = canvas.getDimension();
    camera.setVisibleWindow(canvasDimension[0], canvasDimension[1]);
    camera.moveTo(
        canvasDimension[0] / 2,
        canvasDimension[1] / 2
    );

    let stage = new Stage(canvas.getContext(), camera);
    let builder = new Builder(planets);
    let system = [];
    prebuild.forEach(element => {
        system.push(builder.build(element));

    });
    let ship = builder.buildShip();
    system.push(ship);
    const context = canvas.getContext("2d");
    engine.init(context, system);
    let background = new Background();
    stage.setBackground(builder.buildBackground(background));
    let keyboardHandler = new KeyboardHandler();
    keyboardHandler.bindCameraKeys(camera, document);
    keyboardHandler.bindShipKeys(ship, document);
    camera.lockOn(ship.getBody());
    let hud= new Hud(camera);
    hud.watchSystem(system);
    ship.eventSystem.addListener("onRemove",(e,s)=>{
        e.getBody().markForRemoval=true;
    });
    ship.eventSystem.addListener("onUpdate",(e,s)=>{
        e.update(s.getPhysics());
        background.update(e.getBody());
    });

    function animate() {
        window.requestAnimationFrame(redraw);

    }
    function redraw() {
        if (stage.isLoaded(engine.store.system) && background.isLoaded() && ship.isLoaded()) {
            engine.update();
            camera.update();
            hud.update(engine.store.system);
            stage.redraw(engine.store.system.concat(hud));
        } else {
            console.log("loading");
        }
        animate();

    }
    animate();
}
window.addEventListener("DOMContentLoaded", app);