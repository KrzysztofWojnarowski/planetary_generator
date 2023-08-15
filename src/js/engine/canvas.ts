export class Canvas {
    context: CanvasRenderingContext2D = null;
    dimension: [number, number] = [0,0];
    canvas: HTMLCanvasElement = null;

    constructor(htmlCanvasElement: HTMLCanvasElement) {
        this.canvas = htmlCanvasElement;
        this.context = htmlCanvasElement.getContext("2d");
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

    resize([screenWidth,  screenHeight]: [ number,  number ]): void {
        const canvas = this.context.canvas;
        // Set the canvas size to match the screen dimensions
        canvas.width = screenWidth;
        canvas.height = screenHeight;

        // Calculate the scaling factor to maintain the aspect ratio
        const scale = this.getScale(screenWidth, canvas.width, screenHeight, canvas.height);

        // Apply the scaling transformation
        this.context.scale(scale, scale);
    }

    private getScale(screenWidth: number, canvasWidth: number, screenHeight: number, canvasHeight: number): number {
        return Math.min(screenWidth / canvasWidth, screenHeight / canvasHeight);
    }
}