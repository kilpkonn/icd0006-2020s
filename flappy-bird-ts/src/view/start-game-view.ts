
class StartGameView {
    container: Element
    elem: HTMLSpanElement
    constructor(baseContainer: Element) {
        this.container = baseContainer;
        this.elem = document.createElement('span');
        this.elem.style.position = 'absolute';
        this.elem.style.zIndex = '98';
        this.onResize();

        window.addEventListener('resize', () => {
            this.onResize();
        });

        this.container.append(this.elem);
    }

    render(props: object) {
        this.elem.textContent = "Press space to start...";
    }

    onResize() {
        const rect = this.container.getBoundingClientRect();
        this.elem.style.left = `${0.35 * (rect.right - rect.left)}px`;
        this.elem.style.top = `${0.4 * (rect.bottom - rect.top)}px`;
        this.elem.style.fontSize = `${0.1 * Math.min(rect.right - rect.left, rect.bottom - rect.top)}px`;
    }

    hide() {
        this.elem.style.visibility = 'hidden';
    }

    show() {
        this.elem.style.visibility = 'visible';
    }
}

export default StartGameView;
