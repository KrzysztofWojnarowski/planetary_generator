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


    bindCameraKeys(camera, document) {
        document.addEventListener("keypress", e => {
            e.preventDefault();
            switch (e.key) {
                case "w": camera.move([0, 10]);
                    break;
                case "s": camera.move([0, -10]);
                    break;
                case "a": camera.move([-10, 0]);
                    break;
                case "d": camera.move([10, 0]);
                    break;
                case "q": camera.zoomIn();
                    break;
                case "e": camera.zoomOut();
                    break;
                case "r": engine.restart();
                    break;
                case "z": camera.rotate([0, 0.1]);
                    break;
                case "x": camera.rotate([0.1, 0]);
                    break;
            }
        }
        );
    }
}