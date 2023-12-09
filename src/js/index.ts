import Engine from "./engine/engine";
import { Physics } from "./engine/physics";
import { Camera } from "./engine/camera";
import { Config } from "./game/config";
// @ts-ignore
import Random from "lm_random/random";
import { Builder } from "./game/builder";
import { Canvas } from "./engine/canvas";
import { assemblingFunction } from "./game/assembling-function";
import { EngineNew } from "./engine/Engine.new";
import { StateManager } from "./engine/stateManager/state.manager";
import { gameElements } from "./game/dataObjects/game.elements";

function app() {
    const config = new Config();
    let random = new Random();
    random.seed(0.5);
    random.warmUp();

    let camera = new Camera(config.camera);
    let physics = new Physics(config.physics);
    let engine = new Engine(physics);
    const canvas = new Canvas(document.querySelector("#canvas"));
    const builder = new Builder();
    
    engine.builder = builder;
    canvas.resize(getScreenSize());
    const canvasDimension = canvas.getDimension();

    camera.setVisibleWindow(canvasDimension[0], canvasDimension[1]);
    camera.moveTo(
        canvasDimension[0] / 2,
        canvasDimension[1] / 2
    );
    engine.bindCamera(camera);
    const imageLoader = builder.buildAssets();
    engine.setLoader(imageLoader);
    const context = canvas.getContext();
    engine.bindContext(context);
    //Refactor abstraction layer - new Engine class in ts to replace old engine
    StateManager.buildStateFromStringIndexedMap(gameElements);
    EngineNew.importState(StateManager.exportState());
    const newEngine = new EngineNew();
    
    imageLoader.eventSystem.addListener("onImagesReady", () => {
        console.log("everything loaded");
        engine.assemble(assemblingFunction).then(() => {
            animate();
        });
    });

    function animate() {
        window.requestAnimationFrame(redraw);
    }
    function redraw() {
        newEngine.update();
        engine.update();
        camera.update();
        engine.redraw();
        animate();
    }

    function getScreenSize(): [number, number] {
        return [
            window.innerWidth,
            window.innerHeight
        ]
    }
}
window.addEventListener("DOMContentLoaded", app);