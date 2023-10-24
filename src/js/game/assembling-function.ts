import prebuild from "./dataObjects/prebuild";
import Background from "./background";
import { KeyboardHandler } from "./keyboard-handler";
import { GameContextHandler }  from "../engine/game-contex-handler";
import { ThrottleMeter } from "./gauges/throttle-meter";
import { Accelerometer } from "./gauges/accelerometer";
import { EnergyMeter } from "./gauges/energy-meter";
import { MenuFrame } from "./menuItems/menu-frame";
import { MenuContent } from "./menuItems/menu-content";
import Engine from "../engine/engine";
import { SpaceMap } from "./gauges/space-map";
import { gameMap } from "./dataObjects/map";
import { spaceshiptypes } from "./dataObjects/spaceshiptypes";
import { gameElements } from "./dataObjects/game.elements";
import { EngineNew } from "../engine/Engine.new";

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
    EngineNew.importState( builder.buildExperimental(gameElements));
    prebuild.forEach(element => {
        system.push(builder.build(element,engine));
    });
    engine.loadSystem(system);

    let background = new Background();
    const builderBackground = await builder.buildBackground(background)
    engine.bindBackground(builderBackground);

    let ship = builder.buildShip();
    engine.store.system.push(ship);

    
    engine.camera.lockOn(ship.getBody());
    const spaceMap = new SpaceMap(gameMap);
    builder.buildSpaceMap(spaceMap,engine);
    engine.spaceMap = spaceMap;
    keyboardHandler.bindMiscControls(spaceMap,document);
    keyboardHandler.bindShipKeys(ship, document);
    let throttleMeter = new ThrottleMeter(engine);
    let accelerometer = new Accelerometer(engine);
    let energyMeter = new EnergyMeter(engine);
    let radarGauge = builder.buildRadar(engine);
    engine.registerDrawable(radarGauge);

    radarGauge.bindOwner(ship);
    energyMeter.bindOwner(ship);
    throttleMeter.bindOwner(ship);
    accelerometer.bindOwner(ship);

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