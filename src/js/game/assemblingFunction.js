import ThrottleMeter from "./gauges/throttleMeter";
import prebuild from "../prebuild";
import Background from "./background";
import KeyboardHandler from "./keyboardHandler";
import Accelerometer from "./gauges/accelerometer";
import EnergyMeter from "./gauges/energyMeter";
import RadarGauge from "./gauges/radarGauge";
import GameContextHandler from "../engine/gameContextHandler";
import MenuFrame from "./menuItems/menuFrame";
import MenuContent from "./menuItems/menuContent";

export default function assemblingFunction(engine) {
    console.log("assembling things");
    const gameContextHandler = new GameContextHandler(engine);
    const keyboardHandler = new KeyboardHandler();
    buildGameplayContext(engine,keyboardHandler);
    const gameContext =  gameContextHandler.extractContext();
    gameContextHandler.registerContext("gameplay",gameContext);
    gameContextHandler.applyContext("gameplay");
    const newContext = gameContextHandler.createNewContext();
    gameContextHandler.registerContext("menuContext",newContext);
    gameContextHandler.applyContext("menuContext");
    buildMenuContext(engine);
    gameContextHandler.applyContext("menuContext");
    keyboardHandler.bindContextSwitchKeys(gameContextHandler,document);
    
}

function buildMenuContext(engine,keyboardHandler){
    let menuFrame = new MenuFrame(engine);
    engine.registerDrawable(menuFrame);
    let menuContent = new MenuContent(engine);
    engine.registerDrawable(menuContent);

}

function buildGameplayContext(engine,keyboardHandler){
    let background = new Background();
    const builder = engine.builder;
    let system = [];
    prebuild.forEach(element => {
        system.push(builder.build(element));

    });
    engine.loadSystem(system);
    engine.bindBackground(builder.buildBackground(background));    
    let ship = builder.buildShip();
    engine.store.system.push(ship);
    engine.camera.lockOn(ship.getBody());
    keyboardHandler.bindShipKeys(ship, document);
    let throttleMeter = new ThrottleMeter(engine);
    let accelerometer = new Accelerometer(engine);
    let energyMeter = new EnergyMeter(engine);
    let radarGauge = new RadarGauge(engine);
    radarGauge.bindOwner(ship);
    energyMeter.bindOwner(ship);
    throttleMeter.bindOwner(ship);
    accelerometer.bindOwner(ship);
    engine.registerDrawable(radarGauge);
    engine.registerDrawable(throttleMeter);
    engine.registerDrawable(accelerometer);
    engine.registerDrawable(energyMeter);
    engine.store.system.forEach(e => {
        engine.registerPhysical(e);
    });
}   