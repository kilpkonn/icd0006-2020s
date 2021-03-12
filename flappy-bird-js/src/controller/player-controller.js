import PlayerView from '../view/player-view';

class PlayerController {
    constructor(player, gravity, baseContainer) {
        this.player = player;
        this.gravity = gravity;
        this.view = new PlayerView(baseContainer);

        window.addEventListener('keypress', (e) => this.onKeyPressed(e));
    }

    step(dt) {
        this.player.time += dt;
        this.player.velY += -this.gravity * dt / 1000;
        this.player.y += this.player.velY;
        this.view.render(this.player);
    }

    onKeyPressed(keyEvent) {
        if (keyEvent.code === 'Space') {
            this.player.velY = this.player.jumpSpeed;
        }
    }

    reset() {
        this.player.y = 0.5;
        this.time = 0;
        this.score = 0;
    }
}

export default PlayerController;
