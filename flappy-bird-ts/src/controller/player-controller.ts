import PlayerView from "../view/player-view";
import Player from "../model/player";

class PlayerController {
    player: Player
    gravity: number
    view: PlayerView
    constructor(player: Player, gravity: number, baseContainer: Element) {
        this.player = player;
        this.gravity = gravity;
        this.view = new PlayerView(baseContainer);

        window.addEventListener('keypress', (e) => this.onKeyPressed(e));
    }

    step(dt: number) {
        this.player.time += dt;
        this.player.velY += -this.gravity * dt / 1000;
        this.player.y += this.player.velY;
        this.view.render(this.player);
    }

    onKeyPressed(keyEvent: KeyboardEvent) {
        if (keyEvent.code === 'Space') {
            this.player.velY = Player.jumpSpeed;
        }
    }

    reset() {
        this.player.y = 0.5;
        this.player.time = 0;
        this.player.score = 0;
    }
}

export default PlayerController;
