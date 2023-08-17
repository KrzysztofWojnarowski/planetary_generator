export class ImageLoader {
    static load(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", (e) => {
                resolve(image);
            });

            image.addEventListener("error", (eventError) => {
                console.error(`There was an error loading image from ${url}`);
                reject(eventError);
            });

            image.src = url;
        });
    }
}