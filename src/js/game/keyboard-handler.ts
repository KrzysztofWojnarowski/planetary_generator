import { GameContextHandler } from "../engine/game-contex-handler";
import { SpaceMap } from "./gauges/space-map";
import SpaceShip from "./ingame-objects/spaceship";

export class KeyboardHandler {
    bindShipKeys(ship: SpaceShip, document: Document) {
        document.addEventListener("keydown", e => {
            e.preventDefault();
            switch (e.key) {
                case "ArrowLeft": ship.handleArrowLeftPress();
                    break;
                case "ArrowRight": ship.handleArrowRightPress();
                    break;
                case "ArrowUp": ship.handleArrowUpPress();
                    break;
                case "ArrowDown": ship.handleArrowDownPress();
                    break;
            }
        });
        document.addEventListener("keyup", e => {
            e.preventDefault();
            switch (e.key) {
                case "ArrowLeft": ship.handleArrowLeftRelease();
                    break;
                case "ArrowRight": ship.handleArrowRightRelease();
                    break;
                case "ArrowUp": ship.handleArrowUpRelease();
                    break;
                case "ArrowDown": ship.handleArrowDownRelease();
                    break;
            }
        });
    }
    bindContextSwitchKeys(gameContextHandler: GameContextHandler, document: Document) {
        document.addEventListener("keydown", e => {
            e.preventDefault();
            switch (e.key) {
                case "Escape":
                    const currentContextObject = gameContextHandler.extractContext();
                    const currentContextUUID = gameContextHandler.getCurrentUUID();
                    let nextContext = currentContextUUID=="gameplay"?"menuContext":"gameplay";
                    gameContextHandler.registerContext(gameContextHandler.getCurrentUUID(), currentContextObject);
                    gameContextHandler.applyContext(nextContext);
                    break;
            }
        });
    }

    bindMiscControls(spaceMap:SpaceMap,document:Document){
        document.addEventListener("keydown",e=>{
            e.preventDefault();
            if (e.key=="m") spaceMap.shallDraw = true;
        });
        document.addEventListener("keyup",e=>{
            e.preventDefault();
            if (e.key =="m") spaceMap.shallDraw = false;
        });
    }
        
}