
class GameOverView {
    constructor(baseContainer) {
        this.container = baseContainer;
        this.elem = document.createElement('ul');
        this.elem.style.position = 'absolute';
        this.elem.style.zIndex = '98';
        this.elem.style.borderRadius = '10px'
        this.elem.style.background = 'rgba(0, 100, 150, 0.3)'
        this.onResize();

        window.addEventListener('resize', () => {
            this.onResize();
        });

        this.container.append(this.elem);
        this.isRenered = false;
    }

    render(props) {
        if (this.isRenered) return;

        this.elem.innerHTML = '';

        for (const score of props.scores) {
            let entry = document.createElement('li');
            let nameEntry = document.createElement('span');
            let scoreEntry = document.createElement('span');

            nameEntry.innerText = score.name;
            scoreEntry.innerText = score.score;

            nameEntry.style.padding = `5vw`;
            nameEntry.style.textAlign = 'left'
            scoreEntry.style.padding = `5vw`;

            entry.append(nameEntry, scoreEntry);
            this.elem.append(entry);
        }
        this.isRenered = true;
    }

    onResize() {
        const rect = this.container.getBoundingClientRect();
        this.elem.style.left = `${0.45 * (rect.right - rect.left)}px`;
        this.elem.style.top = `${0.4 * (rect.bottom - rect.top)}px`;
        this.elem.style.fontSize = `${0.08 * Math.min(rect.right - rect.left, rect.bottom - rect.top)}px`;
    }

    hide() {
        this.elem.style.visibility = 'hidden';
        this.isRenered = false;
    }

    show() {
        this.elem.style.visibility = 'visible';
    }
}

export default GameOverView;
