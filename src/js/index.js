import Engine from "./engine.js";
import Physics from "./engine/physics.js";
import Stage from "./stage.js";
import Camera from "./camera.js";
import Planets from "./planets.js";
import Config from "./config.js";
import Random from "lm_random/random";
import Effects from "./engine/effects.js";
import prebuild from "./prebuild.js";
import Builder from "./builder.js";
import Background from "./game/background.js";
import KeyboardHandler from "./keyboardHandler.js";
import Canvas from "./canvas.js";
import Hud from "./game/hud.js";

function app() {
    const config = new Config();
    let random = new Random();
    random.seed(0.5);
    random.warmUp();
    let camera = new Camera(config.camera);
    let physics = new Physics(config.physics);
    let planets = new Planets(random);
    let engine = new Engine(physics);
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

    let builder = new Builder(planets);
    const imageLoader = builder.buildAssets();
    let system = [];
    prebuild.forEach(element => {
        system.push(builder.build(element));
        
    });
    let ship = builder.buildShip();
    system.push(ship);
    const context = canvas.getContext("2d");
    engine.init(context, system);
    let background = new Background();
    engine.bindBackground(builder.buildBackground(background));
    let keyboardHandler = new KeyboardHandler();
    keyboardHandler.bindCameraKeys(camera, document);
    keyboardHandler.bindShipKeys(ship, document);
    camera.lockOn(ship.getBody());
    engine.bindCamera(camera);
    engine.bindContext(context);
    let hud = new Hud(camera);
    hud.watchSystem(system);
    system.forEach(e=>{
        engine.registerPhysical(e);
    });
    function animate() {
        window.requestAnimationFrame(redraw);
        
    }
    imageLoader.eventSystem.addListener("onImagesReady", (e, s) => {
        console.log("everything loaded");
        animate();
    });
    engine.setLoader(imageLoader);
    
    function redraw() {
        engine.update();
        camera.update();
        hud.update(engine.store.system);
        engine.redraw();
        animate();
        
    }
    
}
window.addEventListener("DOMContentLoaded", app);