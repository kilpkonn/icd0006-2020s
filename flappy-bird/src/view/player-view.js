class PlayerView {
    constructor(baseContainer) {
        this.container = baseContainer;
        this.elem = document.createElement('img');
        this.elem.style.position = 'absolute';

        const rect = this.container.getBoundingClientRect();
        const imgSize = `${Math.min((rect.right - rect.left) / 20, rect.bottom - rect.top / 11)}px`;
        this.elem.style.width = imgSize;
        this.elem.style.height = imgSize;

        this.container.append(this.elem);
    }

    render(props) {
        const rect = this.container.getBoundingClientRect();

        const baseX = rect.left + window.scrollX;
        const baseY = rect.top + window.scrollY;
        const baseWidth = rect.right - rect.left;

        this.elem.style.left = `${baseX + baseWidth * props.x}px`;
        this.elem.style.top = `${baseY + (1 - props.y)}px`;

        console.log(props.dt)

        this.elem.src = `./assets/character/frame-${1 + Math.ceil(props.dt / 200) % 4}.png`
    }
}

export default PlayerView;
