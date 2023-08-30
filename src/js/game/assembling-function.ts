import prebuild from "./dataObjects/prebuild";
import Background from "./background";
import { KeyboardHandler } from "./keyboard-handler";

import { GameContextHandler }  from "../engine/game-contex-handler";

import { ThrottleMeter } from "./gauges/throttle-meter";
import { Accelerometer } from "./gauges/accelerometer";
import { EnergyMeter } from "./gauges/energy-meter";
import { RadarGauge } from "./gauges/radar-gauge";
import { MenuFrame } from "./menuItems/menu-frame";
import { MenuContent } from "./menuItems/menu-content";
import Engine from "../engine/engine";

export async function assemblingFunction(engine: Engine) {
    console.log("assembling things");
    const gameContextHandler = new GameContextHandler(engine);
    const keyboardHandler = new KeyboardHandler();
    await buildGameplayContext(engine,keyboardHandler);
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

function buildMenuContext(engine: Engine){
    const screenSize: [number, number] = [window.innerWidth, window.innerHeight];
    const menuFrame = new MenuFrame(engine, screenSize);
    engine.registerDrawable(menuFrame);
    const menuContent = new MenuContent(engine);
    engine.registerDrawable(menuContent);
}

async function buildGameplayContext(engine: Engine, keyboardHandler: KeyboardHandler) {
    const builder = engine.builder;
    let system: any = [];
    prebuild.forEach(element => {
        console.log(element);
        system.push(builder.build(element,engine));
    });
    engine.loadSystem(system);

    let background = new Background();
    const builderBackground = await builder.buildBackground(background)
    engine.bindBackground(builderBackground);

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

    // Not working
    engine.registerDrawable(throttleMeter);
    console.log('throttleMeter', throttleMeter);

    // Not working
    engine.registerDrawable(accelerometer);
    engine.registerDrawable(energyMeter);
    engine.store.system.forEach((e: any) => {
        engine.registerPhysical(e);
    });
}   