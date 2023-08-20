export default class KeyboardHandler {


    bindShipKeys(ship, document) {
        document.addEventListener("keydown", e => {
            e.preventDefault(e);
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
            e.preventDefault(e);
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
    bindContextSwitchKeys(gameContextHandler, document) {
        document.addEventListener("keydown", e => {
            e.preventDefault(e);
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



}