export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = reject;

        setTimeout(reject, 30 * 1000);

        image.src = url;
    });
}
