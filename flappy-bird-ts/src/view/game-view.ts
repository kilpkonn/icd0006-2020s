import Player from "../model/player";

class GameView {
    container: Element
    elem: HTMLSpanElement
    constructor(baseContainer: Element) {
        this.container = baseContainer;
        this.elem = document.createElement('span');
        this.elem.style.position = 'absolute';
        this.elem.style.zIndex = '99';
        this.onResize();

        window.addEventListener('resize', () => {
            this.onResize();
        });

        this.container.append(this.elem);
    }

    render(props: Player) {
        this.elem.textContent = props.score.toString();
    }

    onResize() {
        const rect = this.container.getBoundingClientRect();
        this.elem.style.left = `${0.45 * (rect.right - rect.left)}px`;
        this.elem.style.fontSize = `${0.1 * Math.min(rect.right - rect.left, rect.bottom - rect.top)}px`;
    }
}

export default GameView;
