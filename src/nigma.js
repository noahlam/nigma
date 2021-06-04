import { loadImage } from './utils/resource-loader.js';

export default class Nigma {
    constructor(container){
        if(typeof container === 'string') {
            this.wrapper = document.querySelector(container);
        }
        else {
            this.wrapper = container;
        }

        if(!this.wrapper || !this.wrapper.appendChild) {
            throw new Error('Nigma cannot get container to mount editor');
        }

        this.wrapper.style.position = 'absolute';
    }
    async setTemplate(template) {
        this.template = template;

        const { width, height } = template;
        this.width = width;
        this.height = height;

        await this.renderElements();
    }

    async renderElements() {
        const { elements } = this.template;
        if(!Array.isArray(elements)) return;

        for (let element of elements) {
            await this.renderElement(element);
        }
    }

    async renderElement(element) {
        const { width, height } = this;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;
        canvas.style.cssText = 'position: absolute; left: 0; top: 0;';

        this.wrapper.appendChild(canvas);

        const image = await loadImage(element.url);

        ctx.drawImage(image, 0,  0)

    }
}