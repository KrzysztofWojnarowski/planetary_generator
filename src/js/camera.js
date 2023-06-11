export default class Camera {

    position = [5000, 5000];
    zoom = 0.1;
    move(vector) {
        this.position[0] += vector[0];
        this.position[1] += vector[1];
    }
    zoomIn() {
        this.zoom *= 1.1;
    }

    zoomOut() {
        this.zoom *= 0.9
    }

}