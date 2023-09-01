import Engine from "./engine/engine";
import { Physics } from "./engine/physics";
import { Camera } from "./engine/camera";
import { Planets } from "./game/ingame-objects/planets";
import { Config } from "./game/config";
// @ts-ignore
import Random from "lm_random/random";
import { Builder } from "./game/builder";
import { Canvas } from "./engine/canvas";
import { assemblingFunction } from "./game/assembling-function";

function app() {
    const config = new Config();
    let random = new Random();
    random.seed(0.5);
    random.warmUp();

    let camera = new Camera(config.camera);
    let physics = new Physics(config.physics);
    let planets = new Planets(random);
    let engine = new Engine(physics);
    const canvas = new Canvas(document.querySelector("#canvas"));
    const builder = new Builder(planets);
    
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