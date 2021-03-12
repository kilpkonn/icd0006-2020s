import Player from "../model/player";

class PlayerView {
    container: Element
    elem: HTMLImageElement
    constructor(baseContainer: Element) {
        this.container = baseContainer;
        this.elem = document.createElement('img');
        this.elem.style.position = 'absolute';
        this.onResize();

        window.addEventListener('resize', () => {
            this.onResize();
        });

        this.container.append(this.elem);
    }

    onResize() {
        const rect = this.container.getBoundingClientRect();
        const imgSize = `${0.06 * Math.min(rect.right - rect.left, rect.bottom - rect.top)}px`;
        this.elem.style.width = imgSize;
        this.elem.style.height = imgSize;
    }

    render(props: Player) {
        const rect = this.container.getBoundingClientRect();
        const baseX = rect.left + window.scrollX;
        const baseY = rect.top + window.scrollY;
        const baseWidth = rect.right - rect.left;
        const baseHeight = rect.bottom - rect.top;

        this.elem.style.left = `${baseX + baseWidth * props.x}px`;
        this.elem.style.top = `${baseY + (1 - props.y) * baseHeight}px`;
        this.elem.src = `./assets/character/frame-${1 + Math.ceil(props.time / 200) % 4}.png`
    }
}

export default PlayerView;
