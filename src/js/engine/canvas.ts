export class Canvas {
    context: CanvasRenderingContext2D = null;
    dimension: [number, number] = [0,0];
    htmlElement: HTMLCanvasElement = null;

    constructor(htmlElement: HTMLCanvasElement) {
          this.context = htmlElement.getContext("2d");
    }

    setDimension(w: number, h: number): void {
        this.context.canvas.width = w;
        this.context.canvas.height = h;
    }

    getDimension(): [number, number] {
        return [
            this.context.canvas.width,
            this.context.canvas.height
        ]
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    resizeCanvas(): void {
        const canvas = this.context.canvas;
          // Get the current device's screen dimensions
        const [ screenWidth,  screenHeight ] = this.getScreenSize();

        // Set the canvas size to match the screen dimensions
        canvas.width = screenWidth;
        canvas.height = screenHeight;

        // Calculate the scaling factor to maintain the aspect ratio
        const scale = this.getScale(screenWidth, canvas.width, screenHeight, canvas.height);

        // Apply the scaling transformation
        this.context.scale(scale, scale);
    }

    private getScreenSize(): [number, number] {
        return [
            window.innerWidth,
            window.innerHeight
        ]
    }

    private getScale(screenWidth: number, canvasWidth: number, screenHeight: number, canvasHeight: number): number {
        return Math.min(screenWidth / canvasWidth, screenHeight / canvasHeight);
    }
}