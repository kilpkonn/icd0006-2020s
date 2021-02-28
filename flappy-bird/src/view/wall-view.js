
class WallView {
    constructor(baseContainer) {
        this.container = baseContainer;
        this.elemTop = document.createElement('img');
        this.elemBottom = document.createElement('img')
        this.elemTop.style.position = 'absolute';
        this.elemBottom.style.position = 'absolute'
        this.elemTop.src = './assets/props/pipe-top.png';
        this.elemBottom.src = './assets/props/pipe-bottom.png';
        this.isVisible = false;
    }

    render(props) {
        if (props.x + props.width > 0 && props.x < 1) {
            if (!this.isVisible) {
                this.container.append(this.elemTop);
                this.container.append(this.elemBottom);
            }
            this._updateWallPos(props);
            this.isVisible = true;
        } else {
            if (this.isVisible) {
                this.elemTop.remove();
                this.elemBottom.remove();
            }
            this.isVisible = false
        }
    }

    _updateWallPos(props) {
        const rect = this.container.getBoundingClientRect();

        const baseX = rect.left + window.scrollX;
        const baseY = rect.top + window.scrollY;
        const baseWidth = rect.right - rect.left;
        const baseHeight = rect.bottom - rect.top;

        this.elemTop.style.left = `${baseX + baseWidth * props.x}px`;
        this.elemTop.style.top = `${baseY}px`;
        this.elemTop.style.width = `${baseWidth * Math.min(props.width, 1 - props.x)}px`;
        this.elemTop.style.height = `${baseHeight * props.height}px`;

        this.elemBottom.style.left = `${baseX + baseWidth * props.x}px`;
        this.elemBottom.style.top = `${baseY + (props.height + props.gap) * baseHeight}px`;
        this.elemBottom.style.width = `${baseWidth * Math.min(props.width, 1 - props.x)}px`;
        this.elemBottom.style.height = `${baseHeight * (1 - props.gap - props.height)}px`;
    }
}

export default WallView;
