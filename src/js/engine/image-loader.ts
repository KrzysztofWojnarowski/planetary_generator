export class ImageLoader {
    static load(url: string): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            const image = new Image();
            image.addEventListener("load", (e) => {
                resolve(image);
            });

            image.src = url;
        });
    }
}